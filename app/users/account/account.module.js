'use strict';

angular
    .module('footyfeeds.users.account', ['ngRoute'])
    .config(AccountRoute);

AccountRoute.$inject = ['$routeProvider'];

function AccountRoute($routeProvider) {
    $routeProvider.when('/account', {
        templateUrl: 'users/account/account.template.html',
        controller: 'AccountController',
        controllerAs: 'vm'
    });
}