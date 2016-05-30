'use strict';

angular
    .module('footyfeeds.services')
    .service('FiltersService', FiltersService);

FiltersService.$inject = ['UserService', '$location'];
function FiltersService(UserService, $location) {
    var activeFilters = {
        'team': null,
        'sources': null,
        'page': 0,
        'scrollY': null
    };

    return {
        getActiveFilter: getActiveFilter,
        setActiveFilter: setActiveFilter,
    };

    /**
     * Get active filter value
     * @param filter
     * @returns {filter val}
     */
    function getActiveFilter(filter) {
        return activeFilters[filter];
    }

    /**
     * Set active filter value
     * @param filter
     * @param val
     */
    function setActiveFilter(filter, val, bool) {
        activeFilters[filter] = val;

        /* Update sources and reset page, scrollY on team change */
        if (filter == 'team') {
            if (bool) {
                activeFilters.page = 0;
                activeFilters.scrollY = null;
            }
            if (val !== null) {
                activeFilters.sources = UserService.getSources(val) || [];
                $location.path('/news/team/' + val.urlFriendlyName);
            } else {
                activeFilters.sources = null;
                $location.path('/news');
            }
        }
    }
}