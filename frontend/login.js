
document.addEventListener("DOMContentLoaded", function(){

    const email = document.getElementById("email");
    const username = document.getElementById("username");

    //get reuqest to get all users but thats for displaying them all
    //post request when creating
    //put reuqest but that will be to edit
    //delete reuqest also part of profile

    //POST
    const submitBtn = document.getElementById("submit");
    if(submitBtn){

        submitBtn.addEventListener("click", () => {
            const newUser = {
                email: email.value,
                username: username.value
            };

            fetch("http://localhost:5007/user", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newUser)
            })
                .then(response => response.json())
                .then(user => {
                    console.log("User added:", user);
                    // optionally, clear inputs
                    email.value = "";
                    username.value = "";
            })
            .catch(error => console.error("Error adding user:", error));
        });
        
    }
    
});