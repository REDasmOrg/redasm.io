<script>
    import PostPreview from "$lib/blog/PostPreview.svelte";
    import { posts } from "$lib/blog/posts.js";
</script>

<svelte:head>
    <title>REDasm - Blog</title>
</svelte:head>

{#each posts as post}
    <PostPreview {post}/>
{/each}
