<script>
    import PositionBoxes from "./PositionBoxes.svelte";
    import { db, user, yellow_color } from "../constants.js";
    import Title from "../General/Title.svelte";
    import {Firestore, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
    
    let topBackButton = undefined;
    let topNextButton = undefined;
    let botBackButton = undefined;
    let botNextButton = undefined;

    $: if (topBackButton != undefined && $user.pageOn == 0){
        topBackButton.style.display = "none";
        botBackButton.style.display = "none";
    } else if (topBackButton != undefined) {
        topBackButton.style.display = "initial";
        botBackButton.style.display = "initial";
    }
    $: if (topNextButton != undefined && $user.elections.length == $user.pageOn){
        topNextButton.style.display = "none";
        botNextButton.style.display = "none";
    } else if (topNextButton != undefined) {
        topNextButton.style.display = "initial";
        botNextButton.style.display = "initial";
    }
    

    function handleBackButtonClick() {
        user.update(state => ({...state, 
            pageOn: $user.pageOn-1 
        }));
        console.log("user" + " " + $user.pageOn);
        electionInfo = getElectionName();
    }


    function handleNextButtonClick() {
        user.update(state => ({...state, 
            pageOn: $user.pageOn+1 
        }));
        console.log("user" + " " + $user.pageOn);
        electionInfo = getElectionName();
    }

    var electionInfo;
    
    $: if (electionInfo == undefined && $user.confirmed){
        electionInfo = getElectionName();
    }

    async function getElectionName(){
        var collectionID = $user.elections[$user.pageOn];
        var res =  (await getDoc(doc(db, collectionID + "/All Positions"))).data();
        if (res == undefined){
            return;
        }
        return {
            electionName: res.electionName,
            positions: res.positions,
            count: res.count
        };
    }
</script>
<!-- Title! -->
{#if $user.elections.length > $user.pageOn}
    {#await electionInfo}
        <p> Processing...</p>
    {:then electionInfo}
        <Title text = "{electionInfo.electionName} Election" />
        <button bind:this = {topBackButton} on:click = {handleBackButtonClick}>Back</button>
        <button bind:this = {topNextButton} on:click = {handleNextButtonClick}>Next</button>
        {#each electionInfo.positions as officerPos, i}
            <PositionBoxes position = {officerPos}/> <br>
        {/each}
    {/await}
{:else}
hi
{/if}


<button bind:this = {botBackButton} on:click = {handleBackButtonClick}>Back</button>
<button bind:this = {botNextButton} on:click = {handleNextButtonClick}>Next</button>

<br><br><br><br>
