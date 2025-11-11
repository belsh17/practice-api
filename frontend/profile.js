document.addEventListener("DOMContentLoaded", function() {

    const changeBtn = document.getElementById("makeChanges");
    const updateBtn = document.getElementById("update");

    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const phonenum = document.getElementById("phonenum");
    const age = document.getElementById("age");

    const id = 1; // example logged-in user id — you’d normally get this from login/session

    function LoadProfile(){
        //const id = 

        fetch(`http://localhost:5007/profile/${id}`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(profile => {
                firstname.value = profile.FirstName;
                lastname.value = profile.LastName;
                phonenum.value = profile.PhoneNumber;
                age.value = profile.Age;
            })
            .catch(error => console.error("Cannot load profile:", error));
    }        
        //change or add profile functionality

        if(changeBtn){
            changeBtn.addEventListener("click", () => {
                const profile = {
                    FirstName: firstname.value,
                    LastName: lastname.value,
                    PhoneNumber: phonenum.value,
                    Age: parseInt(age.value),
                    UserId: id
                }
                
                fetch("http://localhost:5007/profile", {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(profile)
                })
                .then(response => response.json())
                .then(() => {
                    console.log("Profile added successfully");
                    LoadProfile()
                })
                .catch(error => console.error("Error adding profile:", error));
            });
        }

        if(updateBtn){
            updateBtn.addEventListener("click", () => {
                const updatedProfile = {
                    FirstName: prompt("Edit first name", firstname.value),
                    LastName: prompt("Edit last name", lastname.value),
                    PhoneNumber: prompt("Edit phone number", phonenum.value),
                    Age: parseInt(prompt("Edit age", age.value)),
                    UserId: id
                };

                fetch(`http://localhost:5007/profile/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProfile)
            })
            .then(res => res.json())
            .then(() => {
                console.log("Profile updated successfully");
                LoadProfile();
            })
            .catch(error => console.error("Error updating profile:", error));
                
        });
        
    }

    LoadProfile();
});
