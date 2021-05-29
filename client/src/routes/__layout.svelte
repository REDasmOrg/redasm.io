<script>
    import "../app.postcss";
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import NavBar from "$lib/NavBar.svelte";
    import Footer from "$lib/Footer.svelte";
</script>

<div>
    <NavBar/>
    <div id="app-main" class="container mx-auto m-3 p-3 bg-dark">
        <slot></slot>
    </div>
    <Footer/>
</div>
<hr class="mt-4">
