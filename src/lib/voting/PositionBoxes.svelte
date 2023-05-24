<script>
    import Subtitle from "../General/Subtitle.svelte";
    import CandidateInfoBox from "./CandidateInfoBox.svelte";

    export let position;

    //https://drive.google.com/file/d/1o8AXRH9J30o1FgTUJHkh1wj_mAkvF2uJ/view?usp=sharing
</script>
<div id = {position}></div>

<Subtitle text = {position} />
<CandidateInfoBox candidate ={{name: "Julia Kolotev",
video: "https://www.youtube.com/embed/IA9lteWEQ44",
platform:["Loves dogs, will eat carrots all day, lane 7", 
    "hot dog diggity dog dig dork dorg dorm doo", 
    "i can do this all dayyyyyyyyyyyyy back it up back it up"]
}}/>
