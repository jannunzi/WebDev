(function(){
    angular
        .module("WhiteBoardApp")
        .controller("RegisterController", RegisterController);

    function RegisterController() {
        var model = this;

        model.hello = "Hello";
    }
})();
