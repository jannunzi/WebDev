/**
 * Created by ameyapandilwar on 3/18/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "./views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/admin", {
                templateUrl: "./views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "./views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "./views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "./views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/module", {
                templateUrl: "./views/modules/module.view.html",
                controller: "ModuleController",
                controllerAs: "model"
            })
            .when("/module/:id", {
                templateUrl: "./views/modules/detail.view.html",
                controller: "ModuleController"
            })
            .when("/course", {
                templateUrl: "./views/courses/brochure.view.html",
                controller: "BrochureController",
                controllerAs: "model"
            })
            .when("/course/:id", {
                templateUrl: "./views/courses/course.view.html",
                controller: "CourseController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
}());