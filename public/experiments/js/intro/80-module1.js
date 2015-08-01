app.events = (function()
{
  var events = {
    event1: event1,
    event2: event2
  };
  
  return events;
  
  function event1()
  {
   // app.add();
    app.math.add();
//    alert(c);
  }
  
  function event2()
  {
    alert("event2");
  }
})();
