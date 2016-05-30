'use strict';

// Declare app level module which depends on views, and components
angular
    .module(
        'footyfeeds',
        [
            /* External libs */
            'ngRoute', 'ngDialog', 'LocalStorageModule',

            'footyfeeds.services',
            'footyfeeds.layout',
                'footyfeeds.layout.header',
                'footyfeeds.layout.footer',
            'footyfeeds.about',
            'footyfeeds.error',
            'footyfeeds.users',
                'footyfeeds.users.register',
                'footyfeeds.users.login',
                'footyfeeds.users.account',
                'footyfeeds.users.logout',
            'footyfeeds.news',
                'footyfeeds.news.filters',
                'footyfeeds.news.viewer',
                'footyfeeds.news.article',
                'footyfeeds.news.article-detail',
            'footyfeeds.teams',
                'footyfeeds.teams.pick',
            'footyfeeds.sources',
                'footyfeeds.sources.pick',
                'footyfeeds.sources.source-detail',
        ]
    )
    .config(AppConfig)
    .constant('API_BASE', 'http://footyfeeds.co.uk/api');

AppConfig.$inject = ['$routeProvider', '$httpProvider', 'localStorageServiceProvider', '$anchorScrollProvider'];
function AppConfig ($routeProvider, $httpProvider, localStorageServiceProvider, $anchorScrollProvider) {
    $routeProvider.otherwise({redirectTo: '/error'});

    localStorageServiceProvider
        .setPrefix('footyfeeds');

    //$anchorScrollProvider.disableAutoScrolling();

    /**
     * Request interceptor which attaches user authentication token to requests
     * @returns config
     * @param $injector
     */
    let interceptor =
        function ($injector) {
            return {
                request: function (config) {
                    let user = $injector.get('UserService').getActiveUser();
                    if (user && user.token) {
                        config.headers.authorization = 'Bearer ' + user.token;
                    }
                    return config;
                }
            }
        };
    interceptor.$inject = ['$injector'];

    $httpProvider.interceptors.push(interceptor);
}