<script>
    import Link from "$lib/components/Link.svelte";
</script>

<nav class="container mx-auto bg-dark py-5">
    <div class="sm:flex mx-5">
        <ul class="sm:self-center flex-1">
            <li class="sm:inline-block">
                <Link highlighted={false} class="p-3" href="/">Home</Link>
            </li>
            <li class="sm:inline-block">
                <Link highlighted={false} class="p-3" href="/features">Features</Link>
            </li>
            <li class="sm:inline-block">
                <Link highlighted={false} class="p-3" href="/roadmap">Roadmap</Link>
            </li>
            <li class="sm:inline-block">
                <Link highlighted={false} class="p-3" href="/blog">Blog</Link>
            </li>
            <!-- >
            <li class="sm:inline-block">
                <Link highlighted={false} class="p-3" href="/docs">Documentation</Link>
            </li>
            -->
            <li class="sm:inline-block">
                <Link highlighted={false} class="p-3" href="/download">Download</Link>
            </li>
        </ul>
        <div class="sm:self-center flex">
            <Link highlighted={false} href="https://twitter.com/re_dasm" class="mx-1">
                <i class="fab fa-twitter fa-fw fa-lg"></i>
            </Link>
            <Link highlighted={false} href="https://t.me/REDasmDisassembler" class="mx-1">
                <i class="fab fa-telegram-plane fa-fw fa-lg"></i>
            </Link>
            <Link highlighted={false} href="https://www.reddit.com/r/REDasm" class="mx-1">
                <i class="fab fa-reddit-alien fa-fw fa-lg"></i>
            </Link>
            <Link highlighted={false} href="https://github.com/REDasmOrg/REDasm" class="mx-1">
                <i class="fab fa-github-alt fa-fw fa-lg"></i>
            </Link>
        </div>
    </div>
</nav>
