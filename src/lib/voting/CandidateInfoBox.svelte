<script>
    import { user, db, candidate_selections, button_change, green_color } from "../constants";

    let button; // Vote button
    let index; // Index holding what position the candidate is running for
    let box; // Candidate box

    export let candidate; // Candidate information
    export let candPosition; // ex. Pres, VP

    $: collectionID = $user.elections[$user.pageOn]; // The key for the election's arrays
    $: index = candidate_selections[collectionID].positions.indexOf(candPosition); // Index for the position's position

    $: if (button != undefined && $button_change.change >=0 ){ // Any button clicked in position => Changes text of buttons
        if (candidate_selections[collectionID].chosen_candidates[index].indexOf(candidate.name) != -1){
            button.innerHTML = "VOTED!";
            button.style.backgroundColor = green_color;
            box.style.backgroundColor = "rgb(101, 255, 144, 0.8)";
        } else {
            button.innerHTML = "Click anywhere to vote!";
            button.style.backgroundColor = "initial";
            box.style.backgroundColor = "white";
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
<div class = "center-parent-container">
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id = "box" bind:this = {box} on:click = {handleVoteClick}>
    <!-- Candidate name -->
    <h3 style = "display: inline-block;">{candidate.name}</h3> 
    <h4 style = "display: inline-block;">(Running for:  {candPosition})</h4>

    <!-- Vote button -->
    <button bind:this = {button} style = "float: right; display: inline-block; width: 10em;">Click Anywhere to Vote!</button>
    

    <!-- Content -->
    <div id = "content">
        <!-- Video -->
        <div id = "videoParentContainer">
            <div id = "videoWrapper">
                <iframe title = "Candidate Video"
                    src="{candidate.video}" allowfullscreen/>
            </div>
        </div>
        
        <!-- Platform -->
        <div id = "platform"> 
            {#each candidate.platform as platform, i}
            <p>{i+1}. {platform}</p>
            {/each}
            
        </div>
    </div>
</div>
</div>
<br><br>

<style>
    #box {
        text-align: left;
        width: 75%;
        background-color: white;
        padding: 1em 2em 2em 2em;
        max-width: 800px;
        transition: 0.25s;
    }
    #box:hover {
        cursor: pointer;
    }

    
    #content {
        display: flex;
        overflow-wrap: break-word;

        width: 100%;
    }
    #videoParentContainer{ 
        width: 60%;
    }
    #videoWrapper {
        position: relative;
        
        height: 0;
        padding-bottom: 56.25%;
        margin-right: 1.5em;
        margin-bottom: 2em;
    }
    #videoWrapper iframe {
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;

        

    }
    @media screen and (max-width: 900px) {
        #videoParentContainer{
            width: 100%;

        }
        #content {
            display:block;
            
        }
        #platform {
            width: 100% !important; 
            display:block;
        }
   }
    #platform {
        display: inline-block;
        width: 35%;
    }
    
</style>