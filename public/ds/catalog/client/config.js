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
                controller: "AdminController"
            })
            .when("/login", {
                templateUrl: "./views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "./views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "./views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/module", {
                templateUrl: "./views/modules/module.view.html",
                controller: "ModuleController"
            })
            .when("/module/:id", {
                templateUrl: "./views/modules/detail.view.html",
                controller: "ModuleController"
            })
            .when("/course", {
                templateUrl: "./views/courses/brochure.view.html",
                controller: "BrochureController"
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