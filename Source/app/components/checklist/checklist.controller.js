(function() {
	angular.module("cyberapp.checklist")
			.controller("ChecklistController", ChecklistController);

	ChecklistController.$inject = ['$scope', '$state', '$rootScope','datafactory', 'dataservice'];

	function ChecklistController($scope, $state, $rootScope, datafactory, dataservice){
		var checklistCtrl = this;
		$scope.questions = datafactory.questions;
		$scope.allanswers = [];
		$scope.total = [];	
		$scope.sectionArray = [];
		$scope.notAnsweredAll = true;
		$scope.counter = 0;
		$scope.section;
		var date = new Date();
		$scope.lastUpdated = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();	
		$scope.last = "12";

		$scope.firm = datafactory.firm;
		$rootScope.sections = dataservice.getJsonData();


		$scope.addInfo = function($index){
			this.SectiontoComplete = $scope.questions[$index].section;			
			this.showText = true;
		}

		$scope.removeInfo = function($index){			
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
			dataservice.setSection($scope.total);
			//console.log($scope.total);
	  	}

	  	$scope.clearUserInput = function(sections){	  	  	
	  		//Remove array of elements from the total array on clicking "No"
  			$scope.sectionArray = sections.section.split(',');	 
  			$scope.total = $scope.total.filter(function(item) {
    			return $scope.sectionArray.indexOf(item) === -1;
			});		
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
	  		//Now the allanswers array has 5 answers, lets start with the first section in the total array.
	  		if($scope.allanswers.length == 5 && $scope.notAnsweredAll == false){
	  			if(typeof $scope.total[0] != undefined){
	  				var sectiontoforward = "section"+$scope.total[0];		  		
	  				$state.go(sectiontoforward);	
	  			}else{
	  				$scope.answerAlltext = true; //If all answers are "No"
	  			}
	  			
	  		}else{
	  			$scope.answerAlltext = true;
	  		}
	  		
	  	}
	}
})()