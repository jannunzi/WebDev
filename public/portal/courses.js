(function () {
  angular.courses = [
    {
      title: 'CS5610',
      modules: [
        {
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
            , {title: 'MongoDB'}
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
              {
                  title: 'Example 1111'
                , src: '/experiments/javascript/intro/80-modules.html'
                , dependencies : {
                  '80-module1.js': '/experiments/javascript/intro/80-module1.js',
                  '80-module2.js': '/experiments/javascript/intro/80-module2.js',
                }
              }
            , {title: 'Example 2'}
          ]

        }
        , {
          title: 'Client Side Programming',
          lectures: [],
          assignments: [],
          videos: [],
          slides: [],
          examples: [
            {
              title: "Draggable",
              src: "/experiments/jqueryui/50-draggable.html",
              dependencies: {}
            }
            ,{
              title: "Datepicker",
              src: "/experiments/jqueryui/110-datepicker.html",
              dependencies: {}
            }
            ,{
              title: "Accordions",
              src: "/experiments/jqueryui/120-accordions.html",
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
