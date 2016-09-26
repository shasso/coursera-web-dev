(function () {
    'use strict';

    var shoppingList = [
        {
            name: "Milk",
            quantity: "2"
        },
        {
            name: "Donuts",
            quantity: "200"
        },
        {
            name: "Cookies",
            quantity: "300"
        },
        {
            name: "Chocolate",
            quantity: "5"
        },
        {
            name: "yogurt",
            quantity: 2
        }
    ];

    var alreadyBoughtList = [];
    var totalItems2Buy = shoppingList.length;
    var totalItemsBought = 0;

    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['$scope'];

    function ShoppingListController($scope) {
        $scope.shoppingList = shoppingList;
        $scope.alreadyBoughtList = alreadyBoughtList;
        $scope.totalItems2Buy = totalItems2Buy;
        $scope.totalItemsBought = totalItemsBought;
        $scope.boughtMsg = '';
        $scope.toBuyMsg = 'Nothing bought yet.';

        $scope.checkoff = function () {
            console.log('clicked on item: ' + this.$index);

            // add element to alreadyBoughtList
            $scope.alreadyBoughtList.push(shoppingList[this.$index]);
            if (shoppingList.length > 0 ) {
                $scope.toBuyMsg = '';
            }

            // now remove elememnt from shoppingList  
            // use splice trick method of an array to remove item 
            // from list; using filter is another way 
            $scope.shoppingList.splice(this.$index, 1);
            console.log( $scope.shoppingList.length);
            if ( $scope.shoppingList.length == 0 ) {                
                $scope.boughtMsg = 'Everything is bought!'
            }



        }

    }

})();