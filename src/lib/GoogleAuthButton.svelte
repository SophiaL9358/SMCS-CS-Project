<!-- dsfkldjf-->
<script>
    import { user } from './constants';

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
      console.log('START');
      let responsePayload = decodeJwtResponse(response.credential);
        
        user.update(state => ({...state, 
            email: responsePayload.email,
            name: responsePayload.name,
            loggedIn: true,
            grade: 2025 // TODO: Assigns grade based on database
        }));

        console.log("ID: " + responsePayload.sub);
        console.log('Full Name: ' + responsePayload.name);
        console.log('Given Name: ' + responsePayload.given_name);
        console.log('Family Name: ' + responsePayload.family_name);
        console.log("Image URL: " + responsePayload.picture);
        console.log("Email: " + responsePayload.email);
    }
</script>

<!-- Google Auth code (ctrl c + v)-->
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