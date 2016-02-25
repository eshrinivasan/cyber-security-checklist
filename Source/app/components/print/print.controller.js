(function() {

angular.module("cyberapp.print")
.controller("PrintController", PrintController);

	PrintController.$inject = ['$scope', '$state', '$sessionStorage', 'dataservice'];

	function PrintController($scope, $state, $sessionStorage, dataservice){
		var printCtrl = this;
		var total = dataservice.getSections();		

		//Callback:for each section in total array, get the corresponding sections for eg: section3 contains section3a, section3b
		function retrieveSections(item){
			var sectoretrieve = dataservice.getSectionAssocArray("section"+item);
			return sectoretrieve;
		}

		if(total != undefined)
		var sectionstoretrieve = total.map(retrieveSections);

		//some arrays contains multiple sections - converting them into a single array
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

		if(getflatarray(sectionstoretrieve).length)
		var newflatarray = getflatarray(sectionstoretrieve);
		
		//loop through all sections answered from the session storage variable and assign it to scope.section vars
		for(var i = 0; i < newflatarray.length; i++){ 
			var value = newflatarray[i];
			$scope[value] = $sessionStorage[value];		
		}

		$scope.printDiv = function(divName) {
			  var printContents = document.getElementById(divName).innerHTML;
			  var popupWin = window.open('', '_blank', 'width=500,height=500');
			  popupWin.document.open();
			  popupWin.document.write('<html><head><link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css"><link rel="stylesheet" type="text/css" href="assets/css/min/compiled-styles.min.css" /><link rel="stylesheet" type="text/css" href="assets/css/widget-styles.min.css" /><link href="bower_components/angular-ui-grid/ui-grid.css" type="text/css" rel="stylesheet">'+
 				' <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.js"></script><script src="bower_components/angular-ui-grid/ui-grid.min.js"></script></head><body onload="window.print()">' + printContents + '</body></html>');
			  popupWin.document.close();
		}

	}
})()

