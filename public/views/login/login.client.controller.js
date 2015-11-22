(function(){
    angular
        .module("WhiteBoardApp")
        .controller("LoginController", LoginController);

    function LoginController() {
        var model = this;

        model.hello = "Hello";
    }
})();
