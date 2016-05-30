'use strict';

angular
    .module('footyfeeds.services')
    .service('UserService', UserService);

UserService.$inject = ['$http', 'API_BASE', 'localStorageService'];
function UserService ($http, API, localStorageService) {
    let API_BASE = API + '/user';

    // store sources locally when not logged in
    let localUserSources = {};

    return {
        getActiveUser: getActiveUser,
        setActiveUser: setActiveUser,
        isLoggedIn: isLoggedIn,
        register: register,
        login: login,
        deleteAccount: deleteAccount,
        updateSources: updateSources,
        getSources: getSources,
    };

    /**
     * Get currently logged in user
     * @returns {User} : user object
     */
    function getActiveUser() {
        let activeUser = localStorageService.get('activeUser');
        if (activeUser && activeUser.userID) {
            return activeUser;
        } else {
            return null;
        }
    }

    /**
     * Set the current active user after logging in
     * @param new active user
     */
    function setActiveUser(user) {
        if (!user) {
            localStorageService.set('activeUser', null);
        } else {
            let activeUser = {
                userID: user.userID,
                username: user.username,
                token: user.token,
                userSources: user.userSources || {}
            };
            localStorageService.set('activeUser', activeUser);
        }
    }

    /**
     * Is user currently logged in
     * @returns {boolean}
     */
    function isLoggedIn() {
        return getActiveUser() !== null;
    }

    /**
     * Register a new user
     * @param user details
     * @returns observable API request - success (true/false)
     */
    function register(user) {
        return $http
            .post(API_BASE + '/register', { user: user })
            .then(getResponse)
            .then(function (res) {
                if (res.success) {
                    setActiveUser(res.user);
                }
                return res;
            })
            .catch(catchError);
    }

    /**
     * Login with user details
     * @param username
     * @param password
     * @returns observable request
     */
    function login(username, password) {
        return $http
            .post(API_BASE + '/login', { username: username, password: password })
            .then(getResponse)
            .then(function (res) {
                if (res.success) {
                    setActiveUser(res.user);
                }
                return res;
            })
            .catch(catchError)
    }

    /**
     * Delete user account
     * @returns {Observable request}
     */
    function deleteAccount() {
        if (!isLoggedIn()) {
            return catchError('Must be logged in');
        }
        return $http
            .delete(API_BASE + '/delete', { userID: getActiveUser().userID })
            .then(getResponse)
            .then(function (res) {
                if (res.success) {
                    setActiveUser(null);
                }
                return res;
            })
            .catch(catchError);
    }

    function updateSources(team, sources) {
        if (!isLoggedIn()) {
            // store user preferences if not logged in
            localUserSources[team.urlFriendlyName] = {
                team: {
                    teamID: team.teamID,
                    teamName: team.teamName,
                },
                sources: sources
            };
            return true;
        }
        let newUser = getActiveUser();
        newUser.userSources[team.urlFriendlyName] = {
            team: {
                teamID: team.teamID,
                teamName: team.teamName
            },
            sources: sources.map(function (source) {
                return {
                    sourceID: source.sourceID,
                    sourceName: source.sourceName,
                    enabled: source.enabled
                }
            })
        };
        setActiveUser(newUser);
        return $http
            .post(API_BASE + '/sources', {
                userSources: newUser.userSources
            })
            .catch(catchError);
    }

    function getSources(team) {
        let activeUser = getActiveUser();
        if (!activeUser) {
            if (localUserSources != null && localUserSources[team.urlFriendlyName] != null) {
                return localUserSources[team.urlFriendlyName];
            }
            return null;
        }

        let userSources = activeUser.userSources;

        if (!userSources) {
            return null;
        } else {
            return userSources[team.urlFriendlyName] != null
                ? userSources[team.urlFriendlyName] : null;
        }
    }

    /**
     * Extract data from API response
     * @param data
     * @returns {*}
     */
    function getResponse(data) {
        return data.data;
    }

    /**
     * Error handler
     * @param message
     */
    function catchError(err) {
        console.error(err);
        return err;
    }

}

