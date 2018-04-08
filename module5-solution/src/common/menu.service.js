(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);

MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var favorite_menu_data;
  var saved_user_data = {};

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuCodeData = function (code) {
    return $http.get(ApiPath + '/menu_items/' + code + '.json')
    .then(function(response) {
      favorite_menu_data = response.data;
      return true;
    },
    function(error) {
        return false;
    });
  }

  service.saveInfo = function (firstname, lastname, email, phone, code) {
    saved_user_data['firstname'] = firstname;
    saved_user_data['lastname'] = lastname;
    saved_user_data['email'] = email;
    saved_user_data['phone'] = phone;
    saved_user_data['code'] = code;
  }

  service.getMyInfoSavedData = function () {
    return saved_user_data;
  }

  service.myInfoMenuData = function () {
    return favorite_menu_data;
  }
}

})();
