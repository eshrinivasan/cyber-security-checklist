//   <grid-screen resource="/api/data.json">
//     <grid-columns>
//       <grid-column title="Product"     field="product"></grid-column>
//       <grid-column title="Description" field="description"></grid-column>
//       <grid-column title="Cost"        field="cost"></grid-column>
//     </grid-columns>
//     <grid with-inline-editor></grid>
//   </grid-screen>

// 3 domain objects: editor, edit, columns, rows

angular.module("cyberapp.section")

.directive("gridScreen", function($http) {
    return {
        restrict: 'E',
        controller: function($scope) {
            // columns, editor           
            this.setEditor = function(editor) {
                $scope.cols.unshift(editor);
            };
            this.setColumns = function(cols) {
                $scope.cols = cols;
            };           
        },
        link: function(scope, element, attributes) {
            $http.get(attributes.resource).success(function(response) {
                if(scope.globalrows !== undefined){
                    scope.globalrows.rows = response.data;
                    scope.$broadcast('ready-to-render', scope.globalrows.rows, scope.cols);
                }
            });
        }
    };
})

.directive("gridColumns", function() {
    return {
        restrict: 'E',
        require: ['^gridScreen', 'gridColumns'],
        controller: function($scope) {
            var columns = [];
            counter = 0;

            this.addColumn = function(col) {
                columns.push(col);
            };

            this.getColumns = function() {
                return columns;
            };
        },
        link: function(scope, element, attributes, controllers) {
            var gridScreenController = controllers[0];
            var gridColumnsController = controllers[1];
            gridScreenController.setColumns(gridColumnsController.getColumns());
            //console.log('linked gridColumns');
        }
    };
})
.directive("gridColumn", function() {
    return {
        restrict: 'E',
        require: '^gridColumns',
        link: function(scope, element, attributes, gridColumnsController) {
            gridColumnsController.addColumn({
                title: attributes.title,
                field: attributes.field,
                type: attributes.type
            });
           // console.log('linked gridColumn', attributes.title);
        }
    };
})
.directive("grid", function() {
    return {
        restrict: 'E',
        templateUrl: "components/section/directives/section.shared.dir.html",
        replace: true,
        controller: function($scope) {
            $scope.$on('ready-to-render', function(e, rows, cols) {
               // console.log(rows, cols);
                $scope.globalrows.rows = rows;
                $scope.cols = cols;
            });
        }
    };
})
.directive("gridPrint", function($sessionStorage, dataservice) {
    return {
        restrict: 'E',
        templateUrl: "components/print/templates/print.dir.html",
        replace: true,
        controller: function($scope, $state, $attrs) {
            //$scope.globalval = $sessionStorage[1];             
            console.log("within grid print directive");
            $scope.globalrows = dataservice.getCollectionData();

        },
        link: function(scope, element, attributes){
           // console.log("in grid print"+attributes['section']);            
        }
    };
})
.directive("withInlineEditor", function() {
    return {
        restrict: 'A',
        require: '^gridScreen',       
        link: function(scope, element, attributes, gridScreenController) {
            gridScreenController.setEditor({
                title: "Add",
                field: ""
            });
            //console.log('linked withInlineEditor');
        }
    };
})
.directive("editorInitializer", function($compile, $templateCache) {
    return {
        restrict: 'E', 
        templateUrl:'components/section/directives/usercontrols.dir.html',       
        controller: function($scope) {
            $scope.add = function(row) {
                $scope.$broadcast('add', row);
            };
        },
        link: function(scope, element, attributes) {
            scope.$on('add', function(e, row) {
                var row = {};
                scope.globalrows.rows.push(row);
                var editor = $compile($templateCache.get("components/section/directives/usercontrols.editor.dir.html"))(scope);
                $(editor).insertAfter(element.parents("tr"));
            });

            //console.log('linked editorInitializer');
        }
    };
})

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
});