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
			$scope.rows = [{
					"cell1": "first", 
					"cell2": "second", 
					"cell3": "third"
			}]

			$scope.prevPage = function(){
				var currindex = $scope.getIndex();
				var previndex = --currindex;

				if(previndex != -1){
					var prevSection = $scope.total[previndex];
					$state.go("section"+prevSection);
					$scope.prevPageDisabled = false;
				}else{
					$scope.prevPageDisabled = true;
				}
			}

			$scope.nextPage = function(){
				var currindex = $scope.getIndex();
				var nextindex = ++currindex;

				if(nextindex < $scope.total.length){
					var nextSection = $scope.total[nextindex];
					$state.go("section"+nextSection);
					$scope.nextPageDisabled = false;
				}else{
					$scope.nextPageDisabled = true;
				}
			}

			$scope.getIndex = function(){
				var index = $scope.total.indexOf($scope.sectionNumber);
				return index;
			}

			$scope.section1 = [{
				"id":1, 
				"Name": "Section 1 – Identify and Assess Risks: Inventory",
				"Groups":[
				 	 {"cell" : "PII or Firm Sensitive Data"}, 
				 	 {"cell" : "Location (e.g., Network Drive, System Folder, email)"}, 
				 	 {"cell" : "Risk Severity Level"}
				 ],
				"Rows":[],
				"FootNotes":[
				 	{"templateurl" : "components/section/templates/notes/section1.notes.html"}
				 ]	
			}]

			$scope.addRows = function(){
				$scope.rows.push(
					{
						"cell1": "", 
						"cell2": "", 
						"cell3": ""
					}
				);			
			}

			$scope.saveRows = function(){				
				$scope.Rows.push($scope.rows);
				$scope.section1.Rows = $scope.Rows;
				console.log($scope.section1);
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
	    
	        $scope.Groups = flattenArray($scope.section1, function (item) {
	        	//console.log(item.Groups);
	            return item.Groups;
	        });

	         $scope.Rows = flattenArray($scope.section1, function (item) {
	         	//console.log(item.Rows);
	            return item.Rows;
	        });


			$scope.section5 = {
				'field1' : 'These',
				'field2' : 'are',
				'field3' : 'placeholder',
				'field4' : 'values',
				'field5' : 'at the',
				'field6' : 'moment',
				'field21' : 'These',
				'field22' : 'are',
				'field23' : 'placeholder',
				'field24' : 'values',
				'field25' : 'at the',
				'field26' : 'moment'
			}
			
			$scope.printDiv = function(divName) {
			  var printContents = document.getElementById(divName).innerHTML;
			  var popupWin = window.open('', '_blank', 'width=500,height=500');
			  popupWin.document.open();
			  popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="assets/css/min/compiled-styles.min.css" /><link rel="stylesheet" type="text/css" href="assets/css/min/widget-styles.min.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
			  popupWin.document.close();
			}

			/*$scope.section5 = [
				 {th1:"Systems",th1field1:"th1field1",th1field2:"th1field2"},
		         {th2:"Risk to Firm if  System is Inoperable",th2field1:"th2field1",th2field2:"th2field2"},
		         {th3:"Password Protection",th3field1:"th3field1",th3field2:"th3field2"},
		         {th4:"Malware/ Anti-virus/Firewalls",th4field1:"th4field1",th4field2:"th4field2"},
		         {th5:"Regularly Scheduled Backups",th5field1:"th5field1",th5field2:"th5field2"},
		         {th6:"Remediate",th6field1:"th6field1",th6field2:"th6field2"},
			]*/	
		}
})()
