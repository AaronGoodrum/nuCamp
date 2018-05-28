/*jshint esversion: 6 */
// Using Callbacks in Node applications
// Error handling in Node applications
module.exports = (x, y, callback) => {
    if (x <= 0 || y <= 0)
        setTimeout(() =>
            callback(new Error("Rectangle dimensions should be greater than zero: l = " +
                    x + ", and b = " + y),
                null),
            2000);
    else
        setTimeout(() =>
            callback(null, {
                perimeter: () => (2 * (x + y)),
                area: () => (x * y)
            }),
            2000);
}


exports.perimeter = (x, y) => (2 * (x + y));

exports.area = (x, y) => (x * y);