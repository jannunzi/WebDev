(function()
{
  angular
    .module("WhiteBoardApp")
    .factory("UserService", userService);
    
  function userService()
  {
    var users = [
      {username: "qwe"},
      {username: "wer"},
      {username: "ert"},
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