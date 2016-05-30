'use strict';

angular
    .module('footyfeeds.users.register')
    .controller('RegisterController', RegisterController);

RegisterController.$inject = ['$location', 'UserService'];

function RegisterController ($location, UserService) {
    let vm = this;

    // Models
    vm.error = {};

    // Methods
    vm.register = register;

    activate();

    function activate() {
        if (UserService.isLoggedIn()) {
            $location.path('/');
        }
    }

    function register() {
        vm.loading = true;
        vm.error = {};
        UserService
            .register(vm.user)
            .then(function (res) {
                vm.loading = false;
                if (res.success) {
                    $location.path('/');
                } else {
                    vm.error
                        = res.error ||
                        {message:'Error registering account, please try again'};
                }
            });
    }
}