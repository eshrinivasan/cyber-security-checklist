(function() {
    angular.module('cyberapp.core')
    		.service('dataservice', dataservice);

    dataservice.inject = ['$state', '$rootScope', ',$http'];

    function dataservice($state, $rootScope, $http){           

    	var service = {
            setJsonData: setJsonData,
            getJsonData: getJsonData,
            setCollectionData: setCollectionData,
            getCollectionData: getCollectionData,
    		getNextSection : getNextSection,
            getSections : getSections,
    		setSection : setSection,
    		getCurrentState: getCurrentState,
            getSectionNoLast: getSectionNoLast
    	};

    	return service;

    	var _sectionArr = [];
    	var totalsArr = [];
        var datajsonObj = {};
        var storedJsonValues = [];

        //public getter
    	function getNextSection(){            
            var nextSection = "section"+_sectionArr.shift();
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


        function setJsonData(data){
             datajsonObj = data;
        }

        function getJsonData(){
            return datajsonObj;
        }

        function setCollectionData(data){
            storedJsonValues = storedJsonValues || [];
            storedJsonValues.push(data);
            //console.log(storedJsonValues);
        }

        function getCollectionData(sec){
            if(arguments.length)
            return storedJsonValues[sec];
            else
            return storedJsonValues;
        }
       
    }
})()