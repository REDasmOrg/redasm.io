<script>
    export let pages=[ ]
    export let currentpage=undefined;
    export let currentindex=0;

    $: currentpage = pages[currentindex];
</script>

<nav class="flex flex-col sm:flex-row">
    {#each pages as p, i}
        <button type="button" class="border-primary p-2" class:border-b-2={currentindex === i} on:click={() => currentindex = i}>
            {p}
        </button>
    {/each}
</nav>
<div class="pt-2">
    <slot/>
</div>
