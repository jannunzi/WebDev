(function(){
    "use strict";
    angular
        .module("CourseEditorApp")
        .config(Configure);

    function Configure($routeProvider, $provide){
        $routeProvider
            .when("/editor", {
                templateUrl: "views/course/course.list.view.html",
                controller: "CourseController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "editor"
            });

    };
})();