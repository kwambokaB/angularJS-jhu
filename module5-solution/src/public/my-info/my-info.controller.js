(function () {
  "use strict";

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['MenuService'];
  function MyInfoController(MenuService) {
    var myInfoCtrl = this;

    var myInfoDataStatus = MenuService.myInfoMenuData();
    if (myInfoDataStatus) {
      myInfoCtrl.notregistered = false;
      myInfoCtrl.menu_data = myInfoDataStatus;
      myInfoCtrl.user_data = MenuService.getMyInfoSavedData();
    } else {
      myInfoCtrl.notregistered = true;
    }
  }

})();
