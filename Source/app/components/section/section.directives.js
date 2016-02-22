(function() {
    angular.module("cyberapp.section")
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

                        $scope.saveAll = function(){
                            console.log('saving globalrows');
                            console.log($scope.globalrows);
                        }   
                        
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

                            $sessionStorage[currindex] = $scope.globalrows; //storing in session                            
                            dataservice.setCollectionData($scope.globalrows); //saving it in a service
                            

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
})()
