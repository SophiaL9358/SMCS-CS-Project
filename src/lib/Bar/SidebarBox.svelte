<script>
    import { yellow_color, outline_width_em, outline_style, sidebar_width_em, user } from '../constants.js';
    export let position = "NONE";
    export let candidate = "No Candidate Chosen";

    // Set color of the sidebar boxes
    let box;
    $: if (box && $user.officerOn == position){
        box.style.backgroundColor = yellow_color;
        box.style.color = "black";
    } else if (box) {
        box.style.backgroundColor = "rgb(60, 60, 60)";
        box.style.color = "white";
    }

    // When clicking on a box
    function handleClick (){
        user.update(state => ({...state, officerOn: position}));
    }
</script>

<a href = "#{position}" on:click = {handleClick} style = "text-decoration: none;">
<div bind:this = {box} class = "parent_container" 
    style = "{outline_style} margin-top: {outline_width_em}em; width: {$sidebar_width_em.width}em;">
    <div> <!-- Position -->
        {position}
    </div> 
    <div style = "margin-top: 0.5em;"> <!-- Candidate chosen  -->
        <i style = "font-size: 0.9em;">{candidate}</i>
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