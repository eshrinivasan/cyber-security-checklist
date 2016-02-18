(function() {
    angular.module("cyberapp.section")
            .directive('ngMultistepsindicator', ['dataservice', '$state', function(dataservice, $state){
                return{
                    restrict: 'EA',     
                    templateUrl: 'components/section/directives/mstep.index.html'
                }
            }])
            .directive('ngPagination', ['dataservice', '$state', function(dataservice, $state) {
                  return {
                    restrict: 'EA',
                    templateUrl: 'components/section/directives/pager.index.html'
                  }
            }])
             .directive('sectiononeDir', ['dataservice', '$state', function(dataservice, $state){
                return{
                    restrict: 'EA',     
                    templateUrl: 'components/section/directives/section1.dir.html'
                }
            }]);            
})()
