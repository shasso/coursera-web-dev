(function () {
    'use strict';
    angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);
    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.count = 0;
        $scope.msg = '';
        $scope.items = new String();
        $scope.check_count = function () {

            console.log('you typed: ' + $scope.items);
            console.log('input length: ' + $scope.items.length);

            if ($scope.items.length > 0) {
                var str = $scope.items.split(',');
                $scope.count = str.length;
            }

            console.log('count: ' + $scope.count);
            if ($scope.count == 0) {
                $scope.msg = 'Please enter data first';
            }
            else if ($scope.count <= 3)
                $scope.msg = "Enjoy!";
            else
                $scope.msg = 'Too much!';
        }

    }
})();
