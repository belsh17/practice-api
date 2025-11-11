using System;
using Microsoft.AspNetCore.Mvc;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventsController : ControllerBase
    {
        private static List<Event> events = new List<Event>();

        //displaying all events as list
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(events);
        }

        [HttpPost]
        public IActionResult AddEvent([FromBody] Event newEvent)
        {
            newEvent.Id = events.Count + 1;
            events.Add(newEvent);
            return Ok(newEvent);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(int id)
        {
            var existing = events.FirstOrDefault(e => e.Id == id);
            if (existing == null) return NotFound();

            events.Remove(existing);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult EditEvent(int id, [FromBody] Event updatedEvent)
        {
            var existing = events.FirstOrDefault(e => e.Id == id);
            if (existing == null) return NotFound();

            existing.EventName = updatedEvent.EventName;
            existing.Location = updatedEvent.Location;

            return Ok(existing);
        }

    }
}