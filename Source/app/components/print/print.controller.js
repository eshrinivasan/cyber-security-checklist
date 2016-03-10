(function() {

angular.module("cyberapp.print")
.controller("PrintController", PrintController)
.directive('uiSelectWrap', uiSelectWrap);

	PrintController.$inject = ['$scope', '$state', '$rootScope', '$sessionStorage', '$localStorage', 'dataservice', 'datafactory'];

	function PrintController($scope, $state, $rootScope, $sessionStorage, $localStorage, dataservice, datafactory){
		var printCtrl = this;
		$state.go('print.options');
		var sectionstoretrieve;

		$scope.firmname = datafactory.firm.firmname;
		$scope.rep = datafactory.firm.rep;
		$scope.lastupdated = datafactory.firm.lastupdated;
        $scope.keyrep = datafactory.firm.keyrep;        

		$scope.nameemployee = function(rowIndex){
			return $scope.section7a.data[rowIndex].nameemployee;
		}

		$scope.devicetype = function(rowIndex){
			return $scope.section7a.data[rowIndex].devicetype;
		}

		$scope.deviceowner = function(rowIndex){
			return $scope.section7a.data[rowIndex].deviceowner;
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
		sectionstoretrieve = total.map(retrieveSections);


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

		if(getflatarray(sectionstoretrieve)!= undefined && getflatarray(sectionstoretrieve).length)
		var newflatarray = getflatarray(sectionstoretrieve);
		
		//loop through all sections answered from the session storage variable and assign it to scope.section vars
		for(var i = 0; i < newflatarray.length; i++){ 
			var value = newflatarray[i];
			$scope[value] = $localStorage[value];
		}
	}
})()

uiSelectWrap.$inject = ['$document', 'uiGridEditConstants'];
function uiSelectWrap($document, uiGridEditConstants) {
  return function link($scope, $elm, $attr) {
  //  $document.on('click', docClick);
    
   /* function docClick(evt) {
      if ($(evt.target).closest('.ui-select-container').size() === 0) {
        $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
        $document.off('click', docClick);
      }
    }*/
  };
}