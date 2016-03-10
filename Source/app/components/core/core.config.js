(function() {
    'use strict';

    angular.module('cyberapp.core')
        .config(configure)
        .run(runApp);

    configure.$inject = ['$httpProvider', '$urlRouterProvider', '$stateProvider'];
    runApp.$inject = ['$rootScope', '$state', '$stateParams'];

    function configure($httpProvider, $urlRouterProvider, $stateProvider) {
        var main = {
            name: 'main',
            url: '/',
            sticky: true,
            dsr: true,
            templateUrl: 'components/checklist/templates/checklist.start.index.html',
            controller: 'ChecklistController',
            controllerAs: 'checklistCtrl'
        };

        var checklist = {
            name: 'checklist',
            url: '/checklist',
            sticky: true,
            dsr: true,
            templateUrl: 'components/checklist/templates/checklist.index.html',
            controller: 'ChecklistController',
            controllerAs: 'checklistCtrl'
        };           
      
        $stateProvider
            .state(main)
            .state(checklist)
            .state('section', {
                url: '/section',               
                templateUrl: 'components/section/templates/section.html',
                controller: 'SectionController',
                controllerAs: 'sectionCtrl'
            })           
            .state('section.1',{
                url: '/1',
                parent:'section',
                templateUrl: 'components/section/templates/section1.index.html'
            })
            .state('section.2',{
                url: '/2',
                parent:'section',
                templateUrl: 'components/section/templates/section2.index.html'
            })
             .state('section.3',{
                url: '/3',
                parent:'section',
                templateUrl: 'components/section/templates/section3.index.html'
            })
            .state('section.4',{
                url: '/4',
                parent:'section',
                templateUrl: 'components/section/templates/section4.index.html'
            })
             .state('section.5',{
                url: '/5',
                parent:'section',
                templateUrl: 'components/section/templates/section5.index.html'
            })
            .state('section.6',{
                url: '/6',
                parent:'section',
                templateUrl: 'components/section/templates/section6.index.html'
            })
            .state('section.7',{
                url: '/7',
                parent:'section',
                templateUrl: 'components/section/templates/section7.index.html'
            })
            .state('section.8',{
                url: '/8',
                parent:'section',
                templateUrl: 'components/section/templates/section8.index.html'
            })
            .state('section.9',{
                url: '/9',
                parent:'section',
                templateUrl: 'components/section/templates/section9.index.html'
            })
            .state('section.10',{
                url: '/10',
                parent:'section',
                templateUrl: 'components/section/templates/section10.index.html'
            })
             .state('section.11',{
                url: '/11',
                parent:'section',
                templateUrl: 'components/section/templates/section11.index.html'
            })
            .state('print', {
                  url: "/print",
                  templateUrl: 'components/print/templates/print.html',                      
                  controller: 'PrintController',
                  controllerAs: 'printCtrl'
                })
                .state('print.options', {
                  url: "/options",
                  templateUrl: 'components/print/templates/print.options.html',
                  parent: "print"
                })
                .state('print.summary', {
                  url: "/summary",
                  templateUrl: 'components/print/templates/print.summary.html',
                  parent: "print"
                })
                .state('print.detailed', {
                  url: "/detail",
                  templateUrl: 'components/print/templates/print.detail.html',
                  parent: "print"
                });
    

                $urlRouterProvider.otherwise('/');

    }

    function runApp($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.go('main');
    }

})()