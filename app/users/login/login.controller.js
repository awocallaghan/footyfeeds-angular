'use strict';

angular
    .module('footyfeeds.users.login')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$location', 'UserService'];
function LoginController($location, UserService) {
    let vm = this;

    // Models
    vm.error = {};

    // Methods
    vm.login = login;

    activate();

    function activate() {
        if (UserService.isLoggedIn()) {
            $location.path('/');
        }
    }

    function login() {
        vm.error = {};
        vm.loading = true;
        UserService
            .login(vm.username, vm.password)
            .then(function (res) {
                vm.loading = false;
                if (res.success) {
                    $location.path('/');
                } else {
                    vm.error =
                        res.error ||
                        {message:'Error logging in, please try again'};
                }
            });
    }
}