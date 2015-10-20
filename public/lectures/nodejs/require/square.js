module.exports = function(name, width, height) {
    this.name = name;
    this.width = width;
    this.height = height;

    var api = {
        setName : setName,
        getName : getName,
        getWidth : getWidth,
        setWidth : setWidth
    };
    return api;

    function setName(name) {
        this.name = name;
    }
    function setWidth(width) {
        this.width = width;
    }
    function getWidth() {
        return this.width;
    }

    function getName() {
        return this.name;
    }
};
