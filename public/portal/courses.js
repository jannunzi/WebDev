(function () {
  angular.courses = [
    {
      title: 'CS5610',
      modules: [
        {
          visible: false,
          title: 'Template Module',
          lectures: [
            {
                title: 'Lectura 0'
            },
            {
                title: 'Lectura 1'
            },
            {
                title: 'Lectura 2'
            }
          ],
          assignments: [
              {
                  title: 'Tarea 0'
              },
              {
                  title: 'Tarea 1'
              }
          ],
          examples: [
              {
                  title: 'Ejemplo 0'
              }
          ],
          videos: [],
          slides: []
          // ,experiments: [
          //     {
          //         title: 'Experiment 0'
          //     },
          //     {
          //         title: 'Experiment 1'
          //     }
          // ]
        }
        // ,{
        //     title: 'Setting up a Development Environment',
        //     lectures: [
        //        {title: 'GIT'}
        //       ,{title: 'Node.js'}
        //       // ,{title: 'MongoDB'}
        //     ],
        //     assignments: [],
        //     videos: [],
        //     slides: [],
        //     examples: []
        // }
        // ,{
        //     title: 'Designing the Front End',
        //     lectures: [
        //        { title: "HTML" }
        //       ,{ title: "CSS" }
        //       ,{ title: "Bootstrap" }
        //     ],
        //     assignments: [],
        //     videos: [],
        //     slides: [],
        //     examples: []
        // }
        ,{
          title: 'Setting up a Development Environment',
          lectures: [
            {title: 'GIT'}
            , {title: 'Node.js'}
          ],
          assignments: [
            {title: 'Assignment 1'}
            , {title: 'Assignment 2'}
          ],
          videos: [
            {title: 'Video 1'}
            , {title: 'Video 2'}
            , {title: 'Video 3'}
          ],
          slides: [
            {title: 'Slide 1'}
            , {title: 'Slide 2'}
            , {title: 'Slide 3'}
          ],
          examples: [
            {title: 'Example 1'}
            , {title: 'Example 2'}
          ]
          // ,experiments: [
          //     {title: 'Experiment 1'}
          //   , {title: 'Experiment 2'}
          // ]
        }
        , {
          title: 'Designing the Front End',
          lectures: [
            {title: "HTML"}
            , {title: "CSS"}
            , {title: "Box Model"}
            , {title: "Layout"}
            , {title: "Bootstrap"}
          ],
          assignments: [
              {title: 'HTML'}
            , {title: 'CSS & Responsive Design'}
          ],
          videos: [
            {title: 'Video 1'}
            , {title: 'Video 2'}
            , {title: 'Video 3'}
          ],
          slides: [
            {title: 'Slide 1'}
            , {title: 'Slide 2'}
            , {title: 'Slide 3'}
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
                src: "link.html" }
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
              { title: "Forms",
                base: "/experiments/bootstrap/",
                src: "forms.html" }
            , { title: "Jumbotron",
                base: "/experiments/bootstrap/",
                src: "jumbotron.html" }
            , { title: "Tables",
                base: "/experiments/bootstrap/",
                src: "tables.html" }
            , { title: "Blog",
                base: "/experiments/bootstrap/",
                src: "webdev.html" }
          ]
        }
        , {
          title: 'Client Side Programming',
          lectures: [
            {title: 'Javascript'}
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
          ]
        }
        , {
          title: 'Server Side Programming',
          lectures: [],
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
          title: 'Data Modeling, Persistence and Integration',
          lectures: [],
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
          title: 'Security',
          lectures: [],
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
