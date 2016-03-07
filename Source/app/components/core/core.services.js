(function() {
    angular.module('cyberapp.core')
    		.service('dataservice', dataservice);

    dataservice.inject = ['$state', '$rootScope', '$http', '$sessionStorage', '$localStorage'];

    function dataservice($state, $rootScope, $http, $sessionStorage, $localStorage){

    	var service = {
            asyncData:asyncData,
    		getNextSection : getNextSection,
            getSections : getSections,
    		setSection : setSection,
            getSectionNoLast: getSectionNoLast,
            getSectionAssocArray: getSectionAssocArray,
            getJsonStore: getJsonStore,
            getSectionLast: getSectionLast,
            getScopeObjectsWithValue:getScopeObjectsWithValue,
            resetLocallyStored: resetLocallyStored,
            getSamePageScopeValue:getSamePageScopeValue
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

        function resetLocallyStored(){
             var sectionNames = getJsonStore();

             angular.forEach(sectionNames, function(value, key){
                   $localStorage[key] = null;
            });
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

        function asyncData(section) {
          var promise;
          var jsondataurl = getJsonStore()[section];

          promise = $http.get(jsondataurl).then(function (response) {  
                return response.data;
          });
         
          return promise;
        }
     
        //public getter
    	function getNextSection(){            
            var nextSection = "section"+ $localStorage._sectionArr.shift();
    	    return nextSection;                  
    	}

        function getSections(){
            return $localStorage._sectionArr;
        }

        function getSectionNoLast(){
            return $localStorage._sectionArr.pop();
        }

        //public setter
    	function setSection(totalsArr){         
    		$localStorage._sectionArr = processArray(totalsArr);
    	}

        //private
    	function processArray(totalsArr){
	    	//Sort the number array using javascript sort
	  		totalsArr.sort(function(a, b) {
			  return a - b;
			});
            
			return totalsArr;
    	}
        

    	
        function getSectionLast(){
            return $localStorage._sectionArr[$localStorage._sectionArr.length-1];
        }

       
        function getScopeObjectsWithValue(srcObj, destObj, currSection, val){
            var sectionInfo = _getSectionstoInsert(srcObj, destObj);
            //pre-populate section1 values into other sections with matching keys
           var checkArrayInsertionReqd = ['section1', 'section2', 'section4a', 'section6'];
           
           if(checkArrayInsertionReqd.indexOf(val) > -1){
            for(var j= 0; j< srcObj.length-1;j++){       
                destObj.push({});
            } 
           }
            
         
            if($localStorage[val] != null){               
                currSection.data = $localStorage[val].data; 
            }            
                        
            if(sectionInfo.sectiontoInsert){//Sections to be prepopulated with section1 values               
                for(var i= 0; i< srcObj.length; i++){                    
                     for( var prop in srcObj[i] ){
                        destObj[i][prop] = srcObj[i][prop];                        
                    }
                }
            }
        }

        function _getSectionstoInsert(srcObj, destObj){
            var sectionInfo = {
                sectiontoInsert:false,
                prepopulateCount:0
            }

            for(var i= 0; i< srcObj.length; i++){   //srcObj is array
                  for( var prop in srcObj[i] ){
                        if (destObj[0].hasOwnProperty(prop)) {            
                            sectionInfo.prepopulateCount++;                         
                        }                          
                  }
                // console.log(sectionInfo.prepopulateCount);   
                 break;      
            }            
            
            if(sectionInfo.prepopulateCount && sectionInfo.prepopulateCount%3 == 0) sectionInfo.sectiontoInsert = true;
            return sectionInfo;
        }

        function getSamePageScopeValue(srcObj, destObj){
            angular.forEach(srcObj, function(value, key){
                    destObj[key] = srcObj[key]; 
            });
        }
       
    }
})()