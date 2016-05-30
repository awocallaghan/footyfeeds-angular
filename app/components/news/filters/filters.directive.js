'use strict';

angular
    .module('footyfeeds.news.filters')
    .directive('newsFilters', NewsFiltersDirective);

NewsFiltersDirective.$inject = [];
function NewsFiltersDirective() {
    return {
        restrict: 'E',
        scope: {},
        bindToController: {
            updateViewers: '=',
            team: '='
        },
        controller: 'NewsFiltersController',
        controllerAs: 'vm',
        templateUrl: 'components/news/filters/filters.template.html'
    };
}