<script>
    import StudentVue from 'studentvue';
    import { user, sidebar_width_em, updateSize, db } from '../constants.js';
    import {collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
    import { select_option } from 'svelte/internal';

    let idInput;
    let passwordInput;
    let warning = "";

    const DISTRICT_URL = "https://md-mcps-psv.edupoint.com/PXP2_Login.aspx";
    let response;

    async function handleClick(){
        document.getElementById("warning").style.color = "gray";
        warning = "Processing...";
        try {
            response = await StudentVue.login(DISTRICT_URL, { username: idInput.value, password: passwordInput.value });
            
            // get firebase data
            var firebaseIDCallback = getDoc(doc(db, "PHS IDs/"+idInput.value));
            var fbIDResponse = (await firebaseIDCallback).data()
            
            if (fbIDResponse == undefined) {  
                console.log(fbIDResponse);
                document.getElementById("warning").style.color = "red";
                warning = "Unauthorized user!";
            } else {
                var firebaseElectionCallback = getDoc(doc(db, "General Information/"+ fbIDResponse.grade));
                var fbElectionResponse = (await firebaseElectionCallback).data();
                if (fbElectionResponse == undefined) {
                    document.getElementById("warning").style.color = "red";
                    warning = "No elections available for Grade " + fbIDResponse.grade+"!";
                } else {
                    user.update(state => ({...state, 
                        email: idInput.value + "@mcpsmd.net",
                        name: fbIDResponse.first_name + " "+fbIDResponse.last_name,
                        loggedIn: true,
                        confirmed: false, // TODO: Gets rid of confirmation
                        grade: fbIDResponse.grade, // TODO: Assigns grade based on database
                        elections: fbElectionResponse.available_elections,
                        pageOn: 0,
                        officerOn: "President"
                }));
                    idInput.value = "";
                    passwordInput.value = "";
                }
                // Update user with new info

                fbElectionResponse = null;
                document.getElementById("warning").style.color = "red";
                // TODO: GET RID OF THIS IF PUTTING BACK CONFIRMATION PAGE:
                /*sidebar_width_em.set({
                    display: "block",
                    width: $sidebar_width_em.width
                });
                updateSize();
                */
            }
            
            response = null;
            fbIDResponse = null;
        } catch {
            document.getElementById("warning").style.color = "red";
            warning = "Username or Password is incorrect!";  
        }
    }
</script>

<center>
    <div class = "prompt">
        ID: <input type = "text" bind:this = {idInput}> <br>
        Password: <input type = "password" bind:this = {passwordInput}>
        <br> <br>
        <button on:click = {handleClick}>Submit</button>
        
        <p id = "warning">{warning}</p>
    </div>
</center>

<style>
    div p {
        color:red;
    }
    
</style>