<script>
    import { posts } from "$lib/blog/posts.js";
    import Pagination, { paginate } from "$lib/components/Pagination.svelte";
    import PostPreview from "$lib/blog/PostPreview.svelte";

    const PAGE_SIZE = 5;
    let currentpage = 0;

    $: pageposts = paginate(posts, currentpage, PAGE_SIZE);
</script>

<svelte:head>
    <title>REDasm - Blog</title>
</svelte:head>

{#each pageposts as post}
    <PostPreview {post}/>
{/each}

<div class="flex justify-center">
    <Pagination
            length={posts.length}
            currentpage={currentpage}
            on:pagechange={(e) => currentpage = e.detail.page }
            />
</div>
