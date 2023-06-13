<script>
    import Subtitle from "../General/Subtitle.svelte";
    import Title from "../General/Title.svelte";
    import { yellow_color } from "../constants";

    let candInfoSpreadsheet = "https://docs.google.com/spreadsheets/d/1n62RDuz4ddzefPnkrA03yJbHoyzPeo736MujYRzn5PE/edit?usp=sharing";
    let studentIDSpreadsheet = "https://docs.google.com/spreadsheets/d/1gU2yU-G0Vu2QjCCwynXRfvxb9odYHs3D0BDJK0ghvlw/edit?usp=sharing";
    let resultsSpreadsheet = "https://docs.google.com/spreadsheets/d/1B9mjfFI7S1yN7uMV5YzFY6XDjJkeIuAIvs3KrsfpGgc/edit?usp=sharing";

    let userManualLink = "https://docs.google.com/document/d/1higu3bFyiL-zupbZ2GMUrQLWnYZ7qhcF4z8llUhEts0/edit?usp=sharing";
</script>
<Subtitle text = "Google Sheet Links" />
<a href = {candInfoSpreadsheet} target = "_blank"><button>Candidate Info Sheet</button></a>
<a href = {studentIDSpreadsheet} target = "_blank"><button>Student ID Sheet</button></a>
<a href = {resultsSpreadsheet} target = "_blank"><button>Voting Results Sheet</button></a>

<br><br><br>
<Subtitle text = "User Manual" />
<a href = {userManualLink} target = "_blank"><button style = "background-color: {yellow_color};">User Manual Doc</button></a>


<style>
    button {
        width: 14em;
        height: 4em;
        background-color: rgb(132, 243, 163);
    }
</style>