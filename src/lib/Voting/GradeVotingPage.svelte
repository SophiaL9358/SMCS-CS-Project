<script>
    import PositionBoxes from "./PositionBoxes.svelte";
    import { db, user, yellow_color } from "../constants.js";
    import Title from "../General/Title.svelte";
    import {Firestore, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
    let backButton = undefined;
    let nextButton = undefined;

    $: if (backButton != undefined && $user.pageOn == 0){
        backButton.style.display = "none";
    } else if (backButton != undefined) {
        backButton.style.display = "initial";
    }
    $: if (nextButton != undefined && $user.elections.length == $user.pageOn){
        nextButton.style.display = "none";
    } else if (backButton != undefined) {
        nextButton.style.display = "initial";
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
        {#each electionInfo.positions as officerPos, i}
            <PositionBoxes position = {officerPos}/> <br>
        {/each}
    {/await}
{:else}
hi
{/if}


<button bind:this = {backButton} on:click = {handleBackButtonClick}>Back</button>
<button bind:this = {nextButton} on:click = {handleNextButtonClick}>Next</button>

<br><br><br><br>
