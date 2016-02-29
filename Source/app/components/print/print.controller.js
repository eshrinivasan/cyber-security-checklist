(function() {

angular.module("cyberapp.print")
.controller("PrintController", PrintController);

	PrintController.$inject = ['$scope', '$state', '$sessionStorage', 'dataservice', 'datafactory'];

	function PrintController($scope, $state, $sessionStorage, dataservice, datafactory){
		var printCtrl = this;
		$scope.firmname = datafactory.firm.firmname;

		var total = dataservice.getSections();		
		//console.log(total);

		//Callback:for each section in total array, get the corresponding sections for eg: section3 contains section3a, section3b
		function retrieveSections(item){
			var sectoretrieve = dataservice.getSectionAssocArray("section"+item);
			return sectoretrieve;
		}

		if(total != undefined)
		var sectionstoretrieve = total.map(retrieveSections);

		//some sections contains multiple sub sections - converting them into a single array
		function getflatarray(sectionstoretrieve){
			var flatarray = [];
			var storedSession = sectionstoretrieve;
		
			for(var i=0; i < storedSession.length; i++){
				if(storedSession[i].length > 1){					
					for(var j = 0; j < storedSession[i].length; j++){	
						var subarray = storedSession[i];
						flatarray.push( subarray.slice(j, j+1));	
					}										
				}else{
					flatarray.push(storedSession[i]);
				}
			}
			
			return flatarray;
		}

		//console.log(getflatarray(sectionstoretrieve));

		if(getflatarray(sectionstoretrieve)!= undefined && getflatarray(sectionstoretrieve).length)
		var newflatarray = getflatarray(sectionstoretrieve);
		
		//loop through all sections answered from the session storage variable and assign it to scope.section vars
		for(var i = 0; i < newflatarray.length; i++){ 
			var value = newflatarray[i];
			console.log(value);
			$scope[value] = $sessionStorage[value];		

		}
	}
})()

