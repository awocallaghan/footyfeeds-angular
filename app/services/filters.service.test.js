'use strict';

describe('footyfeeds.services.FiltersService', function() {
    beforeEach(function() {
        module('footyfeeds.services');
        module(function ($provide) {
            $provide.constant('API_BASE', '/api');
        });
    });

    describe('FiltersService', function() {
        it('should exist', inject(function(FiltersService) {
            expect(FiltersService).toBeDefined();
            expect(FiltersService.getActiveFilter).toBeDefined();
            expect(FiltersService.setActiveFilter).toBeDefined();
        }));

        it('should initially have null values', inject(function(FiltersService) {
            expect(FiltersService.getActiveFilter('team')).toBeNull();
            expect(FiltersService.getActiveFilter('sources')).toBeNull();
        }));

        it('should allow setting values', inject(function(FiltersService) {
            let team = 'some team';
            FiltersService.setActiveFilter('team', team);
            expect(FiltersService.getActiveFilter('team')).toBe(team);

            let sources = ['some source'];
            FiltersService.setActiveFilter('sources', sources);
            expect(FiltersService.getActiveFilter('sources')).toBe(sources);
        }));

        it('should change sources when team changes', inject(function(FiltersService) {
            FiltersService.setActiveFilter('team', 'first team');
            let sources = ['some source'];
            FiltersService.setActiveFilter('sources', sources);
            expect(FiltersService.getActiveFilter('sources')).toBe(sources);
            FiltersService.setActiveFilter('team', 'second team');
            expect(FiltersService.getActiveFilter('sources') == sources).toBeFalsy()
        }))
    });
});