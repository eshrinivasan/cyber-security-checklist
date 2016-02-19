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
                scope.rows = response.data;
                scope.$broadcast('ready-to-render', scope.rows, scope.cols);
            });
        }
    };
})
.directive("gridColumns", function() {
    return {
        restrict: 'E',
        require: ['^gridScreen', 'gridColumns'],
        controller: function() {
            var columns = [];
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
            console.log('linked gridColumns');
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
                field: attributes.field
            });
            console.log('linked gridColumn', attributes.title);
        }
    };
})
.directive("grid", function() {
    return {
        restrict: 'E',
        templateUrl: "components/section/directives/section2.dir.html",
        replace: true,
        controller: function($scope) {
            $scope.$on('ready-to-render', function(e, rows, cols) {
                $scope.rows = rows;
                $scope.cols = cols;
            });
        }
    };
})
.directive("withInlineEditor", function() {
    return {
        restrict: 'A',
        require: '^gridScreen',
        link: function(scope, element, attributes, gridScreenController) {
           /* gridScreenController.setEditor({
                title: "Edit",
                field: ""
            });*/
            console.log('linked withInlineEditor');
        }
    };
})
.directive("editorInitializer", function($compile, $templateCache) {
    return {
        restrict: 'E',
        templateUrl: 'components/section/directives/usercontrols.dir.html',
        controller: function($scope) {
            $scope.edit = function(row) {
                $scope.$broadcast('edit', row);
            };
        },
        link: function(scope, element, attributes) {
            scope.$on('edit', function(e, row) {
                var editor = $compile($templateCache.get("components/section/usercontrols.editor.dir.html"))(scope);
                $(editor).insertAfter(element.parents("tr"));
            });
            console.log('linked editorInitializer');
        }
    };
})
.directive("gridSectionHeader", function() {
    return {
        restrict: 'E',
        require: '^gridScreen',
        link: function(scope, element, attributes) {
            console.log(attributes.title);
        },
        compile: function(element, attrs) {
            element.append('<h2>' + attrs.title + '</h2>');
        }
    };
})
.directive("gridSectionNotes", function() {
    return {
        restrict: 'E',
        require: '^gridScreen',
        link: function(scope, element, attributes) {          
            console.log('linked sectionnotes');
        },
        compile: function(element, attrs) {
            element.append('<div ng-include="\'' + attrs.template + '\'"></div>');
        }
    };
});