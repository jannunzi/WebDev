
(function(){
    "use strict";
    angular
        .module("CourseEditorApp")
        .controller("CourseController", CourseController);

    function CourseController ($scope, CourseService){
        JSONEditor.defaults.options.theme = 'bootstrap3';

        var editor = new JSONEditor(document.getElementById("editor_holder"),{
                schema: {
                    "title":"Courses",
                    "type":"array",
                    "items":{
                        "title":"Course",
                        "type":"object",
                        "properties":{
                            "title":{
                                "type":"string"
                            },
                            "modules":{
                                "type":"array",
                                "items":{
                                    "type":"object",
                                    "title":"Module",
                                    "properties":{
                                        "title":{
                                            "type":"string"
                                        },
                                        "visible":{
                                            "type":"boolean",
                                            "default":"true"
                                        },
                                        "available":{
                                            "type":"boolean",
                                            "default":"true"
                                        },
                                        "lectures":{
                                            "type":"array",
                                            "items":{
                                                "type":"object",
                                                "title":"Lecture",
                                                "properties":{
                                                    "title":{
                                                        "type":"string"
                                                    }
                                                }
                                            }
                                        },
                                        "assignments":{
                                            "type":"array",
                                            "items":{
                                                "type":"object",
                                                "title":"Assignment",
                                                "properties":{
                                                    "title":{
                                                        "type":"string"
                                                    }
                                                }
                                            }
                                        },
                                        "videos":{
                                            "type":"array",
                                            "items":{
                                                "type":"object",
                                                "title":"Video",
                                                "properties":{
                                                    "title":{
                                                        "type":"string"
                                                    },
                                                    "src":{
                                                        "type":"string"
                                                    }
                                                }
                                            }
                                        },
                                        "examples":{
                                            "type":"array",
                                            "items":{
                                                "type":"object",
                                                "title":"Example",
                                                "properties":{
                                                    "title":{
                                                        "type":"string"
                                                    },
                                                    "ex":{
                                                        "type":"array",
                                                        "items":{
                                                            "type":"object",
                                                            "title":"Ex",
                                                            "properties":{
                                                                "title":{
                                                                    "type":"string"
                                                                },
                                                                "base":{
                                                                    "type":"string"
                                                                },
                                                                "src":{
                                                                    "type":"string"
                                                                },
                                                                "dependencies":{
                                                                    "type":"array",
                                                                    "items":{
                                                                        "type":"object",
                                                                        "title":"Dependency",
                                                                        "properties":{
                                                                            "title":{
                                                                                "type":"string"
                                                                            },
                                                                            "src":{
                                                                                "type":"string"
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
        );

        CourseService.getAll().then(function(res){
            editor.setValue(res);
        });

        $scope.update = function(){
            CourseService.updateCourses(editor.getValue());
        }


    }
})();