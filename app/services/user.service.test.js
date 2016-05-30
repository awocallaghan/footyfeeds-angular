'use strict';

describe('footyfeeds.services.UserService', function() {
    let httpMock;

    beforeEach(function() {
        module('footyfeeds.services');
        module(function ($provide) {
            $provide.constant('API_BASE', '/api');
        });
        inject(function($httpBackend) {
            httpMock = $httpBackend;
        });
    });

    describe('UserService', function() {
        it('should exist', inject(function(UserService) {
            expect(UserService).toBeDefined();
            expect(UserService.getActiveUser).toBeDefined();
            expect(UserService.setActiveUser).toBeDefined();
            expect(UserService.isLoggedIn).toBeDefined();
            expect(UserService.register).toBeDefined();
            expect(UserService.login).toBeDefined();
            expect(UserService.deleteAccount).toBeDefined();
        }));

        it('should be initially logged out', inject(function(UserService) {
            let activeUser = UserService.getActiveUser();
            expect(activeUser).toBe(null);
            expect(UserService.isLoggedIn()).toBeFalsy();
        }));

        let user = {
            userID: 1,
            username: 'bob',
            password: 'password',
            token: 'someToken',
            userSources: {}
        };

        it('should be able to set active user', inject(function(UserService) {
            let localUser = user;
            delete localUser.password; /* password is not locally stored */

            UserService.setActiveUser(localUser);
            expect(UserService.getActiveUser().userID).toBe(localUser.userID);
            expect(UserService.getActiveUser().username).toBe(localUser.username);
            expect(UserService.isLoggedIn()).toBe(true);

            UserService.setActiveUser(null);
            expect(UserService.getActiveUser()).toBe(null);
            expect(UserService.isLoggedIn()).toBe(false);
        }));
        
        it('should be able to register a user', inject(function(UserService) {
            httpMock
                .expectPOST('/api/user/register')
                .respond({
                    success: true,
                    user: {
                        userID: user.userID,
                        username: user.username,
                        token: user.token,
                        userSources: user.userSources
                    }
                });

            UserService
                .register({ username: user.username, password: user.password })
                .then(function (res) {
                    expect(UserService.isLoggedIn()).toBeTruthy();
                    let activeUser = UserService.getActiveUser(),
                        properties = ['userID','username','token','userSources'];
                    properties.forEach(function(property) {
                        expect(activeUser[property]).toBe(res.user[property]);
                    });
                });

            httpMock.flush();
        }));

        it('should be able to login as a user', inject(function(UserService) {
            httpMock
                .expectPOST('/api/user/login')
                .respond({
                    success: true,
                    user: {
                        userID: user.userID,
                        username: user.username,
                        token: user.token,
                        userSources: user.userSources
                    }
                });

            UserService
                .login(user.username, user.password)
                .then(function (res) {
                    expect(UserService.isLoggedIn()).toBeTruthy();
                    let activeUser = UserService.getActiveUser(),
                        properties = ['userID','username','token','userSources'];
                    properties.forEach(function(property) {
                        expect(activeUser[property]).toBe(res.user[property]);
                    });
                });

            httpMock.flush();
        }));

        it('should be able to delete account', inject(function(UserService) {
            httpMock
                .expectPOST('/api/user/login')
                .respond({
                    success: true,
                    user: {
                        userID: user.userID,
                        username: user.username,
                        token: user.token,
                        userSources: user.userSources
                    }
                });

            let flushMock = function (mock) { mock.flush(); };

            UserService
                .login(user.username, user.password)
                .then(function (res) {
                    expect(res.success).toBeTruthy();

                    httpMock
                        .expectDELETE('/api/user/delete')
                        .respond({
                            success: true
                        });

                    UserService
                        .deleteAccount()
                        .then(function (res) {
                            expect(res.success).toBeTruthy();
                            expect(UserService.isLoggedIn()).toBeFalsy();
                            expect(UserService.getActiveUser()).toBe(null);
                        });

                    setTimeout(flushMock, 0); /* avoid triggering $digest within $digest */
                });
            httpMock.flush();
        }));
    });
})