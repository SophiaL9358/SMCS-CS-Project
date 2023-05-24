<script>
    export let candidate = {
        name: "First Last",
        video: "https://drive.google.com/file/d/13R1MQjMNP0gJHvmVu4mwASH-jsqa3dVE/preview", // ensure this has preview!
        platform: ["Platform 1","Platform 2","Platform 3"]
    }

</script>
<div class = "parent_container">
    <div id = "box">
        <h3 style = "display: inline-block;">{candidate.name}</h3> 
        <button style = "float: right; display: inline-block;">Click here to Vote!</button>
        <div id = "content">
            <iframe title = "Candidate Video"
                src="{candidate.video}" id = "video"/>

            <div id = "platform"> 
                <p >{candidate.platform[0]}</p>
                <p >{candidate.platform[1]}</p>
                <p >{candidate.platform[2]}</p>
                
            </div>
        </div>
    </div>
</div>
<br><br>
<!--hi osaphia-->
<style>
    #content {
        width: 100%;
        display: flex;
        justify-content: left;
        /*align-items: center;*/
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