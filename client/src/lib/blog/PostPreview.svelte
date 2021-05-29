<script>
    import { goto } from "$app/navigation";

    export let post = undefined;
</script>

<div class="mb-3 px-3">
    <button type="button" class="font-bold uppercase text-primary text-xl hover:text-secondary" on:click|preventDefault={() => goto(post.attributes.url)}>{post.attributes.title}</button>
    <div class="pt-1 pb-3">
        <span class:hidden={post.attributes.date === undefined} class="text-sm">
            <i class="fas fa-clock fa-fw"></i>
            {#if post.attributes.date}
                {post.attributes.date.toLocaleDateString()}
            {/if}
        </span>
        <span class="ml-5" class:hidden={!post.attributes.tags.length}>
            <i class="fas fa-tag fa-fw"></i>
            {#each post.attributes.tags as t}
                <span class="font-bold text-sm bg-secondary text-dark rounded py-0.5 px-1 m-1">
                    {t}
                </span>
            {/each}
        </span>
    </div>
    <div class="mb-4">
        {@html post.attributes.summary}
    </div>
    <hr>
</div>
