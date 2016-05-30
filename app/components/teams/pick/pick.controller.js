'use strict';

angular
    .module('footyfeeds.teams.pick')
    .controller('PickTeamController', PickTeamController);

PickTeamController.$inject = ['TeamsService'];

function PickTeamController(TeamsService) {
    let vm = this;

    // Models
    vm.loading = true;
    vm.leagues = [];
    vm.selectedLeague = null;
    vm.teams = [];
    vm.selectedTeam = null;

    // Methods
    vm.selectLeague = selectLeague;
    vm.selectTeam = selectTeam;
    initLeagueData();

    function initLeagueData() {
        TeamsService
            .getLeagues()
            .then(function (leagues) {
                vm.leagues = leagues;
                vm.loading = false;
            });
    }

    function selectLeague(league) {
        vm.selectedLeague = league;
        TeamsService
            .getTeams(vm.selectedLeague)
            .then(function (teams) {
                vm.teams = teams;
            });
    }

    function selectTeam(team) {
        vm.selectedTeam = team;
    }
}