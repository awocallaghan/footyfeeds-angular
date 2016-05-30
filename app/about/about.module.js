'use strict';

angular
    .module('footyfeeds.about', ['ngRoute'])
    .config(AboutRoute);

AboutRoute.$inject = ['$routeProvider'];
function AboutRoute($routeProvider) {
    $routeProvider.when('/about', {
        templateUrl: 'about/about.template.html'
    });
}