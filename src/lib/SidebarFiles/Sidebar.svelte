<script>
    import { yellow_color, outline_width_em, outline_style, sidebar_width_em } from '../constants';
    import SidebarBox from './SidebarBox.svelte';
    export let title = "Some voting";
</script>


<!--
    - Outline is yellow
    - Top margin is offsetted by the width of the outline, so it's inlign with the topbar
-->
<div id = "sidebar" 
    style = "{outline_style} color: {yellow_color}; margin-top: {outline_width_em}em; width: {$sidebar_width_em.width}em; display: {$sidebar_width_em.display};">
    {title}
    <div class = "positions">
        <SidebarBox position = "President" />
        <SidebarBox position = "Vice President" />
        <SidebarBox position = "Secretary" />
        <SidebarBox position = "Treasurer" />
        <SidebarBox position = "Treasurer" />
        <SidebarBox position = "Treasurer" />
        
       <!----><SidebarBox position = "MCR Representative" />
         <!---->
    </div>
</div>

<style>
    #sidebar {
        position: fixed;
        height: 100%;
        padding-top: 1em;
        
        background-color: black;
        overflow-y: scroll;
        overflow-x:hidden;
    }
    .positions {
        margin-top: 3em;
        height: inherit;
    }
    #sidebar::-webkit-scrollbar{
    display: none;
  }
</style>