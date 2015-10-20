module.exports = function(width, height) {

    this.width = width;
    this.height = height;

    var interface = {
        area : area,
        perimeter : perimeter,
        setHeight : setHeight,
        setWidth  : setWidth,
        getHeight : getHeight,
        getWidth  : getWidth
    };
    return interface;

    function area() {
        return width * height;
    }

    function perimeter() {
        return width * 2 + height * 2;
    }

    function setWidth(width) {
        this.width = width;
    }

    function setHeight(height) {
        this.height = height;
    }

    function getHeight() {
        return this.height;
    }

    function getWidth() {
        return this.width;
    }
};
