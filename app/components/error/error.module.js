'use strict';

angular
    .module('footyfeeds.error', [])
    .config(ErrorRoute);

ErrorRoute.$inject = ['$routeProvider'];
function ErrorRoute($routeProvider) {
    $routeProvider.when('/error', {
        templateUrl: 'components/error/error.template.html'
    });
}