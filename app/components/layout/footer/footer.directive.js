'use strict';

angular
    .module('footyfeeds.layout.footer')
    .directive('siteFooter', FooterDirective);

FooterDirective.$inject = [];
function FooterDirective() {
    return {
        controller: 'FooterController',
        controllerAs: 'vm',
        templateUrl: 'components/layout/footer/footer.template.html'
    }
}