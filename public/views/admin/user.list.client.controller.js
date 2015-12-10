(function(){
    angular
        .module("WhiteBoardApp")
        .controller("UserListController", UserListController);

    function UserListController(UserService) {

        var model = this;

        function init() {
            UserService
                .getAllUsers()
                .then(function(users){
                    model.users = users;
                });
            UserService
                .getUserById($routeParams.userId)
                .then(function(user){
                    model.user = user;
                });
            CourseService
                .getAllCourses()
                .then(function(allCourses){
                    model.allCourses = allCourses;
                });
            CourseService
                .getCoursesForUserId($routeParams.userId)
                .then(function(myCourses){
                    model.myCourses = myCourses;
                });
        }
        init();

    }
})();
