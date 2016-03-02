(function() {
    angular.module('cyberapp.core')
    		.service('dataservice', dataservice);

    dataservice.inject = ['$state', '$rootScope', '$http', '$sessionStorage'];

    function dataservice($state, $rootScope, $http, $sessionStorage){

    	var service = {
            setJsonData: setJsonData,
            getJsonData: getJsonData,
            setCollectionData: setCollectionData,
            getCollectionData: getCollectionData,
    		getNextSection : getNextSection,
            getSections : getSections,
    		setSection : setSection,
    		getCurrentState: getCurrentState,
            getSectionNoLast: getSectionNoLast,
            getSectionAssocArray: getSectionAssocArray,
            getJsonStore: getJsonStore,
            getSectionLast: getSectionLast,
            piidata:piidata,
            location:location,
            risklevel:risklevel
    	};

    	return service;

    	var _sectionArr = [];
    	var totalsArr = [];
        var datajsonObj = {};
        var storedJsonValues = [];

        function getJsonStore(){
             var jsonstore = {
                        'section1' : 'components/core/data/data.section1.json',
                        'section2' : 'components/core/data/data.section2.json',
                        'section3a': 'components/core/data/data.section3a.json',
                        'section3b': 'components/core/data/data.section3b.json',
                        'section4a' : 'components/core/data/data.section4a.json',
                        'section4b' : 'components/core/data/data.section4b.json',
                        'section5' :  'components/core/data/data.section5.json',
                        'section6' :  'components/core/data/data.section6.json',
                        'section7a' : 'components/core/data/data.section7a.json',
                        'section7b' : 'components/core/data/data.section7b.json',
                        'section7c' : 'components/core/data/data.section7c.json',
                        'section7d' : 'components/core/data/data.section7d.json',
                        'section8' : 'components/core/data/data.section8.json',
                        'section9a' : 'components/core/data/data.section9a.json',
                        'section9b' : 'components/core/data/data.section9b.json',
                        'section10a': 'components/core/data/data.section10a.json',
                        'section10b': 'components/core/data/data.section10b.json',
                        'section10c': 'components/core/data/data.section10c.json',
                        'section11': 'components/core/data/data.section11.json'
                }

            return jsonstore;
        }

        function getSectionAssocArray(key){
            var sectionMap = {
                'section1': "section1",
                'section2': "section2",
                'section3' : "section3a,section3b",
                "section4" : "section4a,section4b",
                "section5" : "section5",
                "section6" : "section6",
                "section7" : "section7a,section7b,section7c,section7d",
                "section8" : "section8",
                "section9" : "section9a,section9b",
                "section10" : "section10a,section10b,section10c",
                "section11" : "section11"
            }
            return sectionMap[key].split(',');
        }

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
        }

        function getCollectionData(sec){
            if(arguments.length)
            return storedJsonValues[sec];
            else
            return storedJsonValues;
        }

        function getSectionLast(){
            return _sectionArr[_sectionArr.length-1];
        }


       //Sharing with print controller
        function piidata(col, row){
            row.entity.piidata = $sessionStorage.section1.data[0].piidata;
            return row.entity.piidata;  
        }

        function location(col, row){
            row.entity.location = $sessionStorage.section1.data[0].location;
            return row.entity.location;
        }

        function risklevel(col, row){
            row.entity.risklevel = $sessionStorage.section1.data[0].risklevel;
            return row.entity.risklevel;
        }

    
       
    }
})()