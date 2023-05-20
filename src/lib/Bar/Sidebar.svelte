<script>
    import { yellow_color, outline_width_em, outline_style, sidebar_width_em } from '../constants.js';
    import SidebarBox from './SidebarBox.svelte';
    export let title = "Some voting";
</script>

<div id = "sidebar" 
    style = "{outline_style} color: {yellow_color}; margin-top: {outline_width_em}em; width: {$sidebar_width_em.width}em; display: {$sidebar_width_em.display};">
    <div style = "margin-bottom: 3em;">
        {title}
    </div>
    <div id = "scroll_container">
    <div class = "positions"> <!-- TODO: Testing overflow of sidebar (currently doesn't work)-->
        <SidebarBox position = "President" />
        <SidebarBox position = "Vice President" />
        <SidebarBox position = "Secretary" />
        <SidebarBox position = "Treasurer" />
        <SidebarBox position = "Treasurer" />
        <SidebarBox position = "Treasurer" />
        <SidebarBox position = "Treasurer" />
       <SidebarBox position = "MCR Representative" />
        
    </div>
</div>
</div>

<style>
    #sidebar {
        position: fixed;
        padding-top: 1em;
        height: 100%;
        background-color: black;
        
    }
    #scroll_container {
        position: relative;
        height: inherit;
        height: 70%;
        overflow-y: scroll;
        overflow-x:hidden;
    }
    .positions { /* mostly for debugging*/
        background-color: black;
    }
    #scroll_container::-webkit-scrollbar{
    display: none;
  }
</style>