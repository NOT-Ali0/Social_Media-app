<script>
    import { createEventDispatcher } from "svelte";
    import axios from "axios";
    import Button from "../components/Button.svelte";
    import Input from "../components/Input.svelte";
    import Filesinput from "../components/Filesinput.svelte";

    const dispatch = createEventDispatcher();

    let username = $state("");
    let email = $state("");
    let name = $state("");
    let password = $state("");
    let file = $state();
    let handleImageFile = (e)=>{
        file = e.target.files[0]
    }
    
    
    function handleRegister() {
        // Simulate register
        dispatch("navigate", "home");
    }

    function goToLogin() {
        dispatch("navigate", "login");
    }

    let RegisterData = async () => {
        let param = new FormData();
        param.append("name", name);
        param.append("username", username);
        param.append("email", email);
        param.append("password", password);
        param.append("image", file);

        axios
            .post("https://tarmeezacademy.com/api/v1/register", param, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                localStorage.setItem("image", res.data.user.profile_image);
                localStorage.setItem("id", res.data.user.id);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", username);
            })
            .then(() => alert("Register Success"))
            .then(() => handleRegister())
            .catch((err) => alert(err.response.data.message))
            .catch((err) => console.log(err.response.data.message));
    };
</script>

<div class="auth-card">
    <div class="header">
        <div class="logo">S</div>
        <h1>Sign Up</h1>
        <p>It's quick and easy.</p>
    </div>

    <form on:submit|preventDefault={RegisterData} class="form">
        <div class="row">
            <Input type="text" placeholder="username" bind:value={username} />
            <Input type="text" placeholder="your name" bind:value={name} />
        </div>
        <Input
            type="email"
            placeholder="Email or Phone Number"
            bind:value={email}
        />
        <Input
            type="password"
            placeholder="New Password"
            bind:value={password}
        />
        <Filesinput
        {file}
        on:change={(e)=>handleImageFile(e)}
        accept="image*/"
        
        />
        <!-- <input type="file" accept="image*/" bind:this={file} on:change={(e)=>handleImageFile(e)}> -->
        <!-- <Input type="password" placeholder="Confirm Password" /> -->

        <p class="terms">
            By clicking Sign Up, you agree to our Terms, Data Policy and Cookie
            Policy.
        </p>

        <Button variant="success" fullWidth size="lg" type="submit"
            >Sign Up</Button
        >

        <div class="link">
            <a href="#" on:click|preventDefault={goToLogin}
                >Already have an account?</a
            >
        </div>
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

    .row {
        display: flex;
        gap: var(--spacing-sm);
    }

    .terms {
        font-size: 0.75rem;
        text-align: left;
        margin-bottom: var(--spacing-sm);
    }

    .link {
        margin-top: var(--spacing-md);
        font-size: 0.9rem;
        color: var(--primary-color);
    }

    .link a:hover {
        text-decoration: underline;
    }
</style>
