FootyFeeds Angular
==============

FootyFeeds is a football news aggregator that gathers articles from RSS feeds
relating to football teams in the English Premier League and Championship.

This is the frontend web app created using AngularJS framework. The backend
API is powered by a Node/Express server not included in this repository.

Usage
=====

`npm install` and then `npm start`

Navigate to `http://localhost:8000/app` in your browser.

`index.html` uses minified JavaScripts and SASS/CSS built with Gulp.
`index-local.html` is for development and uses the live JavaScript files.

Backend API
========

The app will attempt to use the FootyFeeds API at `http://footyfeeds.co.uk/api`.
You can adjust the API base url by changing the constant set in `app/app.js` 'API_BASE'.
