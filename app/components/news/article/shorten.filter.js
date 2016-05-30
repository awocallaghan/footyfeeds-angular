'use strict';

angular
    .module('footyfeeds.news.article')
    .filter('shorten', ShortenFilter);

function ShortenFilter() {
    return function (description, limit) {
        if (description == null) {
            return description;
        } else if (description.length <= limit) {
            return description;
        } else {
            return description.substr(0, (limit - 3)) + '...';
        }
    }
}