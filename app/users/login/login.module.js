'use strict';

angular
    .module('footyfeeds.users.login', ['ngRoute'])
    .config(LoginRoute);

LoginRoute.$inject = ['$routeProvider'];
function LoginRoute ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'users/login/login.template.html',
        controller: 'LoginController',
        controllerAs: 'vm'
    });
}