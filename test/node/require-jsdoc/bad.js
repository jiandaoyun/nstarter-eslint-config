function foo() {
    return 10;
}

var bar = () => {
    return 10;
};

class Foo {
    bar() {
        return 10;
    }
}

var baz = function() {
    return 10;
};

var qux = {
    bar: function() {
        return 10;
    },

    baz() {
        return 10;
    }
};
