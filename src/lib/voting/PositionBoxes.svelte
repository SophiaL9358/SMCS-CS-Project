<script>
    import { getDoc, doc } from "firebase/firestore";
    import Subtitle from "../General/Subtitle.svelte";
    import CandidateInfoBox from "./CandidateInfoBox.svelte";
    import { user, db } from "../constants";

    export let position;

    //https://drive.google.com/file/d/1o8AXRH9J30o1FgTUJHkh1wj_mAkvF2uJ/view?usp=sharing
    var electionInfo;
    $: if (electionInfo == undefined && $user.confirmed){
        electionInfo = getElectionName();
    }
    async function getElectionName(){
        var collectionID = $user.elections[$user.pageOn];
        var resInfo =  (await getDoc(doc(db, collectionID + "/"+position+" Information"))).data();
        
        var candidates = [];
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
            // [name, platform, video]
        };
    }
</script>
<div id = {position}></div>

<Subtitle text = {position} />
{#await electionInfo}
    <p> Processing...</p>
{:then electionInfo}
    {#each electionInfo.candidates as candidateInfo, i}
        <CandidateInfoBox candidate = {{
            name: candidateInfo[0],
            platform: candidateInfo[1], 
            video: candidateInfo[2]}} />
        <br>
    {/each}
{/await}
