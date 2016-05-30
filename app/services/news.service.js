'use strict';

angular
    .module('footyfeeds.services')
    .service('NewsService', NewsService);

NewsService.$inject = ['API_BASE', '$http', '$q'];
function NewsService(API, $http, $q) {
    let API_BASE = API + '/news';

    return {
        getArticles: getArticles,
        getArticle: getArticle
    };

    /**
     * Request articles
     * @param page
     * @param currentTeam
     * @param currentSources
     * @returns {*}
     */
    function getArticles(page, currentTeam, currentSources) {
        let reqURL = API_BASE;

        if (currentTeam != null) {
            reqURL = reqURL + '/team/' + currentTeam.urlFriendlyName;

            if (currentSources != null && currentSources.length != 0) {
                let shownSources =
                    currentSources
                        .filter(function (source) {
                            return source.enabled;
                        })
                        .map(function (source) {
                            return source.sourceID;
                        });

                if (shownSources.length == 0) {
                    return $q(function (resolve, reject) {
                        reject('No sources enabled');
                    });
                }

                reqURL = reqURL + '/sources/' + shownSources.join('-');
            }
        }

        return $http
            .get(reqURL + '/page/' + page)
            .then(getResponse)
            .then(function (articles) {
                return articles
                    .filter(function (article) {
                        return article.articleID !== null;
                    });
            })
            .catch(catchError);
    }

    /**
     * Get single article data
     * @param articleID
     * @returns {*}
     */
    function getArticle(articleID) {
        return $http
            .get(API_BASE + '/article/' + articleID)
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
     * @param message
     */
    function catchError(err) {
        console.error(err);
        return err;
    }

}