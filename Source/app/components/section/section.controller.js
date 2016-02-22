(function() {
	angular.module("cyberapp.section")
			.controller("SectionController", SectionController);

		SectionController.$inject = ['$scope', '$state' , '$rootScope', 'datafactory', 'dataservice', '$sessionStorage'];

		function SectionController($scope, $state, $rootScope, datafactory, dataservice, $sessionStorage){
			var sectionCtrl = this;
			$scope.currentState = $state.current.name;			
			$scope.sectionNumber = $scope.currentState.match(/\d+$/)[0];//filter out non numberic characters ie "section"
			$scope.total = dataservice.getSections();
			$scope.firm = datafactory.firm;
			$scope.allsteps = [1,2,3,4,5,6,7,8,9,10,11];	
			$scope.globalrows = [];
			$scope.globalval = [];
			$scope.sessionStorage = $sessionStorage;


           
           //$scope.globalrows = dataservice.getCollectionData();
           //console.log($scope.globalrows);
          


			$scope.printDiv = function(divName) {
			  var printContents = document.getElementById(divName).innerHTML;
			  var popupWin = window.open('', '_blank', 'width=500,height=500');
			  popupWin.document.open();
			  popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="assets/css/min/compiled-styles.min.css" /><link rel="stylesheet" type="text/css" href="assets/css/min/widget-styles.min.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
			  popupWin.document.close();
			}

		}
})()
