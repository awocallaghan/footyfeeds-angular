'use strict';

angular
    .module('footyfeeds.sources.source-detail', ['ngRoute'])
    .config(SourceDetailRoute);

SourceDetailRoute.$inject = ['$routeProvider'];
function SourceDetailRoute($routeProvider) {
    $routeProvider
        .when('/news/source/:sourceID/', {
            templateUrl: 'sources/source-detail/source-detail.template.html',
            controller: 'SourceDetailController',
            controllerAs: 'vm'
        });
}