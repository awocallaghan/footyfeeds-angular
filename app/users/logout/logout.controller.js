'use strict';

angular
    .module('footyfeeds.users.logout')
    .controller('LogoutController', LogoutController);

LogoutController.$inject = ['$location', 'UserService'];
function LogoutController($location, UserService) {
    let vm = this;

    activate();

    function activate() {
        UserService.setActiveUser(null);
        $location.path('/');
    }

}