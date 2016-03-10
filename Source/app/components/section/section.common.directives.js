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

                if(previndex !== -1){  
                    var prevSection = $localStorage.total[previndex];
                    $scope.prevState = "section."+prevSection;                     
                    $state.go($scope.prevState);
                    $scope.prevPageDisabled = false;
                }else{
                    $scope.prevPageDisabled = true;
                }
            }

            $scope.nextPage = function(){
                var currindex = $scope.getIndex();
                var nextindex = ++currindex; 

                if(nextindex < $localStorage.total.length){
                    var nextSection = $localStorage.total[nextindex];
                    var nextPage = "section."+nextSection;
                    $state.go(nextPage);
                    $scope.nextPageDisabled = false;
                }else if(nextindex == $localStorage.total.length){
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