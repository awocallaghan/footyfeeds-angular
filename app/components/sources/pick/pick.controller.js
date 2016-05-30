'use strict';

angular
    .module('footyfeeds.sources.pick')
    .controller('PickSourcesController', PickSourcesController);

PickSourcesController.$inject = ['FiltersService', 'SourcesService'];

function PickSourcesController(FiltersService, SourcesService) {
    let vm = this;

    // Models
    vm.loading = true;
    vm.sources = [];
    vm.team = FiltersService.getActiveFilter('team');

    // Methods
    vm.toggleAll = toggleAll;
    initSourcesData();

    function initSourcesData() {
        SourcesService
            .getSources(vm.team)
            .then(function (sources) {
                vm.sources = sources;
                vm.loading = false;
            });
    }

    function toggleAll(val) {
        vm.sources
            .map(function (source) {
                source.enabled = val;
                return source;
            });
    }
}