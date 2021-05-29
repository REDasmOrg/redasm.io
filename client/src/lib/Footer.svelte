<script>
    import Link from "$lib/components/Link.svelte";
</script>

<footer class="container mx-auto text-sm">
    <div class="flex">
        <div class="flex-grow text-center">
            <div class="uppercase text-lg font-bold mb-2">License</div>
            <p> REDasm is released under GNU GPL3 License.</p>
        </div>
        <div class="flex-grow text-center mx-2">
            <div class="uppercase text-lg font-bold mb-2">Thanks To</div>
            <div><Link href="https://www.capstone-engine.org">Capstone Engine</Link></div>
            <div><Link href="https://zydis.re">Zydis</Link></div>
            <div><Link href="https://github.com/taocpp/json">TaoJSON</Link></div>
        </div>
        <div class="flex-grow text-center">
            <div class="uppercase text-lg font-bold mb-2">Stats</div>
            <div>
                <a class="mx-auto" href="https://github.com/REDasmOrg/REDasm/actions?query=workflow%3AREDasm-Builds">
                    <img alt="badge" src="https://github.com/REDasmOrg/REDasm/workflows/REDasm-Builds/badge.svg">
                </a>
            </div>
            <div class="mt-2">
                <img alt="Language grade: C/C++" src="https://img.shields.io/lgtm/grade/cpp/g/REDasmOrg/REDasm.svg?logo=lgtm&logoWidth=18">
            </div>
        </div>
    </div>
    <div class="footer-copyright text-center py-3">
        <i>Developed with &#10084; by <a href="https://twitter.com/dax89">Dax</a></i><br>
        redasm.io version 0.9
    </div>
</footer>

