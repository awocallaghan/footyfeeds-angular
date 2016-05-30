'use strict';

angular
    .module('footyfeeds.users.logout', ['ngRoute'])
    .config(LogoutRoute);

LogoutRoute.$inject = ['$routeProvider'];
function LogoutRoute ($routeProvider) {
    $routeProvider.when('/logout', {
        templateUrl: 'users/logout/logout.template.html',
        controller: 'LogoutController',
        controllerAs: 'vm'
    });
}
