(function(){
    angular
        .module("WhiteBoardApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "home.html"
            })
            .when("/register", {
                templateUrl: "register.html"
            })
            .when("/courses", {
                templateUrl: "courses.html",
                controller: "CourseController"
            })
            .when("/courseEdit/:count", {
                templateUrl: "courseEdit.html",
                controller: "CourseEditController"
            })
            .when("/login", {
                templateUrl: "login.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();