'use strict';

angular
    .module('footyfeeds.news.viewer')
    .directive('newsViewer', NewsViewerDirective);

NewsViewerDirective.$inject = [];
function NewsViewerDirective() {
    return {
        scope: {},
        bindToController: {
            registerViewer: '=',
            deregisterViewer: '=',
            team: '='
        },
        controller: 'NewsViewerController',
        controllerAs: 'vm',
        templateUrl: 'components/news/viewer/viewer.template.html'
    };
}