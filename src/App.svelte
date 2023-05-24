<script>
  // Imports
  import Subtitle from "./lib/General/Subtitle.svelte";
  import Title from "./lib/General/Title.svelte";
  import GoogleAuthButton from "./lib/Homepage/GoogleAuthButton.svelte";
  import Sidebar from "./lib/Bar/Sidebar.svelte";
  import Topbar from "./lib/Bar/Topbar.svelte";
  import { onDestroy } from 'svelte';
  import { sidebar_width_em, updateSize, user, resetUser, unsubscribe, red_color, green_color } from "./lib/constants.js";
  import GradeVotingPage from "./lib/Voting/GradeVotingPage.svelte";
  import SignIn from "./lib/Homepage/SignIn.svelte";

  // From store of constants.js, need to destroy the unsub variable to prevent memory leaks
  onDestroy(unsubscribe);

  // Keep track of what page the user is one (false is default)
  let onWholeSchool = false;
  
  // TODO: TESTING ONLY, DELETE AFTER TESTING
 /* user.set({
        name:"Julia Kolotev", 
        email:"uwu@gmail.com", 
        loggedIn: true, 
        confirmed: true,
        grade: 10,
        officerOn: "President",
        pageOn: "Grade"
    }); 
    sidebar_width_em.set({
          display: "block",
          width: $sidebar_width_em.width
        });//*/
  // To set the margin left for the main component depending on the visibility of the sidebar
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

  let handleConfirm = () => {
      user.update(state => ({...state, confirmed: true}));

      sidebar_width_em.set({
          display: "block",
          width: $sidebar_width_em.width
        });
      updateSize();
      };

</script>
<!-- Bars -->
<div style = "width: 100%; height: 4em;"></div> <!-- Taking up the space the topbar would've had -->
<Sidebar />

<main style = "margin-left: {main_margin_left_em}em;"> <!-- if sidebar is there -->
  {#if !$user.loggedIn} <!-- LOGIN page -->
    <Title text = "PHS SGA Voting" />

    <Subtitle text = "Student Sign In" />
    <SignIn />
    <br>
    <Subtitle text = "Teacher Sign In" />
    <GoogleAuthButton />

  {:else if $user.loggedIn && !$user.confirmed}  <!-- CONFIRM page -->
  <Title text = "PHS SGA Voting" />
  <center>
    <div class = "prompt">
      Is this information correct?
      <br> NAME: <b>{$user.name}</b> <br>EMAIL: <b>{$user.email}</b> <br> GRADE: <b>{$user.grade}</b>
      <br><br>
      <button style = "background-color: {red_color};" on:click = {() => {resetUser();}}>No</button>
      <button style = "background-color: {green_color};" on:click = {handleConfirm}>Yes</button>
    </div>
  </center>

  {:else if !onWholeSchool} <!-- GRADE VOTING page -->
      <GradeVotingPage />
  {:else if onWholeSchool}  <!-- TODO: WHOLE SCHOOL VOTING page -->
      <GradeVotingPage />
  {:else}  <!-- I don't know how a user could see this but just in case -->
        An error occurred... please reload the page!
  {/if}
</main>

<Topbar /> <!-- So it can be on top of everything-->
