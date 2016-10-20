(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", widgetListController)
        .controller("NewWidgetController", newWidgetController)
        .controller("EditWidgetController", editWidgetController);

    function widgetListController(WidgetService, $location) {
        var vm = this;
        //vm.register = register;


    }

    function editWidgetController(WidgetService, $location) {
        var vm = this;
        //vm.register = register;
    }

    function newWidgetController(WidgetService, $location) {
        var vm = this;
        //vm.login = login;
    }

})();
