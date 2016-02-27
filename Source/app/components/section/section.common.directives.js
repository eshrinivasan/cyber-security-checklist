angular.module("cyberapp.section")
.directive('setRowHeight',['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
              $timeout(function(){
                // Get the Parent Divider.
                var parentContainer = element.parent()[0];
                console.log(parentContainer.offsetHeight);

                // Padding of ui-grid-cell-contents is 5px.
                // TODO: Better way to get padding height?
                var topBottomPadding = 10;
                //Get the wrapped contents rowHeight.
                var rowHeight = topBottomPadding + parentContainer.offsetHeight;
                var gridRowHeight = scope.grid.options.rowHeight;
                // Get current rowHeight
                if (!gridRowHeight ||
                        (gridRowHeight && gridRowHeight < rowHeight)) {
                    // This will OVERRIDE the existing rowHeight.
                    scope.grid.options.rowHeight = rowHeight;
                }
              },0);
            }
        };
}])
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
.directive('ngPagination', ['dataservice', '$state', '$sessionStorage', function(dataservice, $state, $sessionStorage) {
      return {
        restrict: 'EA',                   
        templateUrl: 'components/section/directives/pager.dir.html',
        link: function($scope, element, attrs){
            $scope.currentState = $state.current.name;          
            $scope.sectionNumber = $scope.currentState.match(/\d+$/)[0];//filter out non numberic characters ie "section"

            $scope.prevPage = function(){
                var currindex = $scope.getIndex();
                var previndex = --currindex;

                if(typeof $scope.total !== "undefined" && previndex !== -1){
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

                 var sectosavearr = dataservice.getSectionAssocArray($scope.currentState);

                  function getIndividualElem(){
                    var arr = [];
                    for(var i =0; i< arguments.length; i++){
                        arr.push(arguments[i].slice(i, i+1));
                    }
                    return arr;
                }

                if(sectosavearr.length > 1){
                    var keyStore = getIndividualElem.apply(null, sectosavearr);                    
                    console.log(keyStore);
                    angular.forEach(keyStore, function(key, value){
                        $sessionStorage[key] = $scope[key]; //storing in session
                    });
                }else{
                    $sessionStorage[$scope.currentState] = $scope[$scope.currentState]; //storing in session    
                }

                console.log($sessionStorage[$scope.currentState]);
                if(typeof $scope.total !== "undefined" && nextindex < $scope.total.length){
                    var nextSection = $scope.total[nextindex];
                    var nextPage = "section"+nextSection;                                                               

                    $state.go(nextPage);
                    $scope.nextPageDisabled = false;

                }else if(typeof $scope.total !== "undefined" && nextindex == $scope.total.length){
                    var nextPage = "print";
                    $state.go(nextPage);
                }else{
                    $scope.nextPageDisabled = true;
                }
            }

            $scope.getIndex = function(){
                if(typeof $scope.total !== "undefined"){
                    var index = $scope.total.indexOf($scope.sectionNumber);
                    return index;
                }                   
            }
        }
      }
}]);  