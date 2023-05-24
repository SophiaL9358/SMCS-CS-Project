<script>
    import PositionBoxes from "./PositionBoxes.svelte";
    import { db, user, yellow_color } from "../constants.js";
    import Title from "../General/Title.svelte";
    import {Firestore, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";

    let backButton = undefined;
    let nextButton = undefined;

    //Change color of the back/next buttons depending what page you're on
    $: if (nextButton != undefined && $user.pageOn == "Grade"){
        backButton.style.backgroundColor = "rgb(239,239,239)";
        nextButton.style.backgroundColor = yellow_color;
    } else if (nextButton != undefined){
        backButton.style.backgroundColor = yellow_color;
        nextButton.style.backgroundColor = yellow_color;

    }
    var electionInfo;
    var gotInfo = false;
    $: if (!gotInfo && $user.confirmed){
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
        console.log(data);
        return data;
    }
</script>
<!-- Title! -->
{#await electionInfo}
    <p> Processing...</p>
{:then electionInfo}
    <Title text = "{electionInfo.electionName} Election" />
    {#each electionInfo.positions as officerPos, i}
        <PositionBoxes position = {officerPos}/> <br>
    {/each}
{/await}


<button bind:this = {backButton}>Back</button>
<button bind:this = {nextButton}>Next</button>

<br><br><br><br>
