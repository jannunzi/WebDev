(function(){
  angular
    .module("WhiteBoardApp", ['ngRoute'])
    .filter('underscore2space', function () {
      return function (value) {
          return (!value) ? '' : value.replace(/_/g, ' ');
      };
    });
})();