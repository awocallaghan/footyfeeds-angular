'use strict';

describe('footyfeeds.news.article-detail module', function() {
    beforeEach(module('footyfeeds.news.article'));
    
    describe('shorten filter', function() {
        it('should shorten a string', inject(function(shortenFilter) {
            let string = 'abcde';

            for (let limit = 5; limit < 1000; limit++) {
                string = string + string;
                let outputString = shortenFilter(string, limit);
                expect(outputString.length).toEqual(limit);
                expect(outputString.substr((limit - 3), limit)).toEqual('...');
            }
        }));
    });
});