<script>
    import { user, db, candidate_selections, button_change, green_color } from "../constants";

    let button; // Vote button
    let index; // Index holding what position the candidate is running for

    export let candidate; // Candidate information
    export let candPosition; // ex. Pres, VP

    $: collectionID = $user.elections[$user.pageOn]; // The key for the election's arrays
    $: index = candidate_selections[collectionID].positions.indexOf(candPosition); // Index for the position's position

    $: if (button != undefined && $button_change.change >=0 ){ // Any button clicked in position => Changes text of buttons
        if (candidate_selections[collectionID].chosen_candidates[index].indexOf(candidate.name) != -1){
            button.innerHTML = "VOTED!";
            button.style.backgroundColor = green_color;
        } else {
            button.innerHTML = "Click here to vote!";
            button.style.backgroundColor = "initial";
        }
        
    } 

    async function handleVoteClick(){
        /* STEPS:
        1. Check if they've already voted on ==> remove them from list, update button
        2. Check if there's enough selections left
            - If none ==> remove first person from the list, add in new person 
            - If space ==> Add person
        3. Update button
        */

        if (candidate_selections[collectionID].chosen_candidates[index].indexOf(candidate.name) != -1){
            // if candidate was voted for already ==> remove them
            var tempIndex = candidate_selections[collectionID].chosen_candidates[index].indexOf(candidate.name);
            candidate_selections[collectionID].chosen_candidates[index].splice(tempIndex, 1);
            candidate_selections[collectionID].chosen_candidates[index][1] += 1;
        }
        else if (candidate_selections[collectionID].chosen_candidates[index][1] != 0){// checks num selections left
            // if selections are still open ==> add person
            candidate_selections[collectionID].chosen_candidates[index].push(candidate.name);
            candidate_selections[collectionID].chosen_candidates[index][1] -= 1;
        } else {
            // if there are no more selections left ==> remove person, add new person 
            candidate_selections[collectionID].chosen_candidates[index].splice(2, 1);
            candidate_selections[collectionID].chosen_candidates[index].push(candidate.name);
        } 
        
        // DEBUG: console.log(candidate_selections[collectionID].chosen_candidates[index]);

        // Signify there's been a button click
        button_change.update(state => ({... state, change: ($button_change.change +=1)%10}));       

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