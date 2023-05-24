<script>
    import { doc, getDoc } from 'firebase/firestore';
    import { yellow_color, db, user, outline_width_em, outline_style, sidebar_width_em } from '../constants.js';
    import SidebarBox from './SidebarBox.svelte';

    var electionInfo;
    var seeingElectionName = "";
    var happened = false;
    $: if (electionInfo == undefined && $user.confirmed){
        
        electionInfo = getElectionName();
    }
    $: if (seeingElectionName != undefined && seeingElectionName.indexOf($user.elections[$user.pageOn]) == -1){
        electionInfo = getElectionName();
        happened = false;
        console.log("here");
        console.log(seeingElectionName.indexOf($user.elections[$user.pageOn]));
        console.log($user.elections[$user.pageOn]);
        console.log(seeingElectionName);
    }
    $: if (!happened && $user != undefined && $user.pageOn < $user.elections.length) {
        happened = true;
        electionInfo = getElectionName();
    }

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
</script>

<div id = "sidebar" 
    style = "{outline_style} color: {yellow_color}; margin-top: {outline_width_em}em; width: {$sidebar_width_em.width}em; display: {$sidebar_width_em.display};">
    
    {#await electionInfo}
        <p> Processing...</p>
    {:then electionInfo}
        {#if electionInfo != undefined}
        <div style = "margin-bottom: 3em;">
            {electionInfo.electionName} Election
        </div>
        <div id = "scroll_container">
            <div class = "positions">
                {#each electionInfo.positions as officerPos}
                    <SidebarBox position = "{officerPos}" />
                {/each}
            </div>
        </div>
        {/if}
    {/await}
        
</div>

<style>
    #sidebar {
        position: fixed;
        padding-top: 1em;
        height: 100%;
        background-color: black;
        
    }
    #scroll_container {
        position: relative;
        height: inherit;
        height: 70%;
        overflow-y: scroll;
        overflow-x:hidden;
    }
    .positions { /* mostly for debugging*/
        background-color: rgb(30, 30, 30);
        
    }
    #scroll_container::-webkit-scrollbar{
    display: none;
  }
</style>