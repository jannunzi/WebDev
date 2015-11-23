(function()
{
    angular
        .module("WhiteBoardApp")
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, UserService, CourseService, $routeParams)
    {
        $rootScope.danger = null;

        var model = this;
        model.updateUser = updateUser;
        model.removeUser = removeUser;
        model.selectUser = selectUser;
        model.createCourse = createCourse;
        model.createMyCourse = createMyCourse;

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

        function createCourse(course) {
            course.userId = $rootScope.currentUser._id;
            CourseService
                .createCourse(course)
                .then(function(response){
                    CourseService
                        .getAllCourses()
                        .then(function(allCourses){
                            model.allCourses = allCourses;
                        });
                });
        }

        function createMyCourse(course) {
            course.userId = $rootScope.currentUser._id;
            CourseService
                .createCourse(course)
                .then(function(response){
                    CourseService
                        .getCoursesForUserId($routeParams.userId)
                        .then(function(myCourses){
                            model.myCourses = myCourses;
                        });
                });
        }

        function selectUser(index) {
            model.selectedIndex = index;
            model.user = model.users[index];
        }

        function removeUser(id) {
            UserService
                .removeUser(id)
                .then(function(status){
                    UserService
                        .getAllUsers()
                        .then(function(users){
                            model.users = users;
                        });
                });
        }

        function updateUser(user) {
            UserService
                .updateUser(user)
                .then(function(users){
                    UserService
                        .getAllUsers()
                        .then(function(users){
                            model.users = users;
                        });
                });
        }
    }
})();
