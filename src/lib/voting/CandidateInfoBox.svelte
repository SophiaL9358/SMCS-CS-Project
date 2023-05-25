<script>
    import { doc, getDoc } from "firebase/firestore";
    import { user, db, candidate_selections } from "../constants";

    let button; 

    export let candidate; // Candidate information
    export let candPosition; // ex. Pres, VP
    $: collectionID = $user.elections[$user.pageOn];
    $: index = candidate_selections[collectionID].positions.indexOf(candPosition);
    $: if (button != undefined && candidate_selections[collectionID].chosen_candidates[index].indexOf(candidate.name) != -1){
        button.innerHTML = "VOTED!";
    } else if (button != undefined) {
        button.innerHTML = "Click here to vote!";
    }
    async function handleVoteClick(){
        console.log(candidate_selections);
        if (candidate_selections[collectionID].chosen_candidates[index].indexOf(candidate.name) != -1){
            // if candidate was voted for
            console.log("option 1");
            candidate_selections[collectionID].chosen_candidates[index].pop(candidate.name);
            candidate_selections[collectionID].chosen_candidates[index][1] += 1;
        }
        else if (candidate_selections[collectionID].chosen_candidates[index][1] != 0){// checks num selections left
            // if selections still there
            console.log("option 2");
            candidate_selections[collectionID].chosen_candidates[index].push(candidate.name);
            candidate_selections[collectionID].chosen_candidates[index][1] -= 1;
        } else {
            // if selections are not there
            console.log("option 3");
            candidate_selections[collectionID].chosen_candidates[index].splice(2, 1);
            candidate_selections[collectionID].chosen_candidates[index].push(candidate.name);
        } 
        console.log(candidate_selections);
        /*
        STEPS:
        1. Check if they've already voted on ==> remove them from list, update button
        2. Check if there's enough selections left
            - If none ==> remove first person from the list, add in new person 
            - If space ==> Add person
        3. Update button
        */

    }
</script>

<div class = "parent_container">
    <div id = "box">
        <!-- Candidate name -->
        <h3 style = "display: inline-block;">{candidate.name}</h3> 

        <!-- Vote button -->
        <button bind:this = {button} on:click = {handleVoteClick} style = "float: right; display: inline-block;">Click here to Vote!</button>
        
        <!-- Content -->
        <div id = "content">
            <!-- Video -->
            <iframe title = "Candidate Video"
                src="{candidate.video}" id = "video" allowfullscreen/>
            
            <!-- Platform -->
            <div id = "platform"> 
                <p>1. {candidate.platform[0]}</p>
                <p>2. {candidate.platform[1]}</p>
                <p>3. {candidate.platform[2]}</p>
                
            </div>
        </div>
    </div>
</div>
<br><br>

<style>
    #content {
        width: 100%;
        display: flex;
        justify-content: left;
    }
    #box iframe {
        min-width: 60%;
        min-height: 300px;
        top: 0;
        left: 0;
        float: left;

        margin-right: 1.5em;
        margin-bottom: 2em;

    }
    @media screen and (max-width: 800px) {
        #box iframe {
        min-width: 100%;

        }
        #content {
            display:block;
            
        }
   }
    #platform {
        width: inherit;
    }
    #box {
        text-align: left;
        width: 75%;
        background-color: white;
        padding: 1em 2em 2em 2em;
        max-width: 800px;
    }
    .parent_container {
        display: flex;
        width: 100%;
        justify-content: center;
    }
</style>