<script>
  // Imports
  import Subtitle from "./lib/General/Subtitle.svelte";
  import Title from "./lib/General/Title.svelte";
  import GoogleAuthButton from "./lib/GoogleAuthButton.svelte";
  import Sidebar from "./lib/SidebarFiles/Sidebar.svelte";
  import Topbar from "./lib/Topbar.svelte";
  import { onDestroy } from 'svelte';
  import { sidebar_width_em, updateSize, user, resetUser, unsubscribe, red_color, green_color } from "./lib/constants.js";
  import Grade10VotingPage from "./lib/voting/Grade10VotingPage.svelte";
  
  // From store of constants.js, need to destroy it to prevent memory leaks
  onDestroy(unsubscribe);

  // Debug button, prints to log
  const what = () => {console.log(main_margin_left_em);}

  // Keep track of what page the user is one (false is default)
  let onWholeSchool = false;
  
  // TODO: TESTING ONLY, DELETE AFTER TESTING
  /*user.set({
        name:"Julia Kolotev", 
        email:"uwu@gmail.com", 
        loggedIn: true, 
        confirmed: true,
        grade: 10
    }); //*/
  // To set the margin left for the main component
  let main_margin_left_em;
  $: {if($sidebar_width_em.display == "block") {
      main_margin_left_em =  $sidebar_width_em.width;
    } else{
      main_margin_left_em = 0;
    }
  }

  // If user leaves, reset their information
  $: if ($user.loggedIn){
    window.onbeforeunload = resetUser;
  }

</script>

<!-- Bars -->
<Topbar />
<Sidebar />
<br> <!-- Needed since the outline of the topbar isn't counted as part of the component-->

<main style = "margin-left: {main_margin_left_em}em;">
  <!-- TODO: delete this, only for mcps ids -->
  <button style = "background-color: {green_color};" on:click = {() => {
    user.update(state => ({...state, 
            email: "owowow",
            name: "Hacker wow",
            loggedIn: true,
            grade: 2025 // TODO: Assigns grade based on database
        }));

    sidebar_width_em.set({
        display: "block",
        width: $sidebar_width_em.width
      });
    updateSize();
    }
    }
    >get in anwaysy!!</button>

  {#if !$user.loggedIn} <!-- LOGIN page -->
    <Title text = "SGA Voting App" />
    <Subtitle text = "Poolesville High School" />
    <GoogleAuthButton />
  {:else if $user.loggedIn && !$user.confirmed}  <!-- CONFIRM page -->
    <Title text = "SGA Voting App" />
    <Subtitle text = "Poolesville High School" />
      Is this u? 
      <br> NAME: {$user.name} <br>EMAIL: {$user.email}
      <button style = "background-color: {red_color};" on:click = {() => {resetUser();}}>NO!!</button> <br>
      <button style = "background-color: {green_color};" on:click = {() => {
        user.update(state => ({...state, confirmed: true}));

        sidebar_width_em.set({
            display: "block",
            width: $sidebar_width_em.width
          });
        updateSize();
        }
        }
        >YES!!</button>
  {:else if !onWholeSchool} <!-- GRADE VOTING page -->
      <Grade10VotingPage />
  {:else if onWholeSchool}  <!-- WHOLE SCHOOL VOTING page -->
  <Grade10VotingPage />
  {:else}  <!-- SADNESS page -->
        Something went wrong :/
  {/if}
  
  <!----<button on:click = {what}>debug button</button><!-- DEBUG: To show that console works -->

</main>
