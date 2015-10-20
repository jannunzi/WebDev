require('./hello/hello.js');
require('./aRequiresB/a.js');
require('./exports/main.js');
require('./square/exports/main.js');
require('./square/modules/main.js');
require('./square/index');

module.exports = function(app) {
    require('./http/get')(app);
    require('./http/post.js')(app);
    require('./http')(app);
};
