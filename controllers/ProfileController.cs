using System;
using Microsoft.AspNetCore.Mvc;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ProfileController : ControllerBase
    {
        private static List<Profile> Profiles = new List<Profile>();
        
        //get api endpoint 
        [HttpGet("{userId}")]
        public IActionResult GetProfileDetails(int userId)
        {
            //basically get all information for that users profile
            var profile = Profiles.FirstOrDefault(p => p.UserId == userId);
            if (profile == null)
            {
                return NotFound($"Profile for user {userId} not found.");
            }

            return Ok(profile);

        }

        [HttpPost]
        public IActionResult AddProfile([FromBody] Profile profile)
        {
            //UsersDetails.id = UsersDetails.Count + 1;
            profile.Id = Profiles.Count + 1;
            Profiles.Add(profile);
            return Ok(profile);
        }

        [HttpPut("{userId}")]
        public IActionResult EditProfile(int userId,[FromBody] Profile updatedProfile)
        {
            var existing = Profiles.FirstOrDefault(p => p.UserId == userId);
            if (existing == null) return NotFound();

            //Profile updatedProfile = new Profile();
            existing.FirstName = updatedProfile.FirstName;
            existing.LastName = updatedProfile.LastName;
            existing.Age = updatedProfile.Age;
            existing.PhoneNumber = updatedProfile.PhoneNumber;
            
            return Ok(existing);
        }
    }
}