<!--START: 11;42 PM, 4/14/23, just winging it :)-->

<script>
    import { yellow_color, outline_style, user } from './constants';

    // Setting "Login" text
    $: text = () => {
        if ($user.confirmed) {
            return $user.name;
        } else {
            return "Login";
        }
    };

</script>

<div style = {outline_style} id = "box"> <!-- Topbar -->
    <div style = "color: {yellow_color}" id = "name"> <!-- Text -->
        {text()}
    </div>
</div>

<style>
    #box {
        position: sticky;
        top: 0;
        width: inherit;
        height: 3em;
        background-color: black;
        
        text-align: right;
        
        outline-style: solid;
        padding: 1.5em 2em 0em 2em;
    }
    
</style>