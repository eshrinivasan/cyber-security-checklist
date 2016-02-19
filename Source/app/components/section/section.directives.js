(function() {
    angular.module("cyberapp.section")
            .directive('ngMultistepsindicator', ['dataservice', '$state', function(dataservice, $state){
                return{
                    restrict: 'EA',     
                    templateUrl: 'components/section/directives/mstep.dir.html'
                }
            }])
            .directive('ngPagination', ['dataservice', '$state', function(dataservice, $state) {
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

                            console.log($scope.total);

                            if(typeof $scope.total !== "undefined" && nextindex < $scope.total.length){
                                var nextSection = $scope.total[nextindex];
                                $state.go("section"+nextSection);
                                $scope.nextPageDisabled = false;
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
            }])
            .directive('userControls', ['dataservice', '$state', function(dataservice, $state){
                return{
                    restrict: 'EA',     
                    templateUrl: 'components/section/directives/usercontrols.dir.html',
                    link: function($scope, element, attrs){
                        $scope.rows = [];

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
                        }
                    }
                }
            }])
             .directive('sectiononeDir', ['dataservice', '$state', function(dataservice, $state){
                return{
                    restrict: 'EA',     
                    templateUrl: 'components/section/directives/section1.dir.html'
                }
            }]);            
})()
