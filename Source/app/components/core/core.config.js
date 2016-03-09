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
        
         var section1 = {
            name: 'section1',
            url: '/section/1',
            sticky: true,
            dsr: true,
            templateUrl: 'components/section/templates/section1.index.html',
            controller: 'SectionController',
            controllerAs: 'sectionCtrl'
        };

        var section2 = {
            name: 'section2',
            url: '/section/2',
            sticky: true,
            dsr: true,
            templateUrl: 'components/section/templates/section2.index.html',
            controller: 'SectionController',
            controllerAs: 'sectionCtrl'
        };

         var section3 = {
            name: 'section3',
            url: '/section/3',
            sticky: true,
            dsr: true,
            templateUrl: 'components/section/templates/section3.index.html',
            controller: 'SectionController',
            controllerAs: 'sectionCtrl'
        };
         var section4 = {
            name: 'section4',
            url: '/section/4',
            sticky: true,
            dsr: true,
            templateUrl: 'components/section/templates/section4.index.html',
            controller: 'SectionController',
            controllerAs: 'sectionCtrl'
        };
         var section5 = {
            name: 'section5',
            url: '/section/5',
            sticky: true,
            dsr: true,
            templateUrl: 'components/section/templates/section5.index.html',
            controller: 'SectionController',
            controllerAs: 'sectionCtrl'
        };
         var section6 = {
            name: 'section6',
            url: '/section/6',
            sticky: true,
            dsr: true,
            templateUrl: 'components/section/templates/section6.index.html',
            controller: 'SectionController',
            controllerAs: 'sectionCtrl'
        };
         var section7 = {
            name: 'section7',
            url: '/section/7',
            sticky: true,
            dsr: true,
            templateUrl: 'components/section/templates/section7.index.html',
            controller: 'SectionController',
            controllerAs: 'sectionCtrl'
        };
          var section8 = {
            name: 'section8',
            url: '/section/8',
            sticky: true,
            dsr: true,
            templateUrl: 'components/section/templates/section8.index.html',
            controller: 'SectionController',
            controllerAs: 'sectionCtrl'
        };
          var section9 = {
            name: 'section9',
            url: '/section/9',
            sticky: true,
            dsr: true,
            templateUrl: 'components/section/templates/section9.index.html',
            controller: 'SectionController',
            controllerAs: 'sectionCtrl'
        };
          var section10 = {
            name: 'section10',
            url: '/section/10',
            sticky: true,
            dsr: true,
            templateUrl: 'components/section/templates/section10.index.html',
            controller: 'SectionController',
            controllerAs: 'sectionCtrl'
        };
          var section11 = {
            name: 'section11',
            url: '/section/11',
            sticky: true,
            dsr: true,
            templateUrl: 'components/section/templates/section11.index.html',
            controller: 'SectionController',
            controllerAs: 'sectionCtrl'
        };

        var section12 = {
            name: 'section12',
            url: '/section/12',
            sticky: true,
            dsr: true,
            templateUrl: 'components/section/templates/section12.index.html',
            controller: 'SectionController',
            controllerAs: 'sectionCtrl'
        }

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state(main)
            .state(checklist)           
            .state(section1)
            .state(section2)
            .state(section3)
            .state(section4)
            .state(section5)
            .state(section6)
            .state(section7)
            .state(section8)
            .state(section9)
            .state(section10)
            .state(section11)
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
                  templateUrl: 'components/print/templates/print.index.html',
                  parent: "print"
                });
    }

    function runApp($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.go('main');
    }

})()