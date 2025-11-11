document.addEventListener("DOMContentLoaded", function() {

    const usersList = document.querySelector("ul");

    function loadUsers(){
        fetch("http://localhost:5007/user")
            .then(response => response.json())
            .then(data => {
                usersList.innerHTML = ""; //clear old list
                data.forEach(user => {
                    const li = document.createElement("li");
                    li.textContent = `${user.username} - ${user.email} `;

                    const deletebtn = document.createElement("button");
                    deletebtn.textContent = "Delete";

                    const editBtn = document.createElement("button");
                    editBtn.textContent = "Edit";

                    li.appendChild(deletebtn);
                    li.appendChild(editBtn);
                    
                    usersList.appendChild(li);

                    //delete functionality
                    deletebtn.addEventListener("click", () => {
                        fetch(`http://localhost:5007/user/${user.id}`, {
                            method: "DELETE"
                        })
                        .then(() => loadUsers())
                        .catch(error => console.error("Error deleting user:", error));
                    }); 

                    //edit functionality
                    editBtn.addEventListener("click", () => {
                        const newUsername = prompt("Enter new username:", user.username);
                        const newEmail = prompt("Enter new email:", user.email);
                                                
                        fetch(`http://localhost:5007/user/${user.id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ username: newUsername, email: newEmail })
                        })
                        .then(() => loadUsers())
                        .catch(error => console.error("Error editing user:", error));
                    });
                });
            })
            .catch(error => console.error("Error loading users:", error));
    }

    loadUsers();

    
});