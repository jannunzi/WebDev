var courses = require('./course.mock.json');
var q = require("q");

module.exports = function(db, mongoose) {


    //var CourseSchema = mongoose.Schema({
    //            title: String,
    //            modules: [{
    //                title: String,
    //                available: Boolean,
    //                visible: Boolean,
    //                lectures: [
    //                    {
    //                        title: String
    //                    }
    //                ],
    //                assignments: [
    //                    {
    //                        title: String
    //                    }
    //                ],
    //                videos: [
    //                    {
    //                        title: String,
    //                        src: String
    //                    }
    //                ],
    //                slides: [
    //                    {
    //                        title: String,
    //                        src: String
    //                    }
    //                ],
    //                examples: [
    //                    {
    //                        title: String,
    //                        ex: [
    //                            {
    //                                title: String,
    //                                base: String,
    //                                src: String,
    //                                dependencies: [
    //                                    {
    //                                        title: String,
    //                                        src: String
    //                                    }
    //                                ]
    //                            }
    //                        ]
    //                    }
    //                ]
    //
    //
    //            }]
    //        }, {collection: "course"});

    //var Course = mongoose.model("CourseModel", CourseSchema);
    var api = {
        getAll: getAll,
        update: update,
        add: add
    }

    return api;

    function getAll(){
        return courses;

        //var deferred = q.defer();
        //
        //Course.find(function(err, courses){
        //    console.log("GOT ALL " + courses);
        //    deferred.resolve(courses);
        //});
        //
        //return deferred.promise;
    }

    function update(course){

        //var deferred = q.defer();
        //
        //Course.update({_id: course._id}, course, function(err, affected){
        //    deferred.resolve(affected);
        //});
        courses = course;

        //return deferred.promise;

    }

    function add(course){
        //var deferred = q.defer();
        //
        //Course.insert(course, function(err, course){
        //    Course.find(function(err, courses){
        //        deferred.resolve(courses);
        //    })
        //})
        //
        //return deferred.promise;
    }


}