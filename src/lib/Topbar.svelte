<!--START: 11;42 PM, 4/14/23, just winging it :)-->

<script>
    import { yellow_color } from './colors.js';
    export let userTopBar;
    $: text = () => {
        if (userTopBar.confirmed) {
            return userTopBar.name;
        } else {
            return "Login";
        }
    };

</script>

<style>
    #box {
        width: inherit;
        height: 4em;
        background-color: black;
        position: relative;
        text-align: right;
        
        outline-width: 0.5em;
        outline-style: solid;
        padding: 2em 2em 0em 2em;
    }
</style>

<div style = "outline-color: {yellow_color};" id = "box">
    <div style = "color: {yellow_color}" id = "name">
        {text()}
    </div>
</div>