'use strict';

angular
    .module('footyfeeds.news', ['ngRoute'])
    .config(NewsRoute);

NewsRoute.$inject = ['$routeProvider'];
function NewsRoute($routeProvider) {
    let News = {
        templateUrl: 'news/news.template.html',
        controller: 'NewsController',
        controllerAs: 'vm'
    };
    $routeProvider
        .when('/', News)
        .when('/news', News)
        .when('/news/team/:team?', News);
}