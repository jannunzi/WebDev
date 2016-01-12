(function(){
    "use strict";
    angular
        .module("CourseEditorApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location){
        var model = this;
        model.getActive = function (path){
            if($location.path().substr(0, path.length) === path){
                return 'active';
            }
            return '';
        }
        model.logout = function(){
            $rootScope.user = null;
            $location.path('home');
        }
        model.loggedIn = function(){
            return $rootScope.user;
        }
    };
})();