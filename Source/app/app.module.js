(function() {
    angular.module('cybersecurityApp', ['cyberapp.core', 'cyberapp.checklist','cyberapp.section','cyberapp.print', 'ngStorage']);
})();
(function() {
	angular.module("cyberapp.checklist", ['ui.router']);
})();
(function() {
    angular.module('cyberapp.core', ['ui.router', 'ngStorage']);
})();
(function() {
	angular.module("cyberapp.print", ['ui.router', 'ngStorage', 'ngPrint']);
})();
(function() {
	angular.module("cyberapp.section", ['ui.router', 'ngStorage', 'ui.grid','ui.bootstrap', 'ui.select', 'ui.grid.edit','ui.grid.cellNav','ui.grid.autoResize']);
})()