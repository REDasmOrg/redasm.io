<script>
    import "../app.scss";
    import NavBar from "$lib/NavBar.svelte";
    import Footer from "$lib/Footer.svelte";
</script>

<div class="container">
    <NavBar/>
    <div id="app-main" class="m-3 p-3 bg-dark">
        <slot></slot>
    </div>
    <Footer/>
</div>
<hr class="mt-4">
