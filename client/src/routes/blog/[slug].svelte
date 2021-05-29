<script>
    import { page } from "$app/stores";
    import { getPost } from "$lib/blog/posts.js";

    const post = getPost($page.params.slug);
</script>

{#if post}
    <div class="flex items-top">
        <div class="flex-grow">
            <h1 class="font-bold uppercase text-primary text-2xl">{post.attributes.title}</h1>
            <div class="mt-1" class:hidden={!post.attributes.tags.length}>
                <i class="fas fa-tag fa-fw fa-xs"></i>
                {#each post.attributes.tags as t}
                    <span class="font-bold text-xs bg-secondary text-dark rounded py-0.5 px-1 m-1">
                        {t}
                    </span>
                {/each}
            </div>
        </div>
        <div class:hidden={post.attributes.date === undefined}>
            <i class="fas fa-clock fa-fw"></i>
            {#if post.attributes.date}
                {post.attributes.date.toLocaleDateString()}
            {/if}
        </div>
    </div>
    <div class="border-b border-solid border-white p-px my-5"></div>
    <div>
        {@html post.html}
    </div>
{:else}
    Not Found
{/if}
