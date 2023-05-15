<script>
    export let candidate = {
        name: "First Last",
        video: "https://drive.google.com/file/d/13R1MQjMNP0gJHvmVu4mwASH-jsqa3dVE/preview", // ensure this has preview!
        platform: "Platform 1\nPlatform 2\nPlatform 3"
    }
</script>
<div class = "parent_container">
<div id = "box">
    <h3>{candidate.name}</h3> <br>
    <iframe title = "candidate video" src = "{candidate.video}" width = "100%"></iframe>
</div>
</div>
<br><br>
<!--hi osaphia-->
<style>
    #box {
        text-align: left;
        width: 60%;
        background-color: white;
        padding: 1em 2em 1em 2em;
    }
    .parent_container {
        display: flex;
        width: 100%;
        justify-content: center;
    }
</style>