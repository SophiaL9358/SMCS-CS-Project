<script>
    import { getDoc, doc } from "firebase/firestore";
    import Subtitle from "../General/Subtitle.svelte";
    import CandidateInfoBox from "./CandidateInfoBox.svelte";
    import { user, db } from "../constants";

    export let position; // Position retrieving data from (ex. President, VP)

    /* ----------- RETRIEVING FROM FIRESTORE ----------- */
    var electionInfo;
    $: if (electionInfo == undefined && $user.confirmed){
        electionInfo = getElectionName();
    }

    // Retrieve data and put onto the variable 'electionInfo'
    async function getElectionName(){
        var collectionID = $user.elections[$user.pageOn];
        var resInfo =  (await getDoc(doc(db, collectionID + "/"+position+" Information"))).data();
        
        var candidates = []; // Each array inside of this array is one candidate
        for (var i = 0; i < resInfo.numCandidates; i++){
            var resCand = (await getDoc(doc(db, collectionID + "/"+position+" "+(i+1)))).data();
            candidates.push([resCand.name, resCand.platform, resCand.video]);
        }
        console.log(candidates);
    
        return {
            description: resInfo.description,
            numSelections: resInfo.numSelectionsAllowed,
            numCandidates: resInfo.numCandidates,
            candidates: candidates
            // FORMAT: [name, platform, video]
        };
    }
</script>

<div id = {position}></div> <!-- For sidebar to jump to -->

<Subtitle text = {position} />
{#await electionInfo}
    <p> Processing...</p> <!-- Waiting for firestore to retrieve data -->
{:then electionInfo}
    <!-- Show candidates for that position -->
    {#each electionInfo.candidates as candidateInfo, i}
        <CandidateInfoBox candidate = {{
            name: candidateInfo[0],
            platform: candidateInfo[1], 
            video: candidateInfo[2]}} /><br>
    {/each}

{/await}
