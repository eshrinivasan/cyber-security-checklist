angular.module("cyberapp.section")
.directive("gridSectionHeader", function() {
    return {
        restrict: 'E',
        link: function(scope, element, attributes) {
            //console.log(attributes.title);
        },
        compile: function(element, attrs) {
            element.append('<h2>' + attrs.title + '</h2>');
        }
    };
})
.directive("gridSectionNotes", function() {
    return {
        restrict: 'E',
        link: function(scope, element, attributes) {          
            //console.log('linked sectionnotes');
        },
        compile: function(element, attrs) {
            element.append('<div ng-include="\'' + attrs.template + '\'"></div>');
        }
    };
})
.directive('ngMultistepsindicator', ['dataservice', '$state', function(dataservice, $state){
    return{
        restrict: 'EA',     
        templateUrl: 'components/section/directives/mstep.dir.html'
    }
}])
.directive('ngPagination', ['dataservice', '$state', '$sessionStorage', '$localStorage',  function(dataservice, $state, $sessionStorage, $localStorage) {
      return {
        restrict: 'EA',                   
        templateUrl: 'components/section/directives/pager.dir.html',
        link: function($scope, element, attrs){
            $scope.currentState = $state.current.name;          
            $scope.sectionNumber = $scope.currentState.match(/\d+$/)[0];//filter out non numberic characters ie "section"
        
            $scope.prevPage = function(){
                var currindex = $scope.getIndex();
                var previndex = --currindex;
                var prevSection = $localStorage.total[previndex];
                $scope.prevState = "section"+prevSection;
                $scope.currState = "section"+currindex;

                var sectosavearr = dataservice.getSectionAssocArray($scope.prevState);
                if(sectosavearr.length > 1){
                    angular.forEach(sectosavearr, function(key, value){
                      if($localStorage[key] != null)
                            $scope[key] = $localStorage[key]; //storing in session
                    });
                }else{
                       if($localStorage[$scope.prevState] != null)
                            $scope[$scope.prevState] = $localStorage[$scope.prevState];    
                }


                if(typeof $localStorage.total !== "undefined" && previndex !== -1){                   
                    $state.go($scope.prevState);
                    $scope.prevPageDisabled = false;
                }else{
                    $scope.prevPageDisabled = true;
                }
            }

            $scope.nextPage = function(){
                var currindex = $scope.getIndex();
                var nextindex = ++currindex;                

                var sectosavearr = dataservice.getSectionAssocArray($scope.currentState);
                if(sectosavearr.length > 1){
                    angular.forEach(sectosavearr, function(key, value){
                        $localStorage[key] = $scope[key]; //storing in session
                    });
                }else{
                    if($localStorage[$scope.currentState] == null)
                        $localStorage[$scope.currentState] = $scope[$scope.currentState]; //storing in session    
                  
                }
                

                if(typeof $localStorage.total !== "undefined" && nextindex < $localStorage.total.length){
                    var nextSection = $localStorage.total[nextindex];
                    var nextPage = "section"+nextSection;
                    $state.go(nextPage);
                    $scope.nextPageDisabled = false;
                }else if(typeof $localStorage.total !== "undefined" && nextindex == $localStorage.total.length){
                    var nextPage = "print";
                    $state.go(nextPage);
                }else{
                    $scope.nextPageDisabled = true;
                }
            }

            $scope.getIndex = function(){
                if(typeof $localStorage.total!== "undefined"){
                    var index = $localStorage.total.indexOf($scope.sectionNumber);
                    return index;
                }                   
            }
        }
      }
}]);  