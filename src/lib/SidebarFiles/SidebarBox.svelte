<script>
    import { yellow_color, outline_width_em, outline_style, sidebar_width_em } from '../constants';
    export let position = "NONE";
    export let candidate = "No Candidate Chosen";
</script>


<div class = "parent_container" 
    style = "{outline_style} margin-top: {outline_width_em}em; width: {$sidebar_width_em.width}em;">
    <div>
        {position}
    </div>
    <div style = "margin-top: 0.5em;">
        <i style = "font-size: 0.9em;">{candidate}</i>
    </div>
</div>

<style>

    .parent_container {
        padding: 1em 0em 1em 0em;
        color: white;
        display: block;
        width: 100%;
        justify-content: center;
        transition: 0.25s;

    }
    .parent_container:hover {
        color: black !important;
        background-color: rgba(255, 218, 26, 1);
    }
</style>