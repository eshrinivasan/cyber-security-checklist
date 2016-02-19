(function() {
	angular.module("cyberapp.section")
			.controller("SectionController", SectionController);	

		SectionController.$inject = ['$scope', '$state' , '$rootScope', 'datafactory', 'dataservice'];

		function SectionController($scope, $state, $rootScope, datafactory, dataservice){
			var sectionCtrl = this;
			$scope.currentState = $state.current.name;			
			$scope.sectionNumber = $scope.currentState.match(/\d+$/)[0];//filter out non numberic characters ie "section"
			$scope.total = dataservice.getSections();
			$scope.firm = datafactory.firm;
			$scope.allsteps = [1,2,3,4,5,6,7,8,9,10,11];					

			for (var key in $rootScope.sections) {
			  if ($rootScope.sections.hasOwnProperty(key)) {
			  		var increment = ++key;
			  		$scope['section'+increment] = [];
			    	$scope['section'+increment].push($rootScope.sections[--key]);


			    	$scope.Groups = flattenArray( $scope['section'+increment], function (item) {
			            return item.Groups;
			        });

			        $scope.Rows = flattenArray( $scope['section'+increment], function (item) {
			            return item.Rows;
			        });			    	
			  }
			}
			
		    function flattenArray(array, fn) {		    		    	
		        var output = [];
		        for (var i = 0; i < array.length; ++i) {
		            var result = fn(array[i]);
		            if (result)
		                output = output.concat(result);
		        }
		        return output;
		    }
		    
		    $scope.lengthCount = function(obj) {
		    	var k =0;
    	     	for (var i = 0; i < obj.Groups.length; ++i) {
			           k++;
			     }
			    return k;	
		    }
	    

			$scope.printDiv = function(divName) {
			  var printContents = document.getElementById(divName).innerHTML;
			  var popupWin = window.open('', '_blank', 'width=500,height=500');
			  popupWin.document.open();
			  popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="assets/css/min/compiled-styles.min.css" /><link rel="stylesheet" type="text/css" href="assets/css/min/widget-styles.min.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
			  popupWin.document.close();
			}

		}
})()
