<script>
    let expanded = false;
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-flud">
        <button class="navbar-toggler" type="button" on:click={() => expanded = !expanded}>
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="{!expanded ? 'collapse navbar-collapse' : ''}">
            <ul class="navbar-nav me-auto">
                <li class="px-2 nav-item"><a class="nav-link" href="/">Home</a></li>
                <li class="px-2 nav-item"><a class="nav-link" href="/features">Features</a></li>
                <li class="px-2 nav-item"><a class="nav-link" href="/roadmap">Roadmap</a></li>
                <li class="px-2 nav-item"><a class="nav-link" href="/download">Download</a></li>
            </ul>
        </div>
    </div>
    <ul class="navbar-nav ms-auto list-group-horizontal">
        <li class="nav-item"><a href="https://twitter.com/re_dasm" class="mx-1 text-light"><i class="fab fa-twitter fa-fw fa-lg"></i></a></li>
        <li class="nav-item"><a href="https://t.me/REDasmDisassembler" class="mx-1 text-light"><i class="fab fa-telegram-plane fa-fw fa-lg"></i></a></li>
        <li class="nav-item"><a href="https://www.reddit.com/r/REDasm" class="mx-1 text-light"><i class="fab fa-reddit-alien fa-fw fa-lg"></i></a></li>
        <li class="nav-item"><a href="https://github.com/REDasmOrg/REDasm" class="mx-1 text-light"><i class="fab fa-github-alt fa-fw fa-lg"></i></a></li>
    </ul>
</nav>
