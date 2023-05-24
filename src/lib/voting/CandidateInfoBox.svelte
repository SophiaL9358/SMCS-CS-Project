<script>
    export let candidate; // Candidate information
</script>

<div class = "parent_container">
    <div id = "box">
        <!-- Candidate name -->
        <h3 style = "display: inline-block;">{candidate.name}</h3> 

        <!-- Vote button -->
        <button style = "float: right; display: inline-block;">Click here to Vote!</button>
        
        <!-- Content -->
        <div id = "content">
            <!-- Video -->
            <iframe title = "Candidate Video"
                src="{candidate.video}" id = "video"/>
            
            <!-- Platform -->
            <div id = "platform"> 
                <p>1. {candidate.platform[0]}</p>
                <p>2. {candidate.platform[1]}</p>
                <p>3. {candidate.platform[2]}</p>
                
            </div>
        </div>
    </div>
</div>
<br><br>

<style>
    #content {
        width: 100%;
        display: flex;
        justify-content: left;
    }
    #box iframe {
        min-width: 60%;
        min-height: 300px;
        top: 0;
        left: 0;
        float: left;

        margin-right: 1.5em;
        margin-bottom: 2em;

    }
    @media screen and (max-width: 800px) {
        #box iframe {
        min-width: 100%;

        }
        #content {
            display:block;
            
        }
   }
    #platform {
        width: inherit;
    }
    #box {
        text-align: left;
        width: 75%;
        background-color: white;
        padding: 1em 2em 2em 2em;
        max-width: 800px;
    }
    .parent_container {
        display: flex;
        width: 100%;
        justify-content: center;
    }
</style>