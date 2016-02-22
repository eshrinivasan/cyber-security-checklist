(function() {
	angular.module("cyberapp.print")
			.controller("PrintController", PrintController);

	PrintController.$inject = ['$scope', '$state', '$sessionStorage'];

	function PrintController($scope, $state, $sessionStorage){
		var printCtrl = this;
	}
})()