//const { response } = require("express");

// const list = 
document.addEventListener("DOMContentLoaded", function() {

    const taskList = document.querySelector("ul");

    function loadTasks(){
        fetch("http://localhost:5007/tasks") //sends an HTTP GET request to API endpoint
            //conbverts the raw HTTP response into JS object or array
            .then(response => response.json()) //API response is JSON data
            .then(data => { //data holds the array of tasks that the API sent 
                taskList.innerHTML = ""; //clear old list
                data.forEach(task => { //loops through ea. task returned from the API and adds it as li to ul
                    const li = document.createElement("li");
                    li.textContent = `${task.taskName} - ${task.isDone ? "tick" : "cross"}`;
                    taskList.appendChild(li);
                });
            })
            .catch(error => console.error("Error loading tasks:", error));
    }

    loadTasks();

    const addButton = document.getElementById("addTask");
    const deleteButton = document.getElementById("deleteTask");

    if(addButton){
        addButton.addEventListener("click", () => {
            //to add a new task you will have to use literals for the list
            //add task button triggers to create the list element and display
            //use fetch call for get controller
            const newTask = {
                taskName: prompt("Enter a task name:"),
                isDone: false
            };

            fetch("http://localhost:5007/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newTask)
            })
                .then(response => response.json())
                .then(() => loadTasks()) //reload list
                .catch(error => console.error("Error adding task:", error));
            console.log("Button clicked!");
        });
    }

    if(deleteButton){
        deleteButton.addEventListener("click", () => {
            const id = prompt("Enter ID of task to delete:");

            fetch(`http://loacalhost:5007/tasks/${id}`, {
                method: "DELETE"

            })
                .then(() => loadTasks())
                .catch(error => console.error("Error deleting task:", error));
            console.log("button clicked")
        });
    }
});