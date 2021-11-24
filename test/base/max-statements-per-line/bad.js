var bar; var baz;
if (condition) { bar = 1; }
for (var i = 0; i < length; ++i) { bar = 1; }
switch (discriminant) { default: break; }
function foo() { bar = 1; }
var qux = function foo() { bar = 1; };
(function foo() { bar = 1; })();
