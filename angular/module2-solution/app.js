(function () {
    'use strict';


    angular.module('ShoppingListApp', [])
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var items2Buy = this;     // you use items2Buy in 'controller as items2Buy' in index.html

        // return items to display
        items2Buy.items = ShoppingListCheckOffService.getShoppingList();


        items2Buy.checkoff = function (itemIndex) {
            //console.log('removing:' + items2Buy.items[itemIndex].name, + ' ' + items2Buy.items[itemIndex].quantity);
            ShoppingListCheckOffService.checkOff(itemIndex);
        }

        items2Buy.isEmpty = function () {
            var items = ShoppingListCheckOffService.getShoppingList();
            // console.log('length: ' + items.length)
            return items.length == 0 ? true : false;
        }
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var itemsBought = this;

        // return items to display
        itemsBought.items = ShoppingListCheckOffService.getAleadyBought();

        itemsBought.isEmpty = function () {
            var items = ShoppingListCheckOffService.getAleadyBought();
            // console.log('length: ' + items.length)
            return items.length == 0 ? true : false;
        }
    }

    // service as function object
    function ShoppingListCheckOffService() {
        var service = this;

        // toBuy list
        var toBuy = [
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

        // already bought, initially empty
        var bought = [];

        // expose these properties to outside world
        service.getShoppingList = function () {
            return toBuy;
        }
        service.getAleadyBought = function () {
            return bought;
        }

        // add items to bough list
        service.addItem = function (itemName, howMany) {
            service.getAleadyBought().push({ name: itemName, quantity: howMany });
        }

        // remove items from toBuy list
        service.removeItem = function (itemIndex) {
            toBuy.splice(itemIndex, 1);
        }
        // check off: removes item from toBuy list and add it to bought list
        service.checkOff = function (itemIndex) {
            // console.log(itemIndex);
            service.addItem(toBuy[itemIndex].name, toBuy[itemIndex].quantity);
            service.removeItem(itemIndex)
        }

    }

})();