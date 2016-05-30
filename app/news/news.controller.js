'use strict';

angular
    .module('footyfeeds.news')
    .controller('NewsController', NewsController);

NewsController.$inject = ['$routeParams', 'FiltersService', 'TeamsService'];

function NewsController($routeParams, FiltersService, TeamsService) {
    let vm = this;

    // Models
    vm.currentPage = 0;
    vm.articles = [];
    vm.team = null;
    let viewers = [];

    // Methods
    vm.registerViewer = registerViewer;
    vm.deregisterViewer = deregisterViewer;
    vm.updateViewers = updateViewers;
    activate();

    function activate() {
        if ($routeParams.team) {
            vm.team = $routeParams.team;
        }
    }

    function registerViewer(viewer) {
        viewers.push(viewer);
    }

    function deregisterViewer(viewer) {
        let index = viewers.indexOf(viewer);
        if (index >= 0) {
            viewers.splice(index, 1);
        }
    }

    function updateViewers(resetPage) {
        viewers.forEach(function (updateViewer) {
            updateViewer(resetPage);
        });
    }


}