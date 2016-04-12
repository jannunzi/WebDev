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
            .when("/course/:id/module", {
                templateUrl: "./views/modules/module.view.html",
                controller: "ModuleController",
                controllerAs: "model"
            })
            .when("/course/:id/module/:id", {
                templateUrl: "./views/modules/detail.view.html",
                controller: "ModuleController",
                controllerAs: "model"
            })
            .when("/course", {
                templateUrl: "./views/courses/brochure.view.html",
                controller: "BrochureController",
                controllerAs: "model"
            })
            .when("/course/:id", {
                templateUrl: "./views/courses/course.view.html",
                controller: "CourseController",
                controllerAs: "model"
            })
            .when("/course/:id/syllabus", {
                templateUrl: "./views/courses/syllabus.view.html",
                controller: "CourseController",
                controllerAs: "model"
            })
            .when("/course/:id/module/:id/lectures", {
                templateUrl: "./views/modules/lecture.view.html",
                controller: "ModuleController",
                controllerAs: "model"
            })
            .when("/course/:id/module/:id/lecture/:id", {
                templateUrl: "./views/modules/lecture.view.html",
                controller: "ModuleController",
                controllerAs: "model"
            })
            .when("/course/:id/module/:id/examples", {
                templateUrl: "./views/modules/example.view.html",
                controller: "ModuleController",
                controllerAs: "model"
            })
            .when("/course/:id/module/:id/assignments", {
                templateUrl: "./views/modules/assignment.view.html",
                controller: "ModuleController",
                controllerAs: "model"
            })
            .when("/:username/courses", {
                templateUrl: "./views/users/courses.view.html",
                controller: "UserController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
}());