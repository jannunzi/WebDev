var math = (function()
{
  var api = {
    add: add,
    subtract: subtract
  };
  
  return api;
  
  function add(a, b)
  {
    return a + b;
  }
  
  function subtract(a, b)
  {
    return a - b;
  }
})();
