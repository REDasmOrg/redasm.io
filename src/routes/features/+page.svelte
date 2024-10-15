<script>
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

<div>
  <p>REDasm is under heavy development but it provides several interesting features:</p>
  <ul>
      {#each FEATURES as f}
          <li>{f}</li>
      {/each}
  </ul>
  <h5 class="text-uppercase">Supported Loaders</h5>
  <ul>
      {#each LOADERS as l}
          <li>{l}</li>
      {/each}
  </ul>
  <h5 class="text-uppercase">Supported Assemblers</h5>
  <ul>
      {#each ASSEMBLERS as a}
          <li>{a}</li>
      {/each}
  </ul>
  <p>
  Check the <a href="/roadmap">Roadmap</a> for more features and ideas or
  <a href="https://github.com/REDasmOrg/REDasm/issues">open an issue on GitHub!</a></p>
</div>
