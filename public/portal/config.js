(function () {
    angular
        .module('app')
        .config(config);

    function config($routeProvider) {

        var courses = angular.courses;

        for(var i=0; i<courses[0].modules.length; i++)
        {
            // routes for modules
            $routeProvider
                .when('/modules/' + i, {
                    templateUrl: '/portal/public/portal/modules/' + i + '/index.html'
                });

            // routes for lectures in modules
            for (var j = 0; j < courses[0].modules[i].lectures.length; j++) {
                $routeProvider
                    .when('/modules/' + i + '/lectures/' + j, {
                        templateUrl: '/portal/public/portal/modules/' + i + '/lectures/' + j + '/index.html'
                    });
            }

            // routes for assignments in modules
            for (var j = 0; j < courses[0].modules[i].assignments.length; j++) {
                $routeProvider
                    .when('/modules/' + i + '/assignments/' + j, {
                        templateUrl: '/portal/public/portal/modules/' + i + '/assignments/' + j + '/index.html'
                    });
            }

            // routes for videos in modules
            for (var j = 0; j < courses[0].modules[i].videos.length; j++) {
                $routeProvider
                    .when('/modules/' + i + '/videos/' + j, {
                        templateUrl: '/portal/public/portal/modules/' + i + '/videos/' + j + '/index.html'
                    });
            }

            // routes for examples in modules
            for (var j = 0; j < courses[0].modules[i].examples.length; j++) {
                $routeProvider
                    .when('/modules/' + i + '/examples/' + j, {
                        templateUrl: '/portal/public/portal/modules/' + i + '/examples/' + j + '/index.html'
                    });
            }

            // routes for slides in modules
            for (var j = 0; j < courses[0].modules[i].slides.length; j++) {
                $routeProvider
                    .when('/modules/' + i + '/slides/' + j, {
                        templateUrl: '/portal/public/portal/modules/' + i + '/slides/' + j + '/index.html'
                    });
            }
        }
    }
})();