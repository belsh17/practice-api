
document.addEventListener("DOMContentLoaded", function () {

    const list = document.querySelector("ul");
    const addBtn = document.getElementById("add-button");

    function LoadEvents(){
        fetch("http://localhost:5007/events")
            .then(response => response.json())
            .then((data) => {
                list.innerHTML = ""; // clear the list before reloading
                data.forEach(event => {
                    const li = document.createElement("li");
                    li.textContent = `${ event.eventName } - ${ event.location }`;

                    const editBtn = document.createElement("button");
                    editBtn.textContent = "Edit";

                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";

                    li.appendChild(deleteBtn);
                    li.appendChild(editBtn);
                    list.append(li);

                    //delete functionality
                    deleteBtn.addEventListener("click", () => {
                        fetch(`http://localhost:5007/events/${event.id}`, {
                            method: "DELETE"
                        })
                            .then(() => {
                            console.log("Deleted event", event.id);
                            LoadEvents();
                        })
                        .catch(error => console.error("Error deleting event:", error));
                    });

                    //edit functionality
                    editBtn.addEventListener("click", () => {

                        const newName = prompt("Enter event name", event.eventName);
                        const newLocation = prompt("Enter new location", event.location);
                      

                        fetch(`http://localhost:5007/events/${event.id}`, {
                            method: "PUT",
                            headers: { "Content-Type" : "application/json"},
                            body: JSON.stringify( {eventName: newName, location: newLocation})
                        })
                        .then(() => LoadEvents())
                        .catch(error => console.error("Error editing event:", error));

                    });
                });
            });
    }

    //add functionality
    addBtn.addEventListener("click", () => {
        const eventName = document.getElementById("eventName").value;
        const location = document.getElementById("location").value;

        const newEvent = {
           eventName,
           location
        };

        fetch("http://localhost:5007/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent)
            })
            .then(res => res.json())
            .then(() => {
                console.log("Added event:", newEvent);
                document.getElementById("eventName").value = "";
                document.getElementById("location").value = "";
                LoadEvents();
            })
            .catch(err => console.error("Error adding event:", err));
    });
    LoadEvents();
})

//const eventName = document.getElementById("")