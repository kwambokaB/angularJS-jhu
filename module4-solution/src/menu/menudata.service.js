/* 5 */
(function () {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('ApiServicePath', "https://davids-restaurant.herokuapp.com")

  MenuDataService.$inject = ['$http', 'ApiServicePath']
  function MenuDataService($http, ApiServicePath) {
    var service=this;
    /* 5a */
    service.getAllCategories= function() {
      return $http({
        method: "GET",
        url: (ApiServicePath + "/categories.json")
      });
    };
    /* 5b */
    service.getItemsForCategory = function(categoryShortName) {
      return $http({
        method: "GET",
        url: (ApiServicePath + "/menu_items.json"),
        params: {
          category: categoryShortName
        }
      });
    };
  }
})();
