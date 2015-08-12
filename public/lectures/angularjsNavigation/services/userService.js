(function()
{
	angular
		.module("WhiteBoardApp")
		.factory("UserService", userService);
		
	function userService()
	{
		var users = [
			{first: "Alice", last: "Wonderland", username: "alice"}
			,{first: "Bob", last: "Marley", username: "bob"}
			,{first: "Charlie", last: "Garcia", username: "charlie"}
		];
		
		var service = {
			findAllUsers: findAllUsers,
			findUserById: findUserById,
			createUser: createUser,
			removeUserById: removeUserById,
			updateUserById: updateUserById
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
		
		function createUser(user)
		{
			users.push(user);
		}
		
		function removeUserById(id)
		{
			users.splice(id, 1);
		}
		
		function updateUserById(id, newUser)
		{
			
		}
	}
})();