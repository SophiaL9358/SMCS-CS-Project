<script>
    import PositionBoxes from "./PositionBoxes.svelte";
    import { user, yellow_color } from "../constants.js";
    import Title from "../General/Title.svelte";

    let backButton = undefined;
    let nextButton = undefined;

    //Change color of the back/next buttons depending what page you're on
    $: if (nextButton != undefined && $user.pageOn == "Grade"){
        backButton.style.backgroundColor = "rgb(239,239,239)";
        nextButton.style.backgroundColor = yellow_color;
    } else if (nextButton != undefined){
        backButton.style.backgroundColor = yellow_color;
        nextButton.style.backgroundColor = yellow_color;

    }
</script>
<Title text = "Rising 10th Grade Voting" />

    <PositionBoxes position = "President" /><br>
    <PositionBoxes position = "Vice President" /><br>
    <PositionBoxes position = "Secretary" /><br>
    <PositionBoxes position = "Treasurer" /><br>

<button bind:this = {backButton}>Back</button>
<button bind:this = {nextButton}>Next</button>

<br><br><br><br>
