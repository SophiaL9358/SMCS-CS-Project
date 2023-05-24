<script>
    import StudentVue from 'studentvue';
    import { user, sidebar_width_em, updateSize, db } from '../constants.js';
    import {collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";

    let idInput; // id textbox
    let passwordInput; // password textbox
    let warning = ""; // warning displayed below
    const DISTRICT_URL = "https://md-mcps-psv.edupoint.com/PXP2_Login.aspx";
    let response; 

    // Submit button being clicked!
    async function handleClick(){
        // Waiting for firebase to process (and to show user something is happening)
        document.getElementById("warning").style.color = "gray";
        warning = "Processing...";

        try {
            // Verify if user exists in StudentVUE
            response = await StudentVue.login(DISTRICT_URL, { username: idInput.value, password: passwordInput.value });
            
            // Get firestore data for the PHS ID
            var firebaseIDCallback = getDoc(doc(db, "PHS IDs/"+idInput.value));
            var fbIDResponse = (await firebaseIDCallback).data()
            
            if (fbIDResponse == undefined) {  // If nothing is returned
                document.getElementById("warning").style.color = "red";
                warning = "Unauthorized user!";
            } else {
                // Get firestore data for the elections they're supposed to do
                var firebaseElectionCallback = getDoc(doc(db, "General Information/"+ fbIDResponse.grade));
                var fbElectionResponse = (await firebaseElectionCallback).data();

                if (fbElectionResponse == undefined) { // If nothing is returned
                    document.getElementById("warning").style.color = "red";
                    warning = "No elections available for Grade " + fbIDResponse.grade+"!";
                } else { // Occurs when ID is in MCPS and PHS vvv
                    // Update user with new info
                    user.update(state => ({...state, 
                        email: idInput.value + "@mcpsmd.net",
                        name: fbIDResponse.first_name + " "+fbIDResponse.last_name,
                        loggedIn: true,
                        confirmed: false,
                        grade: fbIDResponse.grade,
                        elections: fbElectionResponse.available_elections,
                        pageOn: 0,
                        officerOn: "President"
                    }));
                    
                    // Reset text from textboxes
                    idInput.value = "";
                    passwordInput.value = "";
                }     
            }

            // Reset other variables
            response = null;
            fbIDResponse = null;
            fbElectionResponse = null;
            document.getElementById("warning").style.color = "red";
        } catch {
            // If StudentVUE returns an error
            document.getElementById("warning").style.color = "red";
            warning = "Username or Password is incorrect!";  
        }
    }
    
    // Check for enter
    document.addEventListener("keyup", function(event) {
        if (event.code === 'Enter') {
            handleClick(); // handle click if they press enter
        }
    });

    
</script>

<center>
    <div class = "prompt">
        <!-- Textboxes -->
        ID: <input type = "text" bind:this = {idInput}> <br><br>
        Password: <input type = "password" bind:this = {passwordInput}> 
                <!-- Show password button -->
                <button style = "height: 1.5em; width: 4em;" on:mousedown = {() => {
                    passwordInput.type = "text";
                }} on:mouseup = { () => {
                    passwordInput.type = "password";
                }
                }> Show </button>
        <br> <br>

        <!-- Submit button -->
        <button id = "submit_button" on:click = {handleClick}>Submit</button>
        
        <!-- Warning -->
        <p id = "warning">{warning}</p>
    </div>
</center>

<style>
    div p {
        color:red; /* so advanced */
    }
</style>