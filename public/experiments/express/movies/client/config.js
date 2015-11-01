(function(){
    angular
        .module("MovieApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home/home.html"
            })
            .when("/login", {
                templateUrl: "login/login.view.html",
                controller: "LoginController as controller"
            })
            .when("/search", {
                templateUrl: "movie/search.view.html",
                controller: "MovieSearchController as controller"
            })
            .when("/profile", {
                templateUrl: "profile/profile.view.html",
                controller: "ProfileController as controller"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();