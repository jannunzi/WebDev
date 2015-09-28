(function () {
  angular.courses = [
    {
      title: 'CS5610',
      modules: [
        {
          visible: true,
          available: true,
          title: 'Fall 2015',
          lectures: [
            {title: 'Week 1'},
            {title: 'Week 2'},
            {title: 'Week 3'},
            {title: 'Week 4'},
            {title: 'Week 5'},
            {title: 'Week 6'},
            {title: 'Week 7'},
            {title: 'Week 8'},
            {title: 'Week 9'},
            {title: 'Week 10'},
            {title: 'Week 11'},
            {title: 'Week 12'},
            {title: 'Week 13'},
            {title: 'Week 14'}
          ],
          videos: [],
          slides: []
        }
        ,{
          title: 'Development Environment',
          available: true,
          lectures: [
              {title: 'Node.js'}
            , {title: 'GIT'}
            , {title: 'OpenShift'}
          ],
          assignments: [
            {title: 'Environment'}
          ]
        }
        , {
          title: 'User Interface Development',
          available: true,
          lectures: [
            {title: "HTML"}
            , {title: "CSS"}
            , {title: "Box Model"}
            , {title: "Layout"}
            , {title: "Bootstrap"}
          ],
          assignments: [
              {title: 'User Interface Development'},
              {title: 'Project Proposal'}
          ],
          css_examples: [
              { title: "Box",
                base: "/experiments/css/",
                src: "box.html" }
            , { title: "Centered",
                base: "/experiments/css/",
                src: "centered.html" }
            , { title: "Class",
                base: "/experiments/css/",
                src: "class.html" }
            , { title: "Id",
                base: "/experiments/css/",
                src: "id.html" }
            , { title: "Inheritance",
                base: "/experiments/css/",
                src: "inheritance.html" }
            , { title: "Inline",
                base: "/experiments/css/",
                src: "inline.html" }
            , { title: "Link",
                base: "/experiments/css/",
                src: "link.html",
                dependencies: {
                  "style1.css" : "css/style1.css",
                  "style2.css" : "css/style2.css"
                }
            }
            , { title: "Position",
                base: "/experiments/css/",
                src: "position.html" }
            , { title: "Sticky",
                base: "/experiments/css/",
                src: "sticky.html" }
            , { title: "Z Index",
                base: "/experiments/css/",
                src: "zindex.html" }
            , { title: "Specificity",
                base: "/experiments/css/",
                src: "specificity.html" }
            , { title: "Visibility",
                base: "/experiments/css/",
                src: "visibility.html" }
            , { title: "Float",
                base: "/experiments/css/",
                src: "float.html" }
            , { title: "Grid",
                base: "/experiments/css/",
                src: "grid.html" }
          ],
          bootstrap_examples : [
              { title: "Grid Lg",
                  base: "/experiments/bootstrap/",
                  src: "gridLg.html" }
              , { title: "Grid Md",
                  base: "/experiments/bootstrap/",
                  src: "gridMd.html" }
              , { title: "Grid Sm",
                  base: "/experiments/bootstrap/",
                  src: "gridSm.html" }
              , { title: "Grid Xs",
                  base: "/experiments/bootstrap/",
                  src: "gridXs.html" }
              , { title: "Forms",
                  base: "/experiments/bootstrap/",
                  src: "forms.html" }
              , { title: "Tables",
                  base: "/experiments/bootstrap/",
                  src: "tables.html" }
              , { title: "Tabs",
                  base: "/experiments/bootstrap/",
                  src: "tabs.html" }
              , { title: "Jumbotron",
                  base: "/experiments/bootstrap/",
                  src: "jumbotron.html" }
              , { title: "Dashboard",
                  base: "/experiments/bootstrap/",
                  src: "dashboard.html" }
            , { title: "Blog",
                base: "/experiments/bootstrap/",
                src: "webdev.html" }
          ]
        }
        , {
          title: 'Client Side Development',
          available: true,
          lectures: [
            {title: 'JavaScript'}
            , {title: 'JQuery'}
          ],
          assignments: [],
          videos: [],
          slides: [],
          javaScript_examples: [
            { title: "Hello",
              base: "/experiments/javascript/",
              src:"00-script-alert-hello-world.html"}
            , { title: "Variables",
              base: "/experiments/javascript/",
              src:"03-variables-a+b.html"}
            , { title: "Loops",
              base: "/experiments/javascript/",
              src:"05-loops-factorial.html"}
            , { title: "Arrays",
              base: "/experiments/javascript/",
              src:"07-arrays-min-max.html"}
            , { title: "Document",
              base: "/experiments/javascript/",
              src:"10-document-write-ul-table.html"}
            , { title: "Functions",
              base: "/experiments/javascript/",
              src:"13-functions-add.html"}
            , { title: "Get Elements",
              base: "/experiments/javascript/",
              src:"15-getElementById.html"}
            , { title: "OnClick",
              base: "/experiments/javascript/",
              src:"20-onclick-say-hello-message-input.html"}
            , { title: "Src",
                base: "/experiments/javascript/",
                src:"30-script-src.html",
                dependencies: {
                  "30.js" : "30.js"
                }
              }
            , { title: "JSON",
                base: "/experiments/javascript/",
                src:"32-json.html"}
            , { title: "Namespaces",
                base: "/experiments/javascript/",
                src:"50-namespace.html",
                dependencies : {
                  "50-namespace.js" : "50-namespace.js"
                }
              }
            , { title: "Callbacks",
                base: "/experiments/javascript/",
                src:"60-passingFunctions.html",
                dependencies : {
                  "60.js" : "60.js"
                }
              }
            , { title: "Modules",
                base: "/experiments/javascript/",
                src:"70-modules.html",
                dependencies : {
                  "70-modules.js" : "70-modules.js",
                  "70-app.js" : "70-app.js"
                }
              }
            , { title: "Modules 2",
                base: "/experiments/javascript/",
                src:"80-modules.html",
                dependencies : {
                  "80-module1.js" : "80-module1.js",
                  "80-module2.js" : "80-module2.js",
                  "80-app.js" : "80-app.js"
                }
              }
          ],
          jQueryUi_examples: [
            {
              title: "Draggable",
              base: "/experiments/jqueryui/",
              src: "50-draggable.html",
              dependencies: {}
            }
            ,{
              title: "Datepicker",
              base: "/experiments/jqueryui/",
              src: "110-datepicker.html",
              dependencies: {}
            }
            ,{
              title: "Accordions",
              base: "/experiments/jqueryui/",
              src: "120-accordions.html",
              dependencies: {}
            }
          ],
          AngularJS_examples: [
              {
                  title: "Hello",
                  base: "/experiments/angularjs/hello/",
                  src: "index.html",
                  dependencies: {
                      "app.js":"app.js"
                  }
              },
              {
                  title: "NgRepeat",
                  base: "/experiments/angularjs/ngRepeat/",
                  src: "index.html",
                  dependencies: {
                      "app.js":"app.js",
                      "example1.controller.js":"example1.controller.js",
                      "example2.controller.js":"example2.controller.js"
                  }
              },
              {
                  title: "Courses 1",
                  base: "/experiments/angularjs/courses2/",
                  src: "index.html",
                  dependencies: {
                      "app.js":"app.js",
                      "config.js":"config.js",
                      "courseList.view.html":"courseList/courseList.view.html",
                      "courseList.controller.js":"courseList/courseList.controller.js",
                      "courseOverview.view.html":"courseOverview/courseOverview.view.html",
                      "courseOverview.controller.js":"courseOverview/courseOverview.controller.js"
                  }
              },
              {
                  title: "Courses 2",
                  base: "/experiments/angularjs/courses1/",
                  src: "courses.html",
                  dependencies: {
                      "main.js":"main.js",
                      "courses.js":"courses.js"
                  }
              },
              {
                  title: "Routing 1",
                  base: "/experiments/angularjs/routing1/",
                  src: "index.html",
                  dependencies: {
                      "index.html":"index.html",
                      "app.js":"app.js",
                      "config.js":"config.js",
                      "courses.view.html":"courses/courses.view.html"
                  }
              },
              {
                  title: "Routing 2",
                  base: "/experiments/angularjs/routing2/",
                  src: "index.html",
                  dependencies: {
                      "index.html":"index.html",
                      "app.js":"app.js",
                      "config.js":"config.js",
                      "home.html":"home.html",
                      "navController.js":"navController.js",
                      "profile.html":"profile.html",
                      "profile.js":"profile.js",
                      "users.html":"userController.js",
                      "userController.js":"userController.js",
                      "userService.js":"userService.js"
                  }
              }
          ]
        }
        , {
          title: 'Server Side Development',
          available: false
        }
        , {
          title: 'Database Development',
          visible: true,
          available: false,
          lectures: [
              {title: 'Introduction to MongoDB'}
            , {title: 'Introduction to Mongoose'}
            , {title: 'Read Data from MongoDB'}
			, {title: 'Update Data in MongoDB'}
          ],
          assignments: [],
          videos: [],
          slides: [],
          examples: [
            {
              title: "",
              src: "",
              dependencies: {
                "":""
              }              
            }
          ]
        }
        , {
          title: 'Securing',
          visible: true,
          available: false,
          lectures: [
            {title: "Ng-Routing"}
            , {title: "Register"}
            , {title: "Profile"}
            , {title: "Navigation"}
            , {title: "Update User"}
			, {title: "Login/Logout"}
            , {title: "Admin Page"}
            , {title: "Admin Tasks"}
          ],
          assignments: [],
          videos: [],
          slides: [],
          examples: [
            {
              title: "",
              src: "",
              dependencies: {
                "":""
              }              
            }
          ]
        }
        , {
          title: 'Dynamic Server Pages',
          visible: true,
          available: false,
          lectures: [
              {title: 'Creating a Node.js Server'}
            , {title: 'Web Services'}
      			, {title: 'Updating Data'}
          ],
          assignments: [],
          videos: [],
          slides: [],
          examples: [
            {
              title: "",
              src: "",
              dependencies: {
                "":""
              }              
            }
          ]
        }
      ]
    }
  ];
})();
