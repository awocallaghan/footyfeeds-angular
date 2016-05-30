'use strict';

angular
    .module('footyfeeds.users.account')
    .controller('AccountController', AccountController);

AccountController.$inject = ['$location', 'UserService', 'TeamsService', '$q'];

function AccountController($location, UserService, TeamsService, $q) {
    let vm = this;

    // Models
    vm.activeUser = UserService.getActiveUser();
    vm.teams = [];
    activate();

    // Methods


    function activate() {
        if (!vm.activeUser) {
            return $location.path('/');
        }

        if (vm.activeUser.userSources) {
            vm.teams = Object.keys(vm.activeUser.userSources)
        }
    }
}