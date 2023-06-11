<script>
    import { user } from '../constants.js';

    // Decode the information given by google
    function decodeJwtResponse(token) {
        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload)
    }

    // Function to update user information and log the user information
    globalThis.handleCredentialResponse = (response) => {
        let responsePayload = decodeJwtResponse(response.credential);
        let emails = ["alexandra_s_hicks@mcpsmd.org","alexandra.s.hicks@mcpsmd.net", "smcs2025.teco@gmail.com", "Mark_R_Estep@mcpsmd.org", "mark.r.estep@mcpsmd.net"];
        if (emails.indexOf(responsePayload.email) != -1){
            user.update(state => ({...state, 
                name: responsePayload.name,
                loggedIn: true,
                admin: true,
                confirmed: false
            }));
        } else {
            alert("Unauthorized user.");
        }
        
    }
</script>

<!-- Google Auth Script-->
<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div id="g_id_onload"
    data-client_id="341767156528-fs4h69iujkab2cu04tvrr0jeafb3gk2o.apps.googleusercontent.com"
    data-callback= "handleCredentialResponse">
</div>
<div class = "parent_container">
    <div class="g_id_signin" data-type="standard">
        No Internet Connection <!-- If the button doesn't show (due to no internet)-->
    </div>  
</div>

<style>
    /* For centering the google sign in button */
    .parent_container {  
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .g_id_signin {
        padding-bottom: 2em;
    }
    
</style>