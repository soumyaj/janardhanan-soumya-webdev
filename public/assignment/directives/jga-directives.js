(function () {
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
        console.log("In sortable - jga-directives")

        function linker(scope, element) {
            console.log("In linker - jga-directives")
            var start = -1;
            var end = -1;
            element
            // ({
                .sortable({
                    axis: 'y',
                    start: function (event, ui,attributes) {
                        start = ($(ui.item).index());
                        console.log(($(ui.item).index()))
                    },
                    stop: function (event, ui) {
                        end = ($(ui.item).index());
                        scope.sortableController.sort(start, end);
                        console.log($(ui.item).index())
                    }
                });
        }

        return {
            scope: {},
            link: linker,
            restrict: 'AEC',
            controller: sortableController,
            controllerAs: 'sortableController'
        };
    }

    function sortableController(WidgetService, $routeParams) {
        var vm = this;
        vm.sort = sort;

        function sort(start, end) {
            console.log("In sort jga-directives")
            console.log(start)
            console.log(end)
            var pageId = $routeParams.pid;
            WidgetService
                .sortWidget(pageId, start, end)
                .success(function() {
                    if(arguments[1]==200) {
                        //SUCCESS
                    }
                })
                .error(function(err) {
                });
        }

    }
})();