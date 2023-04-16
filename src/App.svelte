<script>
    import Subtitle from "./lib/General/Subtitle.svelte";
    import Title from "./lib/General/Title.svelte";
    import GoogleAuthButton from "./lib/GoogleAuthButton.svelte";
import Sidebar from "./lib/Sidebar.svelte";
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

    // Falcon background (with dark overlay) - 

</script>
<Topbar userTopBar = {user}/>
<Sidebar /> <!-- REMEBER TO PUT AN IF STATEMENT AROUND THIS!-->

<br>
<main>
  
  <!--<button on:click = {what}>debug button</button><!-- DEBUG: To show that console works -->
  
  {#if !user.loggedIn}
    <Title text = "SGA Voting App" />
    <Subtitle text = "Poolesville High School" />
    <GoogleAuthButton bind:appUser = {user} />
  {:else if user.loggedIn && !user.confirmed}
      Is this u? 
      <br> NAME: {user.name} <br>EMAIL: {user.email}
      <button on:click = {() => {user.reset()}}>NO!!</button> <br>
      <button on:click = {() => {user.confirmed = true}}>YES!!</button>
  {:else}
    LOGGED IN!
  {/if}
  
  
</main>


<!--

  "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."

-->