using System;

namespace ToDoApi.Models
{
    public class Profile
    {
        public int Id { get; set; }           // unique profile id
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string PhoneNumber { get; set; }
        public int UserId { get; set; }       // link to the user who owns it
    }
}