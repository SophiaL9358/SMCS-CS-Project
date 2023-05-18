<script>
    import StudentVue from 'studentvue';
    import { user } from './constants';

    let idInput;
    let passwordInput;
    const DISTRICT_URL = "https://md-mcps-psv.edupoint.com/PXP2_Login.aspx";
    async function handleClick(){
        try {
            let response = await StudentVue.login(DISTRICT_URL, { username: idInput.value, password: passwordInput.value });
            console.log("user exists!");
            idInput.value = "";
            passwordInput.value = "";
        } catch {
            console.log("user doesn't exist!");
        }
    }
</script>

ID: <input type = "text" bind:this = {idInput}> <br>
Password: <input type = "password" bind:this = {passwordInput}>
<br> <br>
<button on:click = {handleClick}>Submit</button>