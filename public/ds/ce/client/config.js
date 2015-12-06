(function(){
    "use strict";
    angular
        .module("CourseEditorApp")
        .config(Configure);

    function Configure($routeProvider){
        $routeProvider
            .when("/editor", {
                templateUrl: "views/course/course.list.view.html",
                controller: "CourseController"
            })
            .otherwise({
                redirectTo: "editor"
            });
    };
})();