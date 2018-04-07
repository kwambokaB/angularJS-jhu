(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var tbc = this;

    tbc.toBuy = ShoppingListCheckOffService.getItemsToBuy();

    tbc.itemBought = function($index) {
      ShoppingListCheckOffService.itemBought($index);
    };
  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var abc = this;

    abc.bought = ShoppingListCheckOffService.getItemsBought();
  }


  function ShoppingListCheckOffService() {
    var service = this;

    // List of items to buy
    var toBuy = [
      {
        name: "Sparkling Water",
        quantity: "5"
      },
      {
        name: "Potato Crisps",
        quantity: "1"
      },
      {
        name: "Banana Juice",
        quantity: "3"
      },
      {
        name: "Mangoes",
        quantity: "4"
      },
      {
        name: "Tulips",
        quantity: "10"
      }
    ];

    // List of items bought
    var bought = [];

    service.getItemsToBuy = function () {
      return toBuy;
    };

    service.getItemsBought = function () {
      return bought;
    };

    service.itemBought = function (itemIndex) {
      bought.push(toBuy[itemIndex]);
      toBuy.splice(itemIndex, 1);
    };
  }

})();
