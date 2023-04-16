<script>
    import Subtitle from "../General/Subtitle.svelte";
    import CandidateInfoBox from "./CandidateInfoBox.svelte";

    export let position;
    let givenCand =  {name: "Julia Koltev",
        video: "https://drive.google.com/file/d/13R1MQjMNP0gJHvmVu4mwASH-jsqa3dVE/view?usp=share_link",
        platform: "hi"
    };
</script>
<Subtitle text = {position} />
<CandidateInfoBox candidate ={{name: "Julia Koltev",
video: "https://drive.google.com/file/d/13R1MQjMNP0gJHvmVu4mwASH-jsqa3dVE/view?usp=share_link",
platform: "hi"
}}/>
<CandidateInfoBox candidate ={{name: "Victoria Mo",
video: "https://drive.google.com/file/d/13R1MQjMNP0gJHvmVu4mwASH-jsqa3dVE/view?usp=share_link",
platform: "hi"
}}/>
<CandidateInfoBox candidate ={{name: "Veronica Wang",
video: "https://drive.google.com/file/d/13R1MQjMNP0gJHvmVu4mwASH-jsqa3dVE/view?usp=share_link",
platform: "hi"
}}/>

<br>