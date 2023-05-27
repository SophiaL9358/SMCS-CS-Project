<script>
    import StudentVue from 'studentvue';
    import { user, sidebar_width_em, updateSize, db, candidate_selections } from '../constants.js';
    import {collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
    import { construct_svelte_component } from 'svelte/internal';

    let idInput; // ID textbox
    let passwordInput; // Password textbox
    let warning = ""; // Warning displayed below
    const DISTRICT_URL = "https://md-mcps-psv.edupoint.com/PXP2_Login.aspx";

    // Submit button being clicked!
    async function handleClick(){
        // Waiting for firebase to process (and to show user something is happening)
        document.getElementById("warning").style.color = "gray";
        warning = "Processing...";

        try {
            // Verify if user exists in StudentVUE
            let response = await StudentVue.login(DISTRICT_URL, { username: idInput.value, password: passwordInput.value });
            
            // Get firestore data for the PHS ID
            var firebaseIDCallback = getDoc(doc(db, "PHS IDs/"+idInput.value));
            var fbIDResponse = (await firebaseIDCallback).data()
            
            if (fbIDResponse == undefined) {  // If nothing is returned by firestore
                document.getElementById("warning").style.color = "red";
                warning = "Unauthorized user!";
            } else {
                // Get firestore data for the elections they're supposed to do
                var firebaseElectionCallback = getDoc(doc(db, "General Information/"+ fbIDResponse.grade));
                var fbElectionResponse = (await firebaseElectionCallback).data();

                if (fbElectionResponse == undefined) { // If there's no elections available for user
                    document.getElementById("warning").style.color = "red";
                    warning = "No elections available for Grade " + fbIDResponse.grade+"!";
                
                } else { // Occurs when ID is in MCPS and PHS are verified
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

                    // Set up candidate_selection (so user can correctly select candidates)
                    for (var i = 0; i < $user.elections.length; i++){
                        var collectionID = $user.elections[i];
                        var fbPosResponse =  (await getDoc(doc(db, collectionID + "/All Positions"))).data();
                        candidate_selections[collectionID] = {
                            positions: fbPosResponse.positions,
                            chosen_candidates: []
                        };
                        
                        for (var j = 0; j < candidate_selections[collectionID].positions.length; j ++){
                            var res = [];
                            res.push(candidate_selections[collectionID].positions[j]); // Position name
                            var fbNumSelectionResponse = (await getDoc(doc(db, collectionID + "/"+res[0]+" Information"))).data();
                            res.push(fbNumSelectionResponse.numSelectionsAllowed); // Num selections
                            candidate_selections[collectionID].chosen_candidates.push(res);
                        }
                    }
                    // DEBUG: console.log(candidate_selections);

                    // Reset text from textboxes
                    idInput.value = "";
                    passwordInput.value = "";
                }     
            }

            // Reset other variables
            response = null;
            fbIDResponse = null;
            fbElectionResponse = null;
        } catch {
            // If StudentVUE returns an error
            warning = "Username or Password is incorrect!";  
        }

        if (document.getElementById("warning") != null){
            document.getElementById("warning").style.color = "red";
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
    <div class = "prompt" style = "width: 40%; border-radius: 25px;">
        <!-- Textboxes -->
        MCPS ID: 
        <input style = "width: 50%; min-width: 100px; margin-top: 0.7em;" type = "text" bind:this = {idInput} placeholder="Student ID"> <br>
        Password:
        <input style = "width: 50%; min-width: 100px; margin-top: 0.6em;" type = "password" bind:this = {passwordInput} placeholder="Password"> <br>
                <!-- Show password button (clicking shows/unshows it) -->
                <button style = "height: 1.6em; width: 15%; min-width: 50px; margin-top: 0.3em;" on:click = {() => {
                    if (passwordInput.type == "password"){
                        passwordInput.type = "text";
                    } else {
                        passwordInput.type = "password"
                    }
                }}> Show </button>
        <br> <br>

        <!-- Submit button -->
        <button style = "margin-top: -0.2em;"id = "submit_button" on:click = {handleClick}>Submit</button>
        
        <!-- Warning for invalid credentials -->
        <p id = "warning">{warning}</p>
    </div>
</center>

<style>
    div p {
        color:red; /* so advanced */
    }
</style>