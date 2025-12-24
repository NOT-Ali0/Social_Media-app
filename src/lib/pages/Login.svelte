<script>
    import axios from "axios";
    import { createEventDispatcher } from "svelte";
    import Button from "../components/Button.svelte";
    import Input from "../components/Input.svelte";
    let username = "";
    let password = "";
    const dispatch = createEventDispatcher();


    let LoginData = async ()=>{
        let param = {
            username: username,
            password: password
        }
        axios.post("https://tarmeezacademy.com/api/v1/login",param)
        .then((res)=> {localStorage.setItem("token",res.data.token)
            localStorage.setItem("username",username)
        })
        .then(()=>alert("Login Success"))
        .then(()=>handleLogin())
        .catch((err)=>alert(err.response.data.message))
        
    }
    function handleLogin() {
        
        dispatch("navigate", "home");
    }


    function goToRegister() {
        dispatch("navigate", "register");
    }
</script>

<div class="auth-card">
    <div class="header">
        <div class="logo">S</div>
        <h1>Welcome Back</h1>
        <p>Connect with friends and the world around you.</p>
    </div>

    <form on:submit|preventDefault={LoginData} class="form">
        <Input type="username" placeholder="Username" bind:value={username}/>
        <Input type="password" placeholder="Password" bind:value={password}/>

        <Button fullWidth size="lg" type="submit">Log In</Button>

        <div class="divider"></div>

        <Button variant="ghost" fullWidth on:click={goToRegister}
            >Create New Account</Button
        >
    </form>
</div>

<style>
    .auth-card {
        background: white;
        padding: var(--spacing-xl);
        border-radius: var(--radius-lg);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
        text-align: center;
    }

    .header {
        margin-bottom: var(--spacing-lg);
    }

    .logo {
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        font-size: 2rem;
        font-weight: bold;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--spacing-md);
    }

    h1 {
        font-size: 1.5rem;
        margin-bottom: var(--spacing-sm);
    }

    p {
        color: var(--text-secondary);
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .divider {
        height: 1px;
        background: var(--divider-color);
        margin: var(--spacing-sm) 0;
    }
</style>
