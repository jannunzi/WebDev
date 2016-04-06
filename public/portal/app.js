(function(){
  angular
    .module("WhiteBoardApp", ['ngRoute', 'gist', 'escapeHtml'])
    .filter('underscore2space', function () {
      return function (value) {
          return (!value) ? '' : value.replace(/_/g, ' ').replace(/examples/, '');
      };
    });
})();