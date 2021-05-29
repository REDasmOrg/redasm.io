<script>
    import { onMount} from "svelte";

    export let items = [ ];
    export let interval = 2000;

    let c = 0, curridx = 0, manual = false;

    function moveImage(i) {
        manual = true;

        if(i > 0) curridx = Math.abs((c++) % items.length);
        else if(i < 0) curridx = Math.abs((--c) % items.length);
    }

    function selectImage(i) {
        manual = true;
        curridx = i;
    }

    onMount(() => {
        const i = setInterval(() => {
            if(!manual) curridx = c++ % items.length;
        }, interval);

        return () => clearInterval(i);
    });

</script>

<div class="relative">
    {#each items as item, i}
        <img alt="carousel-{i}" src={item} class="transition duration-150 ease-in-out filter brightness-75" class:hidden={i !== curridx}>
    {/each}
    <div class="absolute left-6 top-1/2 opacity-90 ml-1 cursor-pointer" on:click={() => moveImage(1)}>
        <i class="fas fa-chevron-left fa-lg"></i>
    </div>
    <div class="absolute right-6 top-1/2 opacity-90 mr-1 cursor-pointer" on:click={() => moveImage(-1)}>
        <i class="fas fa-chevron-right fa-lg"></i>
    </div>
    <div class="absolute bottom-6 inset-x-0 text-center">
        {#each items as _, i}
            <span class="opacity-90 mx-1 cursor-pointer {curridx === i ? 'text-light' : 'text-dark'}" on:click={() => selectImage(i)}>
                <i class="fas fa-circle fa-fw fa-sm"></i>
            </span>
        {/each}
    </div>
</div>
