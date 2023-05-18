<script>
    import StudentVue from 'studentvue';
    import { user } from './constants';

    let idInput;
    let passwordInput;
    let warning = "";
    const DISTRICT_URL = "https://md-mcps-psv.edupoint.com/PXP2_Login.aspx";
    async function handleClick(){
        try {
            let response = await StudentVue.login(DISTRICT_URL, { username: idInput.value, password: passwordInput.value });
            console.log("user exists!");
            

            user.update(state => ({...state, 
                email: idInput.value + "@mcpsmd.net",
                name: response.studentInfo().then.name,
                loggedIn: true,
                grade: 2025 // TODO: Assigns grade based on database
            }));
            idInput.value = "";
            passwordInput.value = "";
        } catch {
            console.log("user doesn't exist!");
            warning = "Username or Password is incorrect!";
        }
    }
</script>

ID: <input type = "text" bind:this = {idInput}> <br>
Password: <input type = "password" bind:this = {passwordInput}>
<br> <br>
<button on:click = {handleClick}>Submit</button>
<p>{warning}</p>