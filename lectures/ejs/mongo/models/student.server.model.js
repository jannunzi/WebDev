var q = require("q");

module.exports = function(mongoose) {
    var StudentSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        openShiftUrl: String,
        gitHubUrl: String,
        order: Number
    }, {collection: "lectures.ejs.mongo.student"});

    var StudentModel = mongoose.model("StudentModel", StudentSchema);

    var api = {
        createStudent: createStudent,
        getAllStudents: getAllStudents,
        randomize: randomize,
        remove: remove
    };
    return api;

    function remove(id) {
        var deferred = q.defer();

        StudentModel
            .remove({_id: id}, function(err, stat){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(stat);
                }
            });

        return deferred.promise;
    }

    function randomize() {
        var deferred = q.defer();

        StudentModel
            .find(function(err, allStudents){
                var randomOrder = [];
                for(var s=0; s<allStudents.length; s++) {
                    do {
                        var random = Math.floor(Math.random() * allStudents.length);
                    } while(randomOrder.indexOf(random) > -1);
                    randomOrder.push(random);
                }

                console.log(random);

                var results = [];
                for(var s=0; s<allStudents.length; s++) {
                    allStudents[s].order = randomOrder[s];
                    results.push(
                        allStudents[s].save()
                    );
                }
                q
                    .all(results)
                    .then(
                        function() {
                            console.log(results);
                            deferred.resolve(allStudents);
                        },
                        function() {
                            deferred.reject(err);
                        }
                );
            });

        return deferred.promise;
    }

    function getAllStudents() {
        var deferred = q.defer();

        StudentModel
            .find(
                function(err, students) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(students);
                    }
                }
        ).sort("order");

        return deferred.promise;
    }

    function createStudent(student) {
        var deferred = q.defer();

        StudentModel
            .create(student,
                function(err, studentDoc) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(studentDoc);
                    }
        });

        return deferred.promise;
    }
}