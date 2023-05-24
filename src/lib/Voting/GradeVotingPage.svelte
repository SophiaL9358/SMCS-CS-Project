<script>
    import PositionBoxes from "./PositionBoxes.svelte";
    import { db, user, yellow_color } from "../constants.js";
    import Title from "../General/Title.svelte";
    import {Firestore, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";

    let backButton = undefined;
    let nextButton = undefined;

    var electionInfo;
    
    $: if (electionInfo == undefined && $user.confirmed){
        electionInfo = getElectionName();
    }
    async function getElectionName(){
        var collectionID = $user.elections[$user.pageOn];
        var res =  (await getDoc(doc(db, collectionID + "/All Positions"))).data();

        return {
            electionName: res.electionName,
            positions: res.positions,
            count: res.count
        };
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
