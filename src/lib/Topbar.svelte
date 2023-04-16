<!--START: 11;42 PM, 4/14/23, just winging it :)-->

<script>
    import { yellow_color, outline_style, user } from './constants';

    $: text = () => {
        if ($user.confirmed) {
            return $user.name;
        } else {
            return "Login";
        }
    };

</script>

<style>
    #box {
        position: sticky;
        top: 0;
        width: inherit;
        height: 4em;
        background-color: black;
        
        text-align: right;
        
        
        outline-style: solid;
        padding: 2em 2em 0em 2em;
    }
    
</style>

<div style = {outline_style} id = "box">
    <div style = "color: {yellow_color}" id = "name">
        {text()}
    </div>
</div>


