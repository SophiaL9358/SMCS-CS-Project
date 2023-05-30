<script>
    import { yellow_color, outline_width_em, outline_style, sidebar_width_em, user, candidate_selections, button_change } from '../constants.js';
    export let position = "NONE";

    // Set color of the sidebar boxes
    let box;
    $: if (box && $user.officerOn == position){
        box.style.backgroundColor = yellow_color;
        //opacity is changed in Sidebar.svelte
        box.style.color = "black";
    } else if (box) {
        box.style.backgroundColor = "black";
        box.style.color = "white";
    }
    // lighter black color - rgb(60, 60, 60)

    // When clicking on a box
    let candidate_text = "Processing...";
    $: if ($user.confirmed && $button_change.change >=0){
        candidate_text = showCandidates();
    } 
    function handleClick (){
        user.update(state => ({...state, officerOn: position}));
    }

    function showCandidates(){
        let index = candidate_selections[$user.elections[$user.pageOn]].positions.indexOf(position);
        let posInfoList = candidate_selections[$user.elections[$user.pageOn]].chosen_candidates[index];
        if (posInfoList == undefined){
            return;
        }
        let res = [];
        for (let i = 2; i < posInfoList.length + posInfoList[1]; i ++){
            if (i >= posInfoList.length){
                res.push("No Candidate Chosen");
            } else {
                res.push(posInfoList[i]);
            }
        }

        return res.join("<br>");
    }
</script>

<a href = "#{position}" on:click = {handleClick} style = "text-decoration: none;">
<div bind:this = {box} class = "parent_container" 
    style = "{outline_style} margin-top: {outline_width_em}em; width: 100%;">
    <div> <!-- Position -->
        {position}
    </div> 
    <div style = "margin-top: 0.5em;"> <!-- Candidate chosen  -->
        <i style = "font-size: 0.9em;">
            {#if $user.confirmed}
                {@html candidate_text}
            {/if}
        </i>
    </div>
</div>
</a>
<style>

    .parent_container {
        padding: 1em 0em 1em 0em;
        color: white;
        display: block;
        width: 100%;
        justify-content: center;
        transition: 0.25s;
        

    }
    .parent_container:hover {
        color: black !important;
        background-color: rgba(255, 218, 26, 1) !important;
        cursor: pointer;
    }
</style>