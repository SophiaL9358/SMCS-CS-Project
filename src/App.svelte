<script>
    import Subtitle from "./lib/General/Subtitle.svelte";
    import Title from "./lib/General/Title.svelte";
    import GoogleAuthButton from "./lib/GoogleAuthButton.svelte";
    import Sidebar from "./lib/Sidebar.svelte";
    import Topbar from "./lib/Topbar.svelte";
    import { onDestroy } from 'svelte';
    import { sidebar_width_em, updateSize, user, resetUser, unsubscribe } from "./lib/constants.js";
    

    onDestroy(unsubscribe);

    const what = () => {console.log(main_margin_left_em);}
    let main_margin_left_em;
    $: {
      console.log(main_margin_left_em);
      if($sidebar_width_em.display == "block") {
        main_margin_left_em =  $sidebar_width_em.width;
      } else{
        main_margin_left_em = 0;
      }
    }

    // Falcon background (with dark overlay) - 

</script>
<Topbar />
<Sidebar /> <!-- REMEBER TO PUT AN IF STATEMENT AROUND THIS!-->

<br>
<main style = "background-color: purple; margin-left: {main_margin_left_em}em;">
  
  <button on:click = {what}>debug button</button><!-- DEBUG: To show that console works -->
  
  {#if !$user.loggedIn}
    <Title text = "SGA Voting App" />
    <Subtitle text = "Poolesville High School" />
    <GoogleAuthButton />
  {:else if $user.loggedIn && !$user.confirmed}
    <Title text = "SGA Voting App" />
    <Subtitle text = "Poolesville High School" />
      Is this u? 
      <br> NAME: {$user.name} <br>EMAIL: {$user.email}
      <button on:click = {() => {resetUser();}}>NO!!</button> <br>
      <button on:click = {() => {
        user.update(state => ({...state, confirmed: true}));

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

