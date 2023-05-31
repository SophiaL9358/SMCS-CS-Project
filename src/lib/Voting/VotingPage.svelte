<script>
    import PositionBoxes from "./PositionBoxes.svelte";
    import { db, green_color, user, yellow_color } from "../constants.js";
    import Title from "../General/Title.svelte";
    import {Firestore, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
    import SubmissionPage from "./SubmissionPage.svelte";
    

    /* ----------- CHANGING VISIBILITY OF BUTTONS ----------- */
    let topBackButton = undefined;
    let topNextButton = undefined;
    let botBackButton = undefined;
    let botNextButton = undefined;

    // Back button
    $: if (topBackButton != undefined && $user.pageOn == 0){
        topBackButton.style.display = "none";
        botBackButton.style.display = "none";
    } else if (topBackButton != undefined) {
        topBackButton.style.display = "initial";
        botBackButton.style.display = "initial";
    }

    // Next button
    $: if (topNextButton != undefined && $user.elections.length == $user.pageOn){
        topNextButton.style.display = "none";
        botNextButton.style.display = "none";
    } else if (topNextButton != undefined) {
        topNextButton.style.display = "initial";
        botNextButton.style.display = "initial";
    }
    
    /* ----------- HANDLING BUTTON CLICKS ----------- */
    function handleBackButtonClick() { // Move a page back
        user.update(state => ({...state, 
            pageOn: $user.pageOn-1,
            officerOn: "President"
        }));
        electionInfo = getElectionName(); // Reupdate candidates

    }

    function handleNextButtonClick() { // Move a page forward
        user.update(state => ({...state, 
            pageOn: $user.pageOn+1,
            officerOn: "President"
        }));
        electionInfo = getElectionName(); // Reupdate candidates
        
    }


    /* ----------- RETRIEVING FROM FIRESTORE ----------- */
    var electionInfo;
    
    $: if (electionInfo == undefined && $user.confirmed){ // First time user is on the page
        electionInfo = getElectionName();
    }

    // Retrieve data and put onto the variable 'electionInfo'
    async function getElectionName(){ 
        var collectionID = $user.elections[$user.pageOn];

        var res =  (await getDoc(doc(db, collectionID + "/All Positions"))).data();
        if (res == undefined){
            return; // If there's no more pages, return nothing
        }
        return {
            electionName: res.electionName,
            positions: res.positions,
            count: res.count
        };
    }
</script>

<!------------- If user is on a VOTING page ------------->
{#if $user != undefined && $user.elections != undefined && $user.elections.length > $user.pageOn} 
    {#await electionInfo}
        <p> Processing...</p> <!-- Waiting for firestore to retrieve data -->
    {:then electionInfo}
        <Title text = "{electionInfo.electionName} Election" />
        <div class = "center-parent-container">
            <div class = "prompt" style = "max-width: 800px; width: 75%;">
                <b>Directions: </b> <b>Click <i>anywhere</i> on the box enclosing the candidate's information 
                to vote for them!</b> Use the sidebar to jump between officer positions. When you vote for a 
                candidate, their name will appear on the left sidebar. Use the Back/Next to move between 
                different elections and the submission screen. Submit your vote once you're done!
            </div>
        </div>
        <br>

        <!-- Top buttons -->
        <button bind:this = {topBackButton} on:click = {handleBackButtonClick}>Back</button>
        <button bind:this = {topNextButton} on:click = {handleNextButtonClick}>Next</button>

        <!-- Creates the position sections -->
        {#each electionInfo.positions as officerPos, i}
            <PositionBoxes position = {officerPos}/> <br>
        {/each}

    {/await}
{:else}
<!------------- If user is on a SUBMISSION page ------------->
    <br>
    <SubmissionPage />
    <br>
{/if}


<button bind:this = {botBackButton} on:click = {handleBackButtonClick}>Back</button>
<button bind:this = {botNextButton} on:click = {handleNextButtonClick}>Next</button>

<br><br><br><br> <!-- Add some space at the bottom -->
