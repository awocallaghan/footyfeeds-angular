'use strict';

angular
    .module('footyfeeds.news.filters')
    .controller('NewsFiltersController', NewsFiltersController);

NewsFiltersController.$inject = ['FiltersService', 'UserService', 'TeamsService', 'ngDialog', '$scope'];
function NewsFiltersController(FiltersService, UserService, TeamsService, ngDialog, $scope) {
   let vm = this;

    // Models
    vm.currentTeam = {};
    vm.currentSources = {};
    activate();
    updateFilterData();

    // Methods
    vm.changeTeam = changeTeam;
    vm.changeSources = changeSources;
    vm.hasSelectedTeam = hasSelectedTeam;
    
    function activate() {
        if (vm.team) {
            TeamsService
                .getTeam(vm.team)
                .then(function (team) {
                    if (team) {
                        FiltersService.setActiveFilter('team', team);
                        vm.updateViewers(false);
                        updateFilterData();
                    } else {
                        console.error('Team not found: ' + vm.team);
                    }
                });
        } else {
            FiltersService.setActiveFilter('team', null);
        }
    }

    function updateFilterData() {
        vm.currentTeam =
            FiltersService.getActiveFilter('team')
            || {teamName:'No active team'};
        vm.currentSources =
            FiltersService.getActiveFilter('sources')
            || 'No filtered sources';
    }

    function changeTeam() {
        let dialog = ngDialog
            .openConfirm({
                template: 'components/teams/pick/pick.template.html',
                controller: 'PickTeamController',
                controllerAs: 'vm'
            });

        dialog.then(function (team) {
            FiltersService.setActiveFilter('team', team, true);
            vm.updateViewers(true); /* reset page on team change */
            updateFilterData();
        }, function () {
            // dismissed
        });
    }

    function changeSources() {
        let dialogScope = $scope.$new();

        dialogScope.team = vm.currentTeam;

        let dialog = ngDialog
            .openConfirm({
                template: 'components/sources/pick/pick.template.html',
                controller: 'PickSourcesController',
                controllerAs: 'vm',
                scope: dialogScope
            });

        dialog.then(function (sources) {
            FiltersService.setActiveFilter('sources', sources);
            vm.updateViewers(true);
            UserService.updateSources(vm.currentTeam, sources);
            updateFilterData();
        });
    }

    function hasSelectedTeam() {
        return FiltersService.getActiveFilter('team') != null;
    }
}