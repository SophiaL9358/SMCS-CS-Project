<script>
  // Imports
  import Subtitle from "./lib/General/Subtitle.svelte";
  import Title from "./lib/General/Title.svelte";
  import GoogleAuthButton from "./lib/Homepage/GoogleAuthButton.svelte";
  import Sidebar from "./lib/Bar/Sidebar.svelte";
  import Topbar from "./lib/Bar/Topbar.svelte";
  import { onDestroy } from 'svelte';
  import { sidebar_width_em, updateSize, user, resetUser, unsubscribe, red_color, green_color } from "./lib/constants.js";
  import VotingPage from "./lib/Voting/VotingPage.svelte";
  import SignIn from "./lib/Homepage/SignIn.svelte";
    import ConfirmationPage from "./lib/Homepage/ConfirmationPage.svelte";
    import Sidebarcopy from "./lib/Experimental/Sidebar copy.svelte";
    import AdminHomepage from "./lib/Admin/AdminHomepage.svelte";

  // From store of constants.js, need to destroy the unsub variable to prevent memory leaks
  onDestroy(unsubscribe);

  // Set margin based on position of the sidebar
  let main_margin_left_em;
  $: if($sidebar_width_em.display == "block") {
      main_margin_left_em =  $sidebar_width_em.width;
    } else{
      main_margin_left_em = 0;
    }
  
  // If user closes the page, reset their information
  $: if ($user.loggedIn){
    window.onbeforeunload = resetUser;
  }  
</script>

<!-- Bars -->
<div style = "width: 100%; height: 4em;"></div> <!-- Taking up the space the topbar would've had -->
<Sidebar />
<br>
<div id = "top"></div>

<main style = "margin-left: {main_margin_left_em}em;"> <!-- if sidebar is there ==> put margin -->

  {#if $user.admin}
    <AdminHomepage />
  {:else if $user.voteProcessed} <!-- Shows if vote has been recorded -->
    <div class = "center-parent-container"><br><div class = "prompt">
    <b style = "color: green;">Your vote has been recorded! </b>
    <br> Thank you for voting on this application!
    <br> This page can be closed now.
  </div></div>
  
  {:else if $user.voted} <!-- Shows if vote is submitted and is being processed -->
    <div class = "center-parent-container"><br><div class = "prompt">
    Your vote is being processed! 
    <br> <b class = "red">Please do not close the page yet, or else your vote may not be recorded correctly.</b>
    </div></div>

 {:else if !$user.loggedIn} <!-- LOGIN page -->
    <Title text = "PHS SGA Voting" />

    <Subtitle text = "Student Sign In" />
    <SignIn /> 

    <br>
    <Subtitle text = "Teacher Sign In" />
    <GoogleAuthButton />
    <br>
  {:else if $user.loggedIn && !$user.confirmed}  <!-- CONFIRM page -->
    <Title text = "PHS SGA Voting" />
    <ConfirmationPage />

  {:else}  <!-- VOTING page -->
    <VotingPage />

  {/if} 
</main>
<div id = "bottom"></div>

<Topbar /> <!-- So it can be on top of everything-->
<!-- {#if $user.confirmed}
  <Sidebarcopy />

{/if} -->