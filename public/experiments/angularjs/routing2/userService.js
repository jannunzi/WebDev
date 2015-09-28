(function()
{
  angular
    .module("WhiteBoardApp")
    .factory("UserService", userService);
    
  function userService()
  {
    var users = [
      {username: "Alex"},
      {username: "Bob"},
      {username: "Charlie"},
    ];
    
    var service = {
      findAllUsers : findAllUsers,
      findUserById : findUserById
    };
    
    return service;
    
    function findAllUsers()
    {
      return users;
    }
    
    function findUserById(id)
    {
      return users[id];
    }
    
  }
})();