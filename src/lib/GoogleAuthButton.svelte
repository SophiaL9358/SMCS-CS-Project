<!-- dsfkldjf-->
<script>
    export let appUser;
    function decodeJwtResponse(token) {
        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload)
    }

    let responsePayload;
    globalThis.handleCredentialResponse = (response) => {
      console.log('START');
      responsePayload = decodeJwtResponse(response.credential);

        appUser.email = responsePayload.email;
        appUser.name = responsePayload.name;
        appUser.loggedIn = true;

        console.log("ID: " + responsePayload.sub);
        console.log('Full Name: ' + responsePayload.name);
        console.log('Given Name: ' + responsePayload.given_name);
        console.log('Family Name: ' + responsePayload.family_name);
        console.log("Image URL: " + responsePayload.picture);
        console.log("Email: " + responsePayload.email);
    }
</script>

<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>
<div id="g_id_onload"
    data-client_id="341767156528-fs4h69iujkab2cu04tvrr0jeafb3gk2o.apps.googleusercontent.com"
    data-callback= "handleCredentialResponse">
</div>
<div id = "container_google">
    <div class="g_id_signin" data-type="standard"></div>
</div>

<style>
    #container_google {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .g_id_signin {
        margin-top: 60vh;
    }
    
</style>