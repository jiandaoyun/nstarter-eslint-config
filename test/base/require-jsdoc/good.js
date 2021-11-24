/**
 * It returns 10
 */
function foo() {
  return 10;
}

/**
 * It returns test + 10
 * @params {int} test - some number
 * @returns {int} sum of test and 10
 */
var bar = (test) => {
  return test + 10;
};

/**
 * It returns 10
 */
var baz = () => {
  return 10;
};

/**
 * It returns 10
 */
var qux = function () {
  return 10;
};

var array = [1, 2, 3];
array.filter(function (item) {
  return item > 2;
});

/**
 * A class that can return the number 10
 */
class Foo {
  /**
   * It returns 10
   */
  bar() {
    return 10;
  }
}

/**
 * It returns 10
 */
var quux = function () {
  return 10;
};

var foofoo = {
  /**
   * It returns 10
   */
  bar: function () {
    return 10;
  },

  /**
   * It returns 10
   */
  baz() {
    return 10;
  },
};

setTimeout(() => {}, 10); // since it's an anonymous arrow function
