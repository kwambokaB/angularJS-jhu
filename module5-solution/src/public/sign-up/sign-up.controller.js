(function () {
  "use strict";

  angular.module('public')
  .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuService'];
  function SignUpController(MenuService) {
    var signUpCtrl = this;
    signUpCtrl.error = false;
    signUpCtrl.saved = false;

    signUpCtrl.submit = function () {
      MenuService.getMenuCodeData(signUpCtrl.menucode)
      .then(function(response) {
        if (response) {
          signUpCtrl.error = false;
          signUpCtrl.saved = true;
          MenuService.saveInfo(
            signUpCtrl.firstname,
            signUpCtrl.lastname,
            signUpCtrl.email,
            signUpCtrl.phone,
            signUpCtrl.menucode
          );
        } else {
          signUpCtrl.error = true;
          signUpCtrl.saved = false;
        }
      });
    }
  }
})();
