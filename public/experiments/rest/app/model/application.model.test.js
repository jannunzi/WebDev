var applicationModel = require("./application.model.js")();

console.log('\nfindAll()');
console.log(applicationModel.findAllApplications());

console.log('\nfindById(1)');
console.log(applicationModel.findApplication(1));
console.log('\nfindById(2)');
console.log(applicationModel.findApplication(2));

console.log('\ncreate(application)');
console.log(applicationModel.createApplication({'id':123, 'title':'Application 123', 'fields':[]}));

console.log('\ndeleteApplication(2)');
console.log(applicationModel.deleteApplication(2));

console.log('\nupdateApplication(123, {"title": "Application 234"})');
console.log(applicationModel.updateApplication(123, {title: "Application 234"}));
