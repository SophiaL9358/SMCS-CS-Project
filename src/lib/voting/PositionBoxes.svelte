<script>
    import Subtitle from "../General/Subtitle.svelte";
    import CandidateInfoBox from "./CandidateInfoBox.svelte";

    export let position;
    let givenCand =  {name: "Julia Kolotev",
        video: "https://www.youtube.com/embed/IA9lteWEQ44",
        platform: "hi"
    };

    let introLink = "https://drive.google.com/uc?export=view&id=";

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
<CandidateInfoBox candidate ={{name: "Victoria Mo",
video: introLink+"1S-DRHJqIzDytKcbRrojaYbcMF3APvuNA",
platform:["the moes of the mosey mo most moey mose muse moo", 
    "boom boom boom boom boom boom boom boom boom boom boom boom boom", 
    "art bart"]
}}/> 

<CandidateInfoBox candidate ={{name: "Veronica Wang",
video: introLink+"1o8AXRH9J30o1FgTUJHkh1wj_mAkvF2uJ",
platform:["weef wof woooaf fwaf wofow waoofwoafwoefwjeowfwfo wfwoajfowjfa", 
    "ap art omg? !E?!@#@!$ 48ufdksljsf", 
    "south sudan is such a good country def go there lol ehehhehe"]
}}/>
