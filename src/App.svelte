<script>
    import Subtitle from "./lib/General/Subtitle.svelte";
    import Title from "./lib/General/Title.svelte";
    import GoogleAuthButton from "./lib/GoogleAuthButton.svelte";
    import Sidebar from "./lib/Sidebar.svelte";
    import Topbar from "./lib/Topbar.svelte";
    import { sidebar_width_em, updateSize } from "./lib/colors";
    
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
    
    const what = () => {console.log(window.innerWidth);}

    $: main_margin_left_em = () => {
      if($sidebar_width_em.display == "block") {
        return $sidebar_width_em.width;
      } else{
        return 0;
      }
    };
    // Falcon background (with dark overlay) - 

</script>
<Topbar userTopBar = {user}/>
<Sidebar /> <!-- REMEBER TO PUT AN IF STATEMENT AROUND THIS!-->

<br>
<main style = "background-color: purple; margin-left: {main_margin_left_em}em;">
  
  <button on:click = {what}>debug button</button><!-- DEBUG: To show that console works -->
  
  {#if !user.loggedIn}
    <Title text = "SGA Voting App" />
    <Subtitle text = "Poolesville High School" />
    <GoogleAuthButton bind:appUser = {user} />
  {:else if user.loggedIn && !user.confirmed}
    <Title text = "SGA Voting App" />
    <Subtitle text = "Poolesville High School" />
      Is this u? 
      <br> NAME: {user.name} <br>EMAIL: {user.email}
      <button on:click = {() => {user.reset()}}>NO!!</button> <br>
      <button on:click = {() => {
        user.confirmed = true;
        sidebar_width_em.set({
            display: "block",
            width: $sidebar_width_em.width
          });
        updateSize();
        }
        }
        >YES!!</button>
  {:else}
    LOGGED IN!
  {/if}
  
  
</main>

