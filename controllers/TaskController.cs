using System;
using Microsoft.AspNetCore.Mvc;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase{

        private static List<TaskItem> tasks = new List<TaskItem>();

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(tasks);
        }

        [HttpPost]
        public IActionResult AddTask(TaskItem task)
        {
            task.Id = tasks.Count + 1;
            tasks.Add(task);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, TaskItem updatedtask)
        {
            var existing = tasks.FirstOrDefault(t => t.Id == id);
            if (existing == null) return NotFound();

            existing.TaskName = updatedtask.TaskName;
            existing.IsDone = updatedtask.IsDone;
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            tasks.Remove(task);
            return Ok();
        }
        
    }
}