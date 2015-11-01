(function(){
    angular
        .module("FilterApp")
        .controller("FilterController", FilterController);

    function FilterController(FilterService) {

        var vm = this;

        vm.applyFilters = applyFilters;
        vm.selectSubSubFilters = selectSubSubFilters;

        function init() {
            FilterService.getAllFiltersForClass("RST").then(function(filters){
                vm.filters = filters;
            });
        }

        function applyFilters(filters) {
            vm.selectedFilters = [];
            for(var f in vm.filters) {
                for(var ff in vm.filters[f].subfilters) {
                    if(vm.filters[f].subfilters[ff].selected === true) {
                        vm.selectedFilters.push(vm.filters[f].subfilters[ff]);
                    }
                    for(var fff in vm.filters[f].subfilters[ff].subfilters) {
                        if(vm.filters[f].subfilters[ff].subfilters[fff].selected === true) {
                            vm.selectedFilters.push(vm.filters[f].subfilters[ff].subfilters[fff]);
                        }
                    }
                }
            }
        }

        function selectSubSubFilters(subFilter) {
            for(var s in subFilter.subfilters) {
                subFilter.subfilters[s].selected = subFilter.selected;
            }
        }

        init();
    }
})();