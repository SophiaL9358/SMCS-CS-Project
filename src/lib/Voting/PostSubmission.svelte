<script>
    import { user, green_color, resetUser} from "../constants";



</script>
<div class = "center-parent-container">
    <div class = "prompt" style = "border-radius:25px;"> 
      Your vote has been recorded.
      <br style = "line-height:40px;"> 
      Thank you for voting! 
      <br>
      <button style = "background-color: {green_color};" on:click = {() => {resetUser();}}>Sign out</button>
    </div>
  </div>