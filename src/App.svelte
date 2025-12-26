<script>
  import "./app.css";
  import Navbar from "./lib/components/Navbar.svelte";
  import Sidebar from "./lib/components/Sidebar.svelte";

  // Pages
  import Login from "./lib/pages/Login.svelte";
  import Register from "./lib/pages/Register.svelte";
  import Home from "./lib/pages/Home.svelte";
  import Profile from "./lib/pages/Profile.svelte";
  import { onMount } from "svelte";

  let currentPage = "home"; // 'login', 'register', 'home', 'profile'

  //checking for token

  const handleCheckToken = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("login");
    } else {
      navigate("home");
    }
  };
  onMount(() => {
    handleCheckToken();
  });

  function navigate(page) {
    currentPage = page;
  }
</script>

<main class="app-container">
  {#if currentPage !== "login" && currentPage !== "register"}
    <Navbar on:navigate={(e) => navigate(e.detail)} />
    <div class="main-layout">
      <Sidebar
        on:navigate={(e) => navigate(e.detail)}
        activePage={currentPage}
      />
      <div class="content-area">
        {#if currentPage === "home"}
          <Home />
        {:else if currentPage === "profile"}
          <Profile />
        {/if}
      </div>
    </div>
  {:else}
    <div class="auth-layout">
      {#if currentPage === "login"}
        <Login on:navigate={(e) => navigate(e.detail)} />
      {:else if currentPage === "register"}
        <Register on:navigate={(e) => navigate(e.detail)} />
      {/if}
    </div>
  {/if}
</main>

<style>
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-layout {
    display: flex;
    flex: 1;
    margin-top: var(--header-height);
    background-color: var(--bg-color);
  }

  .content-area {
    flex: 1;
    padding: var(--spacing-lg);
    display: flex;
    justify-content: center;
  }

  .auth-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--bg-color);
  }

  @media (max-width: 768px) {
    .main-layout {
      flex-direction: column;
    }
    .content-area {
      padding: var(--spacing-md);
      padding-bottom: 70px; /* Space for bottom nav */
      width: 100%;
    }
  }
</style>
