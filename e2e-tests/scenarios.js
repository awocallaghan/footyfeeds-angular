'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('footyfeeds app', function() {


  it('should automatically redirect to /news when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/news");
  });


  describe('news', function() {

    beforeEach(function() {
      browser.get('index.html#/news');
    });


    it('should render news when user navigates to /news', function() {
      expect(element.all(by.css('[ng-view]'))).toBeDefined();
    });

  });
  
});
