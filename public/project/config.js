(function () {
    angular
        .module('app')
        .config(config);

    function config($routeProvider) {

//        var courses = angular.courses;

        $routeProvider
            .when('/modules', {
                templateUrl: function(params){
                  return '/project/modules/0';
                }//'/project/templates/modules.html'
                ,controller: 'NavController'
            })
            .when('/modules/:moduleId', {
                templateUrl: function(params){
                  return '/project/modules/'+params.moduleId;
                }//'/project/templates/modules.html'
                ,controller: 'NavController'
            })
            .when('/modules/:moduleId/lectures', {
                templateUrl: function(params) {
                  return '/project/modules/'+params.moduleId+'/lectures/0';
                }
                //'/project/templates/lectures.html'
                ,controller: 'NavController'
            })
            .when('/modules/:moduleId/lectures/:lectureId', {
                templateUrl: function(params) {
                  return '/project/modules/'+params.moduleId+'/lectures/'+params.lectureId;
                }
                ,controller: 'NavController'
            })
            ;
    }
})();
