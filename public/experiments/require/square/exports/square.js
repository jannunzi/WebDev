
exports.width = 111;
exports.height = 222;

exports.getWidth = function() {
    return this.width;
};

exports.getHeight = function() {
    return this.height;
};

exports.setWidth = function(width) {
    this.width = width;
};

exports.setHeight = function(height) {
    this.height = height;
};

exports.area = function() {
    return this.width * this.height;
};

exports.perimeter = function() {
    return this.width * 2 + this.height * 2;
};
