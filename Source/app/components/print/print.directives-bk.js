angular.module("cyberapp.print")
.directive("gridPrintScreen", function($http, $sessionStorage) {
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
            //$http.get(attributes.resource).success(function(response) {
                scope.globalrows.rows = $sessionStorage[1].rows;
                scope.$broadcast('ready-to-render', scope.globalrows.rows, scope.cols);
            //});
        }
    };
})
.directive("gridPrintColumns", function() {
    return {
        restrict: 'E',
        require: ['^gridPrintScreen', 'gridPrintColumns'],
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
            var gridPrintScreenController = controllers[0];
            var gridPrintColumnsController = controllers[1];
            gridPrintScreenController.setColumns(gridPrintColumnsController.getColumns());
            //console.log('linked gridColumns');
        }
    };
})
.directive("gridPrintColumn", function() {
    return {
        restrict: 'E',
        require: '^gridPrintColumns',
        link: function(scope, element, attributes, gridPrintColumnsController) {
            gridPrintColumnsController.addColumn({
                title: attributes.title,
                field: attributes.field,
                type: attributes.type
            });
           // console.log('linked gridColumn', attributes.title);
        }
    };
})
.directive("gridPrint", function() {
    return {
        restrict: 'E',
        templateUrl: "components/print/templates/print.dir.html",
        replace: true,
        controller: function($scope) {
            $scope.$on('ready-to-render', function(e, rows, cols) {
               // console.log(rows, cols);
                $scope.globalrows.rows = rows;
                $scope.cols = cols;
            });
        }
    };
});