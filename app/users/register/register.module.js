'use strict';

angular
    .module('footyfeeds.users.register', ['ngRoute'])
    .config(RegisterRoute);

RegisterRoute.$inject = ['$routeProvider'];
function RegisterRoute ($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'users/register/register.template.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
    });
}