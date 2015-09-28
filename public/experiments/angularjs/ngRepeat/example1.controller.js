(function()
{
    angular
        .module("NgRepeatApp")
        .controller("Example1Controller", Example1Controller);

    function Example1Controller()
    {
        var vm = this;
        vm.courseNames = ["Course 1", "Course 2", "Course 3"];
    }
})();