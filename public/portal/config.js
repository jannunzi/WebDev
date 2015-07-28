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
                    templateUrl: '/portal/modules/' + i + '/index.html'
                });

            // routes for lectures in modules
            for (var j = 0; j < courses[0].modules[i].lectures.length; j++) {
                $routeProvider
                    .when('/modules/' + i + '/lectures/' + j, {
                        templateUrl: '/portal/modules/' + i + '/lectures/' + j + '/index.html'
                    });
            }

            // routes for assignments in modules
            for (var j = 0; j < courses[0].modules[i].assignments.length; j++) {
                $routeProvider
                    .when('/modules/' + i + '/assignments/' + j, {
                        templateUrl: '/portal/modules/' + i + '/assignments/assignment' + j + '/index.html'
                    });
            }

            // routes for videos in modules
            for (var j = 0; j < courses[0].modules[i].videos.length; j++) {
                $routeProvider
                    .when('/modules/' + i + '/videos/' + j, {
                        templateUrl: '/portal/modules/' + i + '/videos/video' + j + '/index.html'
                    });
            }

            // routes for examples in modules
            for (var j = 0; j < courses[0].modules[i].examples.length; j++) {
                $routeProvider
                    .when('/modules/' + i + '/examples/' + j, {
                        templateUrl: '/portal/modules/' + i + '/examples/example' + j + '/index.html'
                    });
            }

            // routes for slides in modules
            for (var j = 0; j < courses[0].modules[i].slides.length; j++) {
                $routeProvider
                    .when('/modules/' + i + '/slides/' + j, {
                        templateUrl: '/portal/modules/' + i + '/slides/slide' + j + '/index.html'
                    });
            }
        }

        //$routeProvider
        //    .when('/modules/0', {
        //        templateUrl: '/modules/module0/index.html'
        //    })
        //    .when('/modules/1', {
        //        templateUrl: '/modules/module1/index.html'
        //    })
        //    .when('/modules/2', {
        //        templateUrl: '/modules/module2/index.html'
        //    });
    }
})();

var courses = [
    {
        courseTitle: 'CS5610',
        modules: [
            {
                moduleTitle: 'Modulo 0',
                lectures: [
                    {
                        lectureTitle: 'Lectura 0'
                    },
                    {
                        lectureTitle: 'Lectura 1'
                    },
                    {
                        lectureTitle: 'Lectura 2'
                    }
                ],
                assignments: [
                    {
                        assignmentTitle: 'Tarea 0'
                    }
                ],
                examples: [
                    {
                        exampleTitle: 'Ejemplo 0'
                    }
                ],
                videos: [],
                slides: []
            },
            {
                moduleTitle: 'Modulo 1',
                lectures: [],
                assignments: [],
                videos: [],
                slides: [],
                examples: []
            },
            {
                moduleTitle: 'Module 2',
                lectures: [],
                assignments: [],
                videos: [],
                slides: [],
                examples: []
            }
        ]
    }
];
