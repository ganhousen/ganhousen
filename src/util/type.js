var type = function(o) {
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

var dataTypes = [
  'Null','Undefined','Object','Array',
  'String','Number','Boolean','Function','RegExp',
]
dataTypes.forEach(T => {
  type['is' + T] = function(o) {
    return type(o) === T.toLowerCase();
  };
});

export {
  type
}
