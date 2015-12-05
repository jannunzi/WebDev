(function(){
    angular
        .module("WhiteBoardApp")
        .controller("CourseController", CourseController);

    function CourseController($routeParams, CourseService) {
        console.log($routeParams.courseId);
        var model = this;
        model.updateCourse = updateCourse;

        function init() {
            CourseService
                .getCourseById($routeParams.courseId)
                .then(function(course){
                    model.course = course;
                });
        }
        init();

        function updateCourse(course) {
            CourseService
                .updateCourse(course)
                .then(function(){});
        }
    }
})();