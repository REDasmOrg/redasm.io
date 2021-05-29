<script>
    import Carousel from "$lib/components/Carousel.svelte";
    import Link from "$lib/components/Link.svelte";

    const CAROUSEL = [
        "/assets/carousel/1.png",
        "/assets/carousel/2.png",
        "/assets/carousel/3.png",
        "/assets/carousel/4.png",
    ];
</script>

<svelte:head>
    <title>REDasm</title>
</svelte:head>

<img class="float-left" alt="logo" src="/assets/logo.png">
REDasm is a cross platform disassembler with a modern codebase useful from the hobbyist to the professional reverse engineer.<br><br>
All features are provided by <Link href="https://github.com/REDasmOrg/REDasm-Library">LibREDasm</Link> which loads plugins developed in C, C++ and Python3 (you can also support new languages if you want!) and an user friendly Qt frontend.<br><br>
You can hack and improve REDasm without any issues and limitations.<br>
<br>
<div class="text-right mx-4"><i>Runs on Windows and Linux.</i></div>
<div class="flex justify-center w-full">
    <div>
        <Carousel items={CAROUSEL}/>
    </div>
</div>
