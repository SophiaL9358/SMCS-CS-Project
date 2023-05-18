<script>
    import StudentVue from 'studentvue';
    import { user, sidebar_width_em, updateSize } from './constants';

    let idInput;
    let passwordInput;
    let warning = "";
    const DISTRICT_URL = "https://md-mcps-psv.edupoint.com/PXP2_Login.aspx";
    async function handleClick(){
        warning = "Processing...";
        try {
            let response = await StudentVue.login(DISTRICT_URL, { username: idInput.value, password: passwordInput.value });
            
            user.update(state => ({...state, 
                email: idInput.value + "@mcpsmd.net",
                name: idInput.value,
                loggedIn: true,
                confirmed: true, // TODO: Gets rid of confirmation page
                grade: 2025 // TODO: Assigns grade based on database
            }));
            idInput.value = "";
            passwordInput.value = "";
            response = null;

            // TODO: GET RID OF THIS IF PUTTING BACK CONFIRMATION PAGE:
            sidebar_width_em.set({
                display: "block",
                width: $sidebar_width_em.width
            });
            updateSize();
        } catch {
            warning = "Username or Password is incorrect!";
        }
    }
</script>

ID: <input type = "text" bind:this = {idInput}> <br>
Password: <input type = "password" bind:this = {passwordInput}>
<br> <br>
<button on:click = {handleClick}>Submit</button>
<p>{warning}</p>