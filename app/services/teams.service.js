'use strict';

angular
    .module('footyfeeds.services')
    .service('TeamsService', TeamsService);

TeamsService.$inject = ['API_BASE', '$http'];

function TeamsService(API_BASE, $http) {

    return {
        getLeagues: getLeagues,
        getTeams: getTeams,
        getTeam: getTeam,
    };

    function getLeagues() {
        return $http
            .get(API_BASE + '/leagues')
            .then(getResponse)
            .catch(catchError);
    }

    function getTeams(league) {
        return $http
            .get(API_BASE + '/teams/' + league.urlFriendlyName)
            .then(getResponse)
            .catch(catchError);
    }

    function getTeam(urlFriendlyName) {
        return $http
            .get(API_BASE + '/team/' + urlFriendlyName)
            .then(getResponse)
            .catch(catchError);
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
     * @param err message
     */
    function catchError(err) {
        console.error(err);
        return err;
    }
}