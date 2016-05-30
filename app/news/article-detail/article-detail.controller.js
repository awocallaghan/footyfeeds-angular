'use strict';

angular
    .module('footyfeeds.news.article-detail')
    .controller('ArticleDetailController', ArticleDetailController);

ArticleDetailController.$inject = ['$routeParams', 'NewsService', 'FiltersService'];
function ArticleDetailController($routeParams, NewsService, FiltersService) {
    let vm = this;
    
    // Models
    vm.loading = true;
    vm.article = {
        articleID: $routeParams.articleID
    };
    
    // Methods
    vm.getBackLink = getBackLink;
    initArticleData();
    
    function initArticleData() {
        NewsService
            .getArticle(vm.article.articleID)
            .then(function (article) {
                vm.article = article;
                vm.loading = false;
            });
    }

    function getBackLink() {
        let team = FiltersService.getActiveFilter('team');
        if (team == null) {
            return '#/news';
        }
        return '#/news/team/' + team.urlFriendlyName;
    }
}