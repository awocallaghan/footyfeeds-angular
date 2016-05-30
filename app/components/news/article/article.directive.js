'use strict';

angular
    .module('footyfeeds.news.article')
    .directive('article', ArticleDirective);

function ArticleDirective() {
    return {
        restrict: 'E',
        scope: {
            article: '='
        },
        controllerAs: 'vm',
        templateUrl: 'components/news/article/article.template.html'
    };
}