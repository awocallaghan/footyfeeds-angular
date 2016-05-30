'use strict';

angular
    .module('footyfeeds.news.viewer')
    .controller('NewsViewerController', NewsViewerController);

NewsViewerController.$inject = ['NewsService', 'FiltersService', '$scope', '$window', '$timeout'];
function NewsViewerController(NewsService, FiltersService, $scope, $window, $timeout) {
    let vm = this;

    let firstLoad = true;

    // Models
    vm.loading = true;
    vm.morePages = true;
    vm.articles = [];
    vm.error = false;

    // Methods
    vm.refresh = refresh;
    vm.nextPage = nextPage;
    $scope.$on('$routeChangeStart', saveScrollPosition);
    activate();

    function activate() {
        /* dont load news if given team in url */
        if (!vm.team) {
            vm.refresh(false);
        }
        vm.registerViewer(vm.refresh);
    }

    function refresh(reset) {
        if (reset == true) {
            vm.articles = [];
            vm.morePages = true;
        }

        vm.error = false;
        vm.loading = true;

        let team = FiltersService.getActiveFilter('team'),
            sources = FiltersService.getActiveFilter('sources'),
            page = FiltersService.getActiveFilter('page');

        NewsService
            .getArticles(
                page,
                team,
                sources
            )
            .then(function (articles) {
                vm.loading = false;
                if (articles.length == 0) {
                    vm.morePages = false;
                }
                articles.forEach(function (article) {
                    vm.articles.push(article);
                });

                if (!firstLoad) {
                    firstLoad = false;
                    updateScrollPosition();
                }
            }, function () {
                vm.loading = false;
                vm.error = true;
                vm.morePages = false;
            });
    }

    function nextPage(event) {
        event.preventDefault();
        FiltersService.setActiveFilter('page', FiltersService.getActiveFilter('page') + 1);
        vm.refresh(false); /* refresh news - dont reset */
    }

    function saveScrollPosition() {
        let scroll = $window.pageYOffset;
        FiltersService.setActiveFilter('scrollY', scroll);
    }

    function updateScrollPosition() {
        let lastScroll = FiltersService.getActiveFilter('scrollY');
        if (lastScroll) {
            $timeout(function() {
                $window.scrollTo(0, lastScroll);
            });
        }
    }
}
