<script>
    import { yellow_color, outline_width_em, outline_style } from './colors.js';
</script>

<style>
    #sidebar {
        position: fixed;
        width: 15em;
        height: 100%;
        
        background-color: black;
    }
</style>

<!--
    - Outline is yellow
    - Top margin is offsetted by the width of the outline, so it's inlign with the topbar
-->
<div id = "sidebar" 
    style = "{outline_style} color: {yellow_color}; margin-top: {outline_width_em}em;">

    sdfsd
</div>