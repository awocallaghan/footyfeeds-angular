'use strict';

angular
    .module('footyfeeds.news.article-detail', ['ngRoute'])
    .config(ArticleDetailRoute);

ArticleDetailRoute.$inject = ['$routeProvider'];
function ArticleDetailRoute($routeProvider) {
    $routeProvider.when('/news/article/:articleID?', {
        templateUrl: 'news/article-detail/article-detail.template.html',
        controller: 'ArticleDetailController',
        controllerAs: 'vm'
    });
}