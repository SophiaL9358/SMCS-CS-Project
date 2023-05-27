<script>
    import { doc, getDoc, updateDoc } from "firebase/firestore";
    import { candidate_selections, db, green_color, resetUser, user  } from "../constants";

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
            if (i > posInfoList.length-1){
                // someone missing
                people.push("<b class = 'red'>NONE</b>")
            } else {
                // someone chosen
                people.push("<b>" + posInfoList[i]+"</b>");
            }
        }
        res += people.join(", ");

        return res;
    }

    async function submitVote(){
        if (confirm("Are you sure you want to submit your vote? \nYou cannot change your vote after you submit!")){
            resetUser();
        } else {
            // i = election #
            // j = officer position #
            // k = cand position #
            for (let i = 0; i < $user.elections.length; i ++){ // loop through elections (ie. junior, WS)
                let collectionID = $user.elections[i];
                let positionsAvailable = candidate_selections[collectionID].positions;
                let user_selections = candidate_selections[collectionID].chosen_candidates;
                for (let j = 0; j <positionsAvailable.length; j ++){ // loop through officer positions (ie. pres, vp)
                    let officerPosition = positionsAvailable[j]; // position (ie. pres, vp)

                    let fbPosResponse = (await getDoc(doc(db, collectionID + "/"+officerPosition + " Information"))).data();
                    let allCandidates = fbPosResponse.allCandidates;

                    for (let k = 2; k < user_selections[j].length; k ++){ // loop through candidates selected
                        let candIndex = allCandidates.indexOf(user_selections[j][k])+1;
                        
                        let fbCandResponse = (await getDoc(doc(db, collectionID + "/"+officerPosition + " "+candIndex))).data()
                        let candVotes = fbCandResponse.votes;

                        await updateDoc(doc(db, collectionID, ""+officerPosition+" "+candIndex), {
                            votes: candVotes+1
                        });
                        console.log(user_selections[j][k] + " || "+officerPosition+ " "+candIndex + " "+ candVotes + " || "+ collectionID);
                    }

                }
            }
            /*
            $user.elections.forEach(collectionID => { 
                candidate_selections[collectionID].positions.forEach(officerPosition =>{ 
                    let fbPosResponse = (await getDoc(doc(db, collectionID + "/"+officerPosition + " Information"))).data();
                    let candIndex = 
                    console.log(officerPosition);
                });
            });*/
        }
        
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
    <button style = "background-color: {green_color};" on:click = {submitVote}>Submit</button>
</div></center>