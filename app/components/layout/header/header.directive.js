'use strict';

angular
    .module('footyfeeds.layout.header')
    .directive('header', HeaderDirective);

HeaderDirective.$inject = [];
function HeaderDirective() {
    return {
        scope: {},
        bindToController: {},
        controller: 'HeaderController',
        controllerAs: 'vm',
        templateUrl: 'components/layout/header/header.template.html'
    }
}