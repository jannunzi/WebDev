(function()
{
    angular
        .module("NgRepeatApp")
        .controller("Example2Controller", Example2Controller);

    function Example2Controller()
    {
        var vm = this;
        vm.courses = [
            {title: "Java 101",  seats: 12, start: new Date()},
            {title: "C# 101",    seats: 23, start: new Date(2015,8,5)},
            {title: "Node.js",   seats: 32, start: new Date(2015,9,7)},
            {title: "AngularJS", seats: 21, start: new Date(2016,0,15)}
        ];
    }
})();