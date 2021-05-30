<script context="module">
    export function paginate(items, currentpage, pagesize) {
        return items.slice(currentpage * pagesize,
                           currentpage * pagesize + pagesize);
    }
</script>

<script>
    import { createEventDispatcher } from "svelte";
    
    const dispatch = createEventDispatcher();

    export let length = 0;
    export let currentpage = 0;
    export let pagesize = 5;

    let pagecount = 0, pages = [ ];

    $: {
        pagecount = Math.ceil(length / pagesize);
        pages = [...Array(pagecount).keys()];
    }

    function changePage(page) {
        console.log(page, pagecount);
        currentpage = page;
        dispatch("pagechange", {page});
    }
</script>

<div>
    <button class="bg-primary text-white w-8 h-8 text-lg" disabled={!currentpage} on:click={() => changePage(currentpage - 1)}>
        &laquo;
    </button>

    {#each pages as page}
        <button class="{currentpage === page ? 'bg-primary text-white' : ''} w-8 h-8 text-lg" on:click={() => changePage(page)}>
            {page + 1}
        </button>
    {/each}

    <button class="bg-primary text-white w-8 h-8 text-lg" disabled={currentpage >= pagecount - 1} on:click={() => changePage(currentpage + 1)}>
        &raquo;
    </button>
</div>
