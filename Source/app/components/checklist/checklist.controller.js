(function() {
	angular.module("cyberapp.checklist")
			.controller("ChecklistController", ChecklistController);

	ChecklistController.$inject = ['$scope', '$state', 'datafactory', 'pagerservice'];

	function ChecklistController($scope, $state, datafactory, pagerservice){
		var checklistCtrl = this;
		$scope.questions = datafactory.questions;
		$scope.allanswers = [];
		$scope.total = [];	
		$scope.sectionArray = [];
		$scope.notAnsweredAll = true;
		$scope.counter = 0;
		$scope.section;
		$scope.lastUpdated = "12/31/2015";	
		$scope.last = "12";

		$scope.firm = datafactory.firm;
		//console.log($scope.firm);

		$scope.addInfo = function($index, question){
			this.SectiontoComplete = $scope.questions[$index].section;			
			this.showText = true;
		}

		$scope.removeInfo = function($index, question){			
			this.showText = false;
		}

		$scope.toggleActivateYes = function(question) {
	    	question.ActiveYes = !question.ActiveYes;
	    	question.ActiveNo = false;
	    	this.processUserInput(question.section);
	    	this.answered(question);	    	
	  	}  

	  	$scope.toggleActivateNo = function(question) {
	    	question.ActiveNo = !question.ActiveNo;	    	
	    	question.ActiveYes = false;	
	    	this.clearUserInput(question);	    	
	    	this.answered(question);    	
	  	}  

	  	$scope.processUserInput = function(sections){
	  		$scope.sectionArray = sections.split(',');
	  		var idx = $scope.sectionArray.toString();
	  		if($scope.total.indexOf(idx) === -1)//Insert section only if it is not there already
	  			$scope.total = $scope.total.concat($scope.sectionArray);	  		
			pagerservice.setSection($scope.total);
			//console.log($scope.total);
	  	}

	  	$scope.clearUserInput = function(sections){	  	  	
	  		if(sections.id!= 5){ //Remove array of elements from the total array on clicking "No"
	  			$scope.sectionArray = sections.section.split(',');	 
	  			$scope.total = $scope.total.filter(function(item) {
	    			return $scope.sectionArray.indexOf(item) === -1;
				}); 				
	  		}		  	 	
	  		//console.log($scope.total);
	  	}


	  	$scope.answered = function(question){
	  		//Push unique answers to "Yes/No" to all answers array
	  		if($scope.allanswers.indexOf(question.id) === -1)
	  			$scope.allanswers.push(question.id);
	  		
	  		//Enable the Start button once all the questions are answered
	    	if($scope.allanswers.length == 5 )
	  			$scope.notAnsweredAll = false;
	  	}

	  	$scope.isAnswered = function(){
	  		//Now the total is populated, lets start with the first section in the total array.
	  		var sectiontoforward = "section"+$scope.total[0];	
	  		console.log($scope.total);
	  		$state.go(sectiontoforward);
	  	}
	}
})()