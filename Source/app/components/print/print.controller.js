(function() {
	angular.module("cyberapp.print")
			.controller("PrintController", PrintController);

	PrintController.$inject = ['$scope', '$state', '$sessionStorage', 'dataservice'];

	function PrintController($scope, $state, $sessionStorage, dataservice){
		var printCtrl = this;

		var total = dataservice.getSections();
		var sectoretrieve;

		function retrieveSections(item){
			sectoretrieve = dataservice.getSectionAssocArray("section"+item);
			return sectoretrieve;
		}

		var sectionstoretrieve = total.map(retrieveSections);
		console.log(sectionstoretrieve[0]);


		//loop through all sections answered from the session storage variable and assign it to scope.section vars
		angular.forEach(sectionstoretrieve[0], function(value, key) {

			$scope[value] = $sessionStorage[value];
			console.log($sessionStorage[value])
		});
	}
})()