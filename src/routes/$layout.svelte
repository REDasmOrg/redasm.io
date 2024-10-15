<script>
    import "../app.scss";
    import NavBar from "$lib/NavBar.svelte";
    import Footer from "$lib/Footer.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        await import("bootstrap");
    });
</script>

<div class="container">
    <NavBar />
    <div id="app-main" class="bg-dark m-3 p-3">
        <slot></slot>
    </div>
    <Footer />
</div>
<hr class="mt-4" />
