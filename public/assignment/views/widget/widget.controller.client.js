(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController)
        .controller("WidgetListController", widgetListController)
        .controller("WidgetChooserController", widgetChooserController)
        .controller("EditWidgetController", editWidgetController);

    function widgetListController($routeParams,WidgetService ,$sce) {

        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.checkSafeImageUrl = checkSafeImageUrl;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function (err) {
                    vm.error = "Service error fetching widgets";

                });
        }

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeImageUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }
        init();
    }

    function editWidgetController(WidgetService, $routeParams, $sce, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            console.log("Widget ID "+ vm.widgetId);
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    if (widget != '0') {
                        vm.widget = widget;
                        console.log(vm.widget)
                    }
                })
                .error(function (err) {
                    vm.error = "Service error finding widget";
                });
        }

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function updateWidget(widget) {
            console.log("Widget Type "+ widget.widgetType)
            // WidgetService
            //     .updateWidget(vm.widgetId, widget)
            //     .success(function(widget) {
            //         console.log(widget)
            //         $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            // })
            //     .error(function (err) {
            //         vm.error = "Service error";
            //         console.log(err)
            //     });
            // 'HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'
            switch(widget.widgetType.toUpperCase()) {
                case 'HEADER':
                    updateHeading(widget);
                    break;
                case 'IMAGE':
                    updateImage(widget);
                    break;
                case 'YOUTUBE':
                    updateYoutube(widget);
                    break;
                case 'HTML':
                    updateHTML(widget);
                    break;
                case 'TEXT':
                    updateTextInput(widget)
                    break;
                default:
                    vm.error = "widgetType is incorrect"
            }
        }


        function updateTextInput(widget) {
            if (widget.text && widget.placeholder) {
                if (isNaN(widget.rows) || parseInt(widget.rows) < 1) {
                    widget.rows = 1;
                } else {
                    widget.rows = parseInt(widget.rows);
                }

                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });

            } else {
                vm.error = "Text or Placeholder cannot be blank";
            }
        }


        function updateHTML(widget){
            if (widget.name && widget.text) {

                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });

            } else {
                vm.error = "Name or Text cannot be blank";
            }

        }

        function updateHeading(widget) {
            if (widget.text && widget.size && widget.name) {
                widget['size'] = parseInt(widget['size']);

                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });

            } else {
                vm.error = "Name or Text or Size cannot be blank";
            }
        }


        function updateYoutube(widget){

            //if( widget.url && widget.width && widget.name) {
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/"+ vm.userId +"/website/"+ vm.websiteId +"/page/"+ vm.pageId +"/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });

            //} else {
            //    vm.error = "Name or Url or Width cannot be blank";
           // }

        }

        function updateImage(widget){

            //if( widget.url && widget.width && widget.name) {
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/"+ vm.userId +"/website/"+ vm.websiteId +"/page/"+ vm.pageId +"/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });
           // } else {
           //     vm.error = "Name or Url or Width cannot be blank";
            //}
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function(resp) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            })
            .error(function (err){
                vm.error = "Service error";
                console.log(err)
            });
        }
        init();
    }

    function widgetChooserController($location, $routeParams, WidgetService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.addWidget = addWidget;
        console.log(vm.websiteId);
        console.log(vm.userId);
        console.log(vm.pageId);

        function addWidget(widgetType) {
            var widget = {
                widgetType: widgetType,
            };

            WidgetService
                .createWidget(vm.pageId, widget)
                .then
                (function (response) {
                    var widgetId = response.data._id;
                    console.log("URL")
                    console.log("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
                },
                    function (err) {
                    vm.error = err.data;
                });
        }
    }

    function FlickrImageSearchController($location, $routeParams,WidgetService, FlickrService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            console.log(url);

            widget = {
                _id: vm.widgetId,
                type: "IMAGE",
                pageId: vm.pageId,
                width: "100%",
                url: url
            };

            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, function (err) {
                    vm.error = error.data;
                });
        }
    }
})();
