(function() {
	angular.module("cyberapp.print")
			.controller("PrintController", PrintController);

	PrintController.$inject = ['$scope', '$state', '$sessionStorage', 'dataservice'];

	function PrintController($scope, $state, $sessionStorage, dataservice){
		var printCtrl = this;

		var total = dataservice.getSections();

		//loop through all sections answered from the session storage variable and assign it to scope.section vars
		angular.forEach(total, function(value, key) {
			$scope["section"+value] = $sessionStorage[value];
			console.log($scope["section"+value] );
		});
	}
})()