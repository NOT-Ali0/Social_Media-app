<script>
    import PostCard from "../components/PostCard.svelte";
    import Button from "../components/Button.svelte";
    import { onMount } from "svelte";
    import axios from "axios";

    let posts = $state([{}]);

    let UploadPhoto = $state(false);

    let BodyInput = $state("");
    onMount(() => {
        postsData();
    });
        // let postsData = async ()=>{
        // let response = await fetch("https://tarmeezacademy.com/api/v1/posts?limit=50")
        // let data = await response.json()
        // posts = data.data
        // }

        let handleUploadField = ()=>{
            UploadPhoto = !UploadPhoto
        }

        let postsData =  ()=>{
            axios.get("https://tarmeezacademy.com/api/v1/posts?limit=50")
            .then((res)=> posts=res.data.data)
            .catch((err)=>console.log(err))
        }

        
        function handlePost() {
            if (!BodyInput.trim()) return;
            
        let formData = new FormData();
        formData.append("body",BodyInput)
        formData.append("image",file)


        axios.post("https://tarmeezacademy.com/api/v1/posts",formData,{
            headers:{
                "Content-Type": "multipart/form-data",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>console.log(res.data))
        .then(()=>postsData())
        .then(()=>UploadPhoto= false)
        .catch(()=> alert("something went wrong are you missing field?"))
        .catch((err)=>console.log(err))
        
        const newPost = {
            id: crypto.randomUUID(),
            user:"",
            time: Date.now().toLocaleString(),
            body: BodyInput,
            image: file,
            likes: 0,
            comments: 0,
            shares: 0,
        }
        
        posts = [...posts,newPost]
        
        BodyInput = ""
        file = null
        fileInput = null
    }



    let fileInput = $state(null)
    let file = $state(null);


    let handleFileChange = (e)=>{
        if(!fileInput)return;


        fileInput = e.target
        file = fileInput.files[0]
        console.log(file);
    }


    
    
</script>

<div class="home-container">
    <div class="create-post-card">
        <div class="input-area">
            <div class="avatar">
                <img src="https://via.placeholder.com/40" alt="User" />
            </div>
            <input
                type="text"
                placeholder="What's on your mind, User?"
                bind:value={BodyInput}
            />
            
        </div>
        <div class="divider"></div>
        <div class="actions">
            <div class="action-item">
                {#if UploadPhoto}
                    <input type="file" id="file-input" accept="image/*" bind:this={fileInput} onchange={(e)=>handleFileChange(e)}>
                {:else}
                <div onclick={handleUploadField} class="Photo-post-cont">
                <span  class="icon">📷</span> Photo/Video
                </div>
                {/if}
            </div>
            <div class="action-item">
                <span class="icon">😊</span> Feeling/Activity
            </div>
            <Button
                size="sm"
                on:click={handlePost}
                disabled={!BodyInput.trim()||!file}>Post</Button
            >
        </div>
    </div>

    <div class="feed">
        {#each posts as post (post.id)}
            <PostCard {post} />
        {/each}
    </div>
</div>

<style>
    *{
        box-sizing: border-box;
    }

    .Photo-post-cont{
        cursor: pointer;
        width: 10vw;
        border-radius: 20px;
        flex-direction: row;
        padding: 3px;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
    }


    .home-container {
        width: 100%;
        max-width: 680px;
    }

    .create-post-card {
        background: var(--card-bg);
        border-radius: var(--radius-md);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        margin-bottom: var(--spacing-md);
        padding: var(--spacing-md);
    }

    .input-area {
        display: flex;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-sm);
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .input-area input {
        flex: 1;
        border-radius: 20px;
        border: none;
        background: var(--bg-color);
        padding: 0 var(--spacing-md);
        outline: none;
    }

    .input-area input:hover {
        background: #e4e6eb;
    }

    .divider {
        height: 1px;
        background: var(--divider-color);
        margin: var(--spacing-sm) 0;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .action-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-secondary);
        font-weight: 600;
        padding: 8px;
        border-radius: var(--radius-sm);
        cursor: pointer;
    }

    .action-item:hover {
        background: var(--bg-color);
    }
</style>
