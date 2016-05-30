'use strict';

describe('footyfeeds.services.NewsService', function() {
    let httpMock;

    let articles = [
        {
            articleID: 1,
            sourceID: 1,
            sourceName: 'BBC',
            articleURL: 'http://example.com',
            imageURl: 'http;//example.com/image.png',
            pubDate: new Date(),
            data: {}
        },
        {
            articleID: 1,
            sourceID: 1,
            sourceName: 'BBC',
            articleURL: 'http://example.com',
            imageURl: 'http;//example.com/image.png',
            pubDate: new Date(),
            data: {}
        },
        {
            articleID: 1,
            sourceID: 1,
            sourceName: 'BBC',
            articleURL: 'http://example.com',
            imageURl: 'http;//example.com/image.png',
            pubDate: new Date(),
            data: {}
        }
    ];

    beforeEach(function() {
        module('footyfeeds.services');
        module(function ($provide) {
            $provide.constant('API_BASE', '/api');
        });
        inject(function($httpBackend) {
            httpMock = $httpBackend;
        });
    });

    describe('NewsService', function() {
        it('should exist', inject(function(NewsService) {
            expect(NewsService).toBeDefined();
            expect(NewsService.getArticles).toBeDefined();
        }));

        it('should initially get all news with no filters active', inject(function(NewsService) {
            let currentTeam = null,
                currentSources = null;

            httpMock
                .expectGET('/api/news/page/0')
                .respond(articles);

            NewsService
                .getArticles(0, currentTeam, currentSources)
                .then(function (resArticles) {
                    expect(resArticles.length).toEqual(articles.length)
                });

            httpMock.flush();
        }));

        it('should request news for a specific team', inject(function(NewsService) {
            let currentTeam = {
                    urlFriendlyName: 'queens-park-rangers'
                },
                currentSources = null;

            httpMock
                .expectGET('/api/news/team/' + currentTeam.urlFriendlyName + '/page/0')
                .respond(articles);

            NewsService
                .getArticles(0, currentTeam, currentSources)
                .then(function (resArticles) {
                    expect(resArticles.length).toEqual(articles.length);
                });

            httpMock.flush();
        }));

        it('should request news for a specific team for preferred sources', inject(function(NewsService) {
            let currentTeam = {
                    urlFriendlyName: 'queens-park-rangers'
                },
                currentSources = {
                    shownSources: ['1','2','3']
                };

            httpMock
                .expectGET(
                    '/api/news/team/'
                    + currentTeam.urlFriendlyName +
                    '/sources/'
                    + currentSources.shownSources.join('-') +
                    '/page/0'
                )
                .respond(articles);

            NewsService
                .getArticles(0, currentTeam, currentSources)
                .then(function(resArticles) {
                    expect(resArticles.length).toEqual(articles.length);
                });

            httpMock.flush();
        }));

        it('should adjust request when given page number changes', inject(function(NewsService) {
            for (let page = 0; page < 5000; page++) {
                httpMock
                    .expectGET('/api/news/page/' + page)
                    .respond(true);

                NewsService
                    .getArticles(page, null, null)
                    .then(function (res) {
                        expect(res).toBeTruthy();
                    });

                httpMock.flush();
            }
        }));
    });
});