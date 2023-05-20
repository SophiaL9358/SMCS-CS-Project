<!--START: 11;42 PM, 4/14/23, just winging it :)-->

<script>
    import { yellow_color, outline_style, user, resetUser } from '../constants.js';

    // Setting "Login" text
    $: text = () => {
        if ($user.confirmed) {
            return $user.name;
        } else {
            return "Login";
        }
    };

    let sign_out_button;
    $: if ($user.loggedIn && sign_out_button != undefined){
        sign_out_button.style.display = "initial";
    } else if (sign_out_button != undefined) {
        sign_out_button.style.display = "none";
    }


</script>
<div style = {outline_style} id = "box"> <!-- Topbar -->
    <div id = "content">
        <!-- Sign out button-->
        <button on:click={resetUser} class = "child" bind:this = {sign_out_button} style = "background-color: {yellow_color}">Sign Out</button>
        <!-- Login/Username -->
        <div class = "child" style = "color: {yellow_color}"> 
            {text()}
        </div>
    </div>
</div>


<style>
    button.child {
        margin-right: 1em;
        height: 2em;
        display: none;
    }
    .child {
        display: inline-block;
    }
    #content {
        margin-right: 2em;
    }
    #box {
        position: fixed;
        top: 0;
        width: 100%; 
        height: 3em;
        background-color: black;
        
        text-align: right;
        
        outline-style: solid;
        padding: 1.5em 0em 0em 0em;
        margin-bottom: 3em;
    }
    
</style>