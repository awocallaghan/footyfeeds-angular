'use strict';

angular
    .module('footyfeeds.services')
    .service('SourcesService', SourcesService);

SourcesService.$inject = ['API_BASE', '$http', 'UserService'];

function SourcesService(API_BASE, $http, UserService) {

    return {
        getSources: getSources,
        getSource: getSource,
    };

    function getSources(team) {
        if (!team) {
            return catchError('No team selected');
        }

        return $http
            .get(API_BASE + '/sources/team/' + team.urlFriendlyName)
            .then(getResponse)
            .then(function (sources) {
                let userSources = UserService.getSources(team);

                return sources.map(function (source) {
                    if (userSources) {
                        let thisUserSource =
                            userSources.sources
                                .find(function (userSource) {
                                    return source.sourceID == userSource.sourceID;
                                });

                        source.enabled =
                            thisUserSource == null ?
                                true : thisUserSource.enabled;
                    } else {
                        source.enabled = true;
                    }
                    return source;
                });
            })
            .catch(catchError);
    }

    function getSource(sourceID) {
        if (!sourceID) {
            return catchError('No source provided');
        }

        return $http
            .get(API_BASE + '/source/' + sourceID)
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