<script>

    import Topbar from "./lib/Topbar.svelte";
    let user = {
      name:undefined, 
      email:undefined, 
      loggedIn: false, 
      confirmed: false, 
      reset: function() {
        user.name = undefined;
        user.email = undefined;
        user.loggedIn = false;
        user.confirmed = false;
      }};
    
    const what = () => {console.log(user.loggedIn);}


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
        // decodeJwtResponse() is a custom function defined by you
        // to decode the credential response.
        responsePayload = decodeJwtResponse(response.credential);

        user.email = responsePayload.email;
        user.name = responsePayload.name;
        user.loggedIn = true;

        console.log("ID: " + responsePayload.sub);
        console.log('Full Name: ' + responsePayload.name);
        console.log('Given Name: ' + responsePayload.given_name);
        console.log('Family Name: ' + responsePayload.family_name);
        console.log("Image URL: " + responsePayload.picture);
        console.log("Email: " + responsePayload.email);
    }


    // Falcon background (with dark overlay) - https://docs.google.com/drawings/d/16JuH09ZYbeDR4LBjZoEbvoiM2lshXa-_ZnOYh9YSilk/edit?usp=sharing

</script>

<Topbar userTopBar = {user}/>
<br>
<main>
  <button on:click = {what}>debug button</button><!-- DEBUG: To show that console works -->
  <br>
  {#if !user.loggedIn}
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <div id="g_id_onload"
        data-client_id="341767156528-fs4h69iujkab2cu04tvrr0jeafb3gk2o.apps.googleusercontent.com"
        data-callback= "handleCredentialResponse">
    </div>
    <div class="g_id_signin" data-type="standard"></div>
  {:else if user.loggedIn && !user.confirmed}
      Is this u? 
      <br>
      NAME: {user.name}
      <br>
      EMAIL: {user.email}
      <button on:click = {() => {user.reset()}}>NO!!</button>
      <button on:click = {() => {user.confirmed = true}}>YES!!</button>
  {:else}
    LOGGED IN AS {user.name}
  {/if}

</main>
<style>
  .g_id_signin {
      position: absolute;
      background-color: purple;
      
      bottom: 5em;
      left: 45%;
      right: auto;

      height: 10em;
      margin-left:auto;
      margin-right: auto;
      display:block;
  }
</style>

<!--

  "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."

-->