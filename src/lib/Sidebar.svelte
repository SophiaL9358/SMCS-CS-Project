<script>
    import { yellow_color, outline_width_em, outline_style, sidebar_width_em } from './constants';
</script>


<!--
    - Outline is yellow
    - Top margin is offsetted by the width of the outline, so it's inlign with the topbar
-->
<div id = "sidebar" 
    style = "{outline_style} color: {yellow_color}; margin-top: {outline_width_em}em; width: {$sidebar_width_em.width}em; display: {$sidebar_width_em.display};">

    sdfsd
</div>

<style>
    #sidebar {
        position: fixed;
        height: 100%;
        
        background-color: black;
    }
</style>