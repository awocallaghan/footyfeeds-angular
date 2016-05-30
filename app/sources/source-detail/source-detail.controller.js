'use strict';

angular
    .module('footyfeeds.sources.source-detail')
    .controller('SourceDetailController', SourceDetailController);

SourceDetailController.$inject = ['$routeParams', 'SourcesService'];
function SourceDetailController($routeParams, SourcesService) {
    let vm = this;
    
    // Data
    vm.loading = true;
    vm.source = {
        sourceID: $routeParams.sourceID
    };

    // Methods
    initSourceData();

    function initSourceData() {
        console.log('??');
        SourcesService
            .getSource(vm.source.sourceID)
            .then(function (source) {
                vm.source = source;
                vm.loading = false;
            });
    }
}