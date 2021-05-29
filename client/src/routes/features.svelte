<script>
    import Link from "$lib/components/Link.svelte";

    const FEATURES = [
        "IDA-Like interactive listing",
        "Multithreaded analysis",
        "Graphing support",
        "Runs on Windows and Linux",
        "Easy to use",
        "C API (from 3.0)",
        "Plugin Support (from 3.0)",
    ];

    const LOADERS = [
        "Portable Executable (PE)",
        "ELF Executable | 32/64 bits",
        "Sony Playstation 1 Executable",
        "Sony Playstation 1 BIOS ",
        "XBox1 Executable (XBE)",
        "ESP32 Roms",
        "DEX",
    ];

    const ASSEMBLERS = [
        "x86 and x86_64",
        "MIPS",
        "ARM64",
        "CHIP-8",
        "Xtensa",
        "Dalvik",
    ];
</script>

<svelte:head>
    <title>REDasm - Features</title>
</svelte:head>

<div>
  <p>REDasm is under heavy development but it provides several interesting features:</p>
  <ul class="list-disc list-inside ml-1 my-2">
      {#each FEATURES as f}
          <li>{f}</li>
      {/each}
  </ul>
  <div class="flex justify-around py-2 border border-primary">
      <div>
          <h5 class="uppercase font-bold">Supported Loaders</h5>
          <ul>
              {#each LOADERS as l}
                  <li>{l}</li>
              {/each}
          </ul>
      </div>
      <div>
          <h5 class="uppercase font-bold">Supported Assemblers</h5>
          <ul>
              {#each ASSEMBLERS as a}
                  <li>{a}</li>
              {/each}
          </ul>
      </div>
  </div>
  <p>
    Check the <a href="/roadmap">Roadmap</a> for more features and ideas or
    <Link href="https://github.com/REDasmOrg/REDasm/issues">open an issue on GitHub!</Link>
  </p>
</div>
