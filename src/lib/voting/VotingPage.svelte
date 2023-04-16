<script>
    import PositionBoxes from "./PositionBoxes.svelte";
    import { user } from "../constants";
    import Title from "../General/Title.svelte";

    export let grade;

    function determineTitle () {
        if (grade == "Whole School") {
            return "Whole School";
        } else {
            return "Class of " + grade;
        }
    }

</script>
<Title text = {determineTitle()} />

    <PositionBoxes position = "President" /><br>
    <PositionBoxes position = "Vice President" /><br>
    <PositionBoxes position = "Secretary" /><br>
    <PositionBoxes position = "Treasury" /><br>

