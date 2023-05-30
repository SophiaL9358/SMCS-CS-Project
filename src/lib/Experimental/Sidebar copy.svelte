<script>
    import { doc, getDoc } from 'firebase/firestore';
    import { yellow_color, db, user, outline_width_em, outline_style, sidebar_width_em, updateSize } from '../constants.js';
    import SidebarBoxcopy from './SidebarBox copy.svelte';

    var electionInfo;
    var seeingElectionName = "";
    var happened = false;

    // If on submission page
    $: if ($user != undefined && $user.elections != undefined && $user.elections.length == $user.pageOn){
        sidebar_width_em.set({
                width: 0,
                display: "none"
            });
        } else {
            updateSize();
        }

    /* ----------- UPDATING THE SIDEBAR ----------- */
    // Update the first time the user gets on the app
    $: if (electionInfo == undefined && $user.confirmed){
        electionInfo = getElectionName();
    }
    // If the names of the sidebar and the main title of voting screen is different
    $: if (seeingElectionName != undefined && $user.elections != undefined && seeingElectionName.indexOf($user.elections[$user.pageOn]) == -1){
        electionInfo = getElectionName();
        happened = false;
    }
    // If it hasn't happened and user's on a page that's not on a submit page
    $: if (!happened && $user.elections != undefined && $user.pageOn < $user.elections.length) {
        happened = true;
        electionInfo = getElectionName();
    }

    // Get information from firestore
    async function getElectionName(){
        var collectionID = $user.elections[$user.pageOn];
        var res =  (await getDoc(doc(db, collectionID + "/All Positions"))).data();
        if (res == undefined) {
            return;
        }
        seeingElectionName = res.electionName;
        return {
            electionName: res.electionName,
            positions: res.positions,
            count: res.count
        };
    }

    var duckme;
    function scrollContainerResize(){
        if (duckme != null){
            duckme.style.height = (window.innerHeight-180) +"px";
        }
        
    }
    window.addEventListener("resize", scrollContainerResize);
</script>

<div id = "sidebar" 
    style = "{outline_style} color: {yellow_color};">

    {#await electionInfo}
        <p> Processing...</p> <!-- Waiting for firestore -->

    {:then electionInfo}
        {#if electionInfo != undefined}
        <div style = "margin-bottom: 1.25em; margin-top: 1.5em">
            {electionInfo.electionName} Election <!-- Name of the election -->
        </div>

        <!-- Jump to top/bottom of the page -->
        <a href = "#top"><button style = "background-color: {yellow_color};">Top</button></a>
        <a href = "#bottom"><button style = "background-color: {yellow_color};">Bottom</button></a>
        <br><br>

        <div bind:this = {duckme} id = "scroll_container"> <!-- Sidebar boxes (showing positions + candidate(s)) -->
            {#each electionInfo.positions as officerPos}
                <SidebarBoxcopy position = "{officerPos}" />
            {/each}
        </div>
        {/if}
    {/await}        
</div>

<style>
    #sidebar {
        position: fixed;
        padding-top: 1em;
        top:0;
        left:0;
        bottom:0;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        
    }
    #scroll_container {
        width: 100%;
        justify-content: center;
        overflow-y: scroll;
        overflow-x:hidden;
        background-color: aqua;
    }

    #scroll_container::-webkit-scrollbar{
    display: none;
  }
</style>