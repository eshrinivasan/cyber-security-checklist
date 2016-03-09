(function() {

angular.module("cyberapp.print")
.controller("PrintController", PrintController);

	PrintController.$inject = ['$scope', '$state', '$sessionStorage', '$localStorage', 'dataservice', 'datafactory'];

	function PrintController($scope, $state, $sessionStorage, $localStorage, dataservice, datafactory){
		var printCtrl = this;
		$scope.firmname = datafactory.firm.firmname;
		$scope.rep = datafactory.firm.rep;
		$scope.lastupdated = datafactory.firm.lastupdated;
        $scope.keyrep = datafactory.firm.keyrep;

		$scope.piidata = function (col, row){
			return dataservice.piidata(col, row);
		}

		$scope.location = function (col, row){
			return dataservice.location(col, row);
		}

		$scope.risklevel = function (col, row){
			return dataservice.risklevel(col, row);
		}

		$scope.nameemployee = function(){
			 return $scope.section7a.data[0].nameemployee;
		}

		$scope.devicetype = function(){
			return $scope.section7a.data[0].devicetype;
		}

		$scope.deviceowner = function(){
			return $scope.section7a.data[0].deviceowner;
		}

		$scope.getTableHeight = function(section) {
	       var headerHeight = 110; // your header height
	       return {
	          height: (section.data.length * section.rowHeight + headerHeight) + "px"
	       };
		};

		var total = dataservice.getSections();		
	

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
			$scope[value] = $localStorage[value];
			//console.log($scope[value]);
		}

	}
})()

