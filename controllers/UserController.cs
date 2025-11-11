using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
   [ApiController]
   [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private static List<User> users = new List<User>();

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(users);
        }

        [HttpPost]
        public IActionResult AddUser(User user)
        {
            user.id = users.Count + 1;
            users.Add(user);
            return Ok(user);
        }

        [HttpPut("{id}")] //id in url < becomes id in parameter
        public IActionResult EditUser(int id, User updatedUser)
        {
            var existigUser = users.FirstOrDefault(u => u.id == id); //finds the user in mem matching the id
            if (existigUser == null) return NotFound();

            //updates in mem. user with new values from request
            existigUser.username = updatedUser.username;
            existigUser.email = updatedUser.email;
            return Ok(existigUser);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var existingUser = users.FirstOrDefault(u => u.id == id);
            if (existingUser == null) return NotFound();

            users.Remove(existingUser);
            return Ok();
        }
    }
}