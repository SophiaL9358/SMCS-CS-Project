<script>
    import { candidate_selections, green_color, user  } from "../constants";

    /*
        ["rising junior": {
                name: "ksdklsdlk election",
                positions: ["Pres", "VP", "owo"],
                Pres: [p1],
                VP: [p1, p2],
                Treasurer: [p1]
            }
            
        ]

        for elections {
            for positions {
                for the people list {
                    do that
                }
            }
        }
    */
    function getCandidates (posInfoList){
        let numSelections = posInfoList.length - 2 +posInfoList[1];
        let res = posInfoList[0]+ " ("+numSelections+"): ";
        let people = [];
        for (let i = 2; i < posInfoList.length + posInfoList[1]; i ++){
            console.log("hi");
            if (i > posInfoList.length-1){
                console.log("option 1");
                // someone missing
                people.push("<b class = 'red'>NONE</b>")
            } else {
                // someone chosen
                console.log("option 3");
                people.push("<b>" + posInfoList[i]+"</b>");
            }
        }
        res += people.join(", ");
        console.log(res);

        return res;
    }
</script>

<center><div class = "prompt">
    <b><i>Submission Page</i></b>
    <br>
    You have voted for:<br>
    {#each $user.elections as election}
        <br>
        <b>{election}</b>
        {#each candidate_selections[election].chosen_candidates as posInfoList}
            <p style = "margin: 0.2em;">{@html getCandidates(posInfoList)}</p>
        {/each}
    {/each}
    <!--
    <div style = "float: left; text-align: left; margin: 0.5em 1em 1em 1em; width:100%;">
        President: Peppa Pig<br>
        Vice President: Peppa Dad, Peppa Mom<br>
        Secretary: Queencard<br>
        Treasurer: Mr. Plank<br>
        MCR Representative: ME<br>
    </div>

    <br><br>
    <b>Whole School Election</b>
    <div style = "float: left; text-align: left; margin: 0.5em 1em 1em 1em; width:100%;">
        President .......................................... Peppa Pig<br>
        Vice President .............. Peppa Dad, Peppa Mom<br>
        Secretary ............................................. <b class = "red">NONE</b><br>
        Treasurer: Mr. Plank<br>
        MCR Representative: ME<br>
    </div>
-->
    <!-- SUBMISSION CONSTANT STUFF -->
    <p class = "red">Once you submit, you cannot edit your vote!</p>
    <button style = "background-color: {green_color};">Submit</button>
</div></center>