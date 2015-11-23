(function(){
    angular
        .module("WhiteBoardApp")
        .controller("CourseController", CourseController);

    function CourseController($routeParams, CourseService) {
        console.log($routeParams.courseId);
        var model = this;

        function init() {
            CourseService
                .getCourseById($routeParams.courseId)
                .then(function(course){
                    model.course = course;
                });
        }
        init();
    }
})();