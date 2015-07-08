var express = require('express');
var app = express();
//var courses = require('./courses')

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/course', function (req, res) {
    var str = '(function(){angular.courses = ';
    str += JSON.stringify(courses);
    str += '})();';
    res.send(str);
});

app.listen(port, ipaddress);

var courses = [
    {
        courseTitle: 'CS5610',
        modules: [
            {
                moduleTitle: 'Modulo 0',
                lectures: [
                    {
                        lectureTitle: 'Lectura 0'
                    },
                    {
                        lectureTitle: 'Lectura 1'
                    },
                    {
                        lectureTitle: 'Lectura 2'
                    }
                ],
                assignments: [
                    {
                        assignmentTitle: 'Tarea 0'
                    }
                ],
                examples: [
                    {
                        exampleTitle: 'Ejemplo 0'
                    }
                ],
                videos: [],
                slides: []
            },
            {
                moduleTitle: 'Modulo 1',
                lectures: [],
                assignments: [],
                videos: [],
                slides: [],
                examples: []
            },
            {
                moduleTitle: 'Module 2',
                lectures: [],
                assignments: [],
                videos: [],
                slides: [],
                examples: []
            }
        ]
    }
];
