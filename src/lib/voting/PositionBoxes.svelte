<script>
    import { getDoc, doc } from "firebase/firestore";
    import Subtitle from "../General/Subtitle.svelte";
    import CandidateInfoBox from "./CandidateInfoBox.svelte";
    import { user, db } from "../constants";

    export let position; // Position retrieving data from (ex. President, VP)

    /* ----------- RETRIEVING INFORMATION FROM FIRESTORE ----------- */
    // Retrieving: description, each candidate's information
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
    
        return {
            description: resInfo.description,
            candidates: candidates
            // FORMAT for "candidates": [name, platform, video]
        };
    }

    // Change highlighted sidebar box when scrolling past a position
    window.addEventListener("scroll", function() {
        let elementTarget = document.getElementById(position);
        if (elementTarget != null && window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight-20)) {
            user.update(state => ({...state, 
                officerOn: position}));
        }
    })

</script>

<div id = {position}></div> <!-- For sidebar to jump to -->

<br><br><br>
<Subtitle text = {position} />
{#await electionInfo}
    <p> Processing...</p> <!-- Waiting for firestore to retrieve data -->
{:then electionInfo}
    <div class = "center-parent-container"><p class = "prompt" style = "max-width: 800px; width: 75%;">{electionInfo.description}</p></div> <!-- Description -->
    <!-- Show candidates for that position -->
    {#each electionInfo.candidates as candidateInfo, i}
        <CandidateInfoBox candPosition = {position} candidate = {{
            name: candidateInfo[0],
            platform: candidateInfo[1], 
            video: candidateInfo[2]
            }} /><br>
    {/each}
{/await}
