(function(){
    "use strict";
    angular
        .module("CourseEditorApp")
        .config(Configure);

    function Configure($routeProvider, $provide){
        $routeProvider
            .when("/editor", {
                templateUrl: "views/course/course.list.view.html",
                controller: "CourseController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "editor"
            });

        $provide.decorator('taOptions', ['$delegate', function(taOptions) { // $delegate is the taOptions we are decorating
            taOptions.toolbar = [
                ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
                ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                ['html', 'insertImage','insertLink']
            ];

            return taOptions;
        }]);


    };
})();