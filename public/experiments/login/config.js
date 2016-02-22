(function(){
    angular
        .module("LoginExample")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();