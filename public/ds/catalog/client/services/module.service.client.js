/**
 * Created by ameyapandilwar on 3/10/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .factory("ModuleService", ModuleService);

    function ModuleService($rootScope) {
        var service = {
            getCurrentModule: getCurrentModule,
            setCurrentModule: setCurrentModule
        };

        return service;

        function getCurrentModule() {
            return $rootScope.currentModule;
        }

        function setCurrentModule(module) {
            $rootScope.currentModule = module;
        }
    }
}());