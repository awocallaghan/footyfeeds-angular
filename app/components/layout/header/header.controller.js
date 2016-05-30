'use strict';

angular
    .module('footyfeeds.layout.header')
    .controller('HeaderController', HeaderController);

HeaderController.$inject = ['UserService', 'FiltersService'];

function HeaderController (UserService, FiltersService) {
    let vm = this;

    // Models
    vm.collapsed = true;

    // Methods
    vm.collapse = collapse;
    vm.isLoggedIn = isLoggedIn;
    vm.getHomeLink = getHomeLink;

    function collapse() {
        vm.collapsed = !vm.collapsed;
    }

    function isLoggedIn() {
        return UserService.isLoggedIn();
    }

    function getHomeLink() {
        let team = FiltersService.getActiveFilter('team');
        if (team == null) {
            return '#/news';
        }
        return '#/news/team/' + team.urlFriendlyName;
    }

}