<script>
    import { user, red_color, green_color, resetUser, sidebar_width_em, updateSize } from "../constants";

    // If user confirms their identity ==> set confirmed to true, show sidebar
    function handleConfirm () {
      user.update(state => ({...state, confirmed: true}));

      sidebar_width_em.set({
          display: "block",
          width: $sidebar_width_em.width
        });
      updateSize();
    }

</script>
<center>
    <div class = "prompt">
      Is this information correct?
      <br style=
      "line-height:40px">
      <br> NAME: <b>{$user.name}</b> 
      <br>EMAIL: <b>{$user.email}</b> 
      <br> GRADE: <b>{$user.grade}</b> <br><br>
      
      <button style = "background-color: {red_color};" on:click = {() => {resetUser();}}>No</button>
      <button style = "background-color: {green_color};" on:click = {handleConfirm}>Yes</button>
    </div>
</center>