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
    let firebaseCallback;

    async function handleClick(){
        warning = "Processing...";
        try {
            response = await StudentVue.login(DISTRICT_URL, { username: idInput.value, password: passwordInput.value });
            
            // get firebase data
            firebaseCallback = getDoc(doc(db, "PHS IDs/"+idInput.value));
            var fbResponse = (await firebaseCallback).data()

            if (fbResponse == undefined) {
                warning = "Unauthorized user!";
            } else {
                console.log((await firebaseCallback).data());
                // Update user with new info
                user.update(state => ({...state, 
                    email: idInput.value + "@mcpsmd.net",
                    name: idInput.value,
                    loggedIn: true,
                    confirmed: true, // TODO: Gets rid of confirmation
                    grade: 2025, // TODO: Assigns grade based on database
                    officerOn: "President",
                    pageOn: "Grade"
                }));
                idInput.value = "";
                passwordInput.value = "";
                response = null;

                // TODO: GET RID OF THIS IF PUTTING BACK CONFIRMATION PAGE:
                sidebar_width_em.set({
                    display: "block",
                    width: $sidebar_width_em.width
                });
                updateSize();
            }
        } catch {
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
        
        <p>{warning}</p>
    </div>
</center>

<style>
    div p {
        color:red;
    }
    
</style>