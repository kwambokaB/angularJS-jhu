(function () {
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
    ;

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;

        ctrl.found = [];
        ctrl.searchStr = "";

        ctrl.handleNarrowDown = function () {
            var searchStr = ctrl.searchStr.trim().toLowerCase();
            if (searchStr) {
                var getItemsPromise = MenuSearchService.getMatchedMenuItems(searchStr);
                getItemsPromise.then(function (result) {
                    ctrl.found = angular.copy(result) || [];
                    console.log(ctrl.found);
                }).catch(function (error) {
                    console.log("Error while getting data ", error);
                })
            }
            else {
                if (ctrl.found && ctrl.found.length) {
                    ctrl.found = [];
                }
            }
        };

        ctrl.removeItem = function (index) {
            ctrl.found.splice(index, 1);
        }
    };

    function FoundItems() {
        var ddo = {
            templateUrl: 'foundItem.html',
            scope: {
                data: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }

    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchStr) {
            var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function (result) {
                if (result.data.menu_items && result.data.menu_items) {
                    return result.data.menu_items.filter(function (item) {
                        return item.description.toLowerCase().indexOf(searchStr) !== -1;
                    })
                }
                return [];
            });
            return response;
        }
    }


})();