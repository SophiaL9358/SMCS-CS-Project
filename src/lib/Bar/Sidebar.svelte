<script>
    import { doc, getDoc } from 'firebase/firestore';
    import { yellow_color, db, user, outline_width_em, outline_style, sidebar_width_em } from '../constants.js';
    import SidebarBox from './SidebarBox.svelte';

    var electionInfo;
    var gotInfo = false;
    $: if (!gotInfo && $user.confirmed){
        electionInfo = undefined;
        electionInfo = getElectionName();
        gotInfo = true;
    } 
    async function getElectionName(){
        var collectionID = $user.elections[$user.pageOn];
        var res =  (await getDoc(doc(db, collectionID + "/All Positions"))).data();
        var data =  {};
        data.electionName = res.electionName;
        data.positions = res.positions;
        data.count = res.count;
        return data;
    }
</script>

<div id = "sidebar" 
    style = "{outline_style} color: {yellow_color}; margin-top: {outline_width_em}em; width: {$sidebar_width_em.width}em; display: {$sidebar_width_em.display};">
    
    {#await electionInfo}
        <p> Processing...</p>
    {:then electionInfo}
        {#if electionInfo != undefined}
        <div style = "margin-bottom: 3em;">
            {electionInfo.electionName}
        </div>
        <div id = "scroll_container">
            <div class = "positions"> <!-- TODO: Testing overflow of sidebar (currently doesn't work)-->
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