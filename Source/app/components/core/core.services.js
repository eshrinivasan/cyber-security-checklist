(function() {
    angular.module('cyberapp.core')
    		.service('dataservice', dataservice);

    dataservice.inject = ['$state', '$rootScope'];

    function dataservice($state, $rootScope){        
    	var service = {
    		getNextSection : getNextSection,
            getSections : getSections,
    		setSection : setSection,
    		getCurrentState: getCurrentState,
            getSectionNoLast: getSectionNoLast
    	};

    	return service;

        $rootScope.previousState;
        $rootScope.currentState;
    	var _sectionArr = [];
    	var totalsArr = [];

        //public getter
    	function getNextSection(){
            //console.log('service'+_sectionArr);
            var nextSection = "section"+_sectionArr.shift();
    		/*if(getCurrentState == nextSection)
                return;
            else*/
               return nextSection;                  
    	}

        function getSections(){
            return _sectionArr;
        }

        function getSectionNoLast(){
            return _sectionArr.pop();
        }

        //public setter
    	function setSection(totalsArr){         
    		_sectionArr = processArray(totalsArr);
    	}

        //private
    	function processArray(totalsArr){
	    	//Sort the number array using javascript sort
	  		totalsArr.sort(function(a, b) {
			  return a - b;
			});

	  		 /*//Remove duplicates from array
			totalsArr = totalsArr.filter( function( item, index, inputArray ) {					  
		           return inputArray.indexOf(item) == index;
			});*/
            
			return totalsArr;
    	}

    	function getCurrentState(){
    		return $scope.state.name;                   
    	}	
    }
})()