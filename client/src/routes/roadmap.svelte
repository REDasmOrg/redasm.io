<script>
    const ROADMAP = [
        { name: "Ida-Like multiple listing views", version: "3.0 Beta" },
        { name: "Arm64 architecture", version: "3.0 Beta" },
        { name: "Python scripting", version: "3.0 Beta (In Progress)" },
        { name: "External plugin support", version: "3.0" },
        { name: "Delphi decompilation" },
        { name: "MFC decompilation" },
        { name: "Dalvik decompilation" },
        { name: "Java decompilation" },
        { name: "Assembler (pseudo)decompilation", version: "In Progress" },
        { name: "'OOP' Reversing" },
        { name: "Remote debugging" },
        { name: "Collaborative reversing" },
        { name: "Improved graphs", version: "2.1" },
        { name: "Interactive documentation" },
        { name: "Patching support" },
        { name: "REDasm 'Web Edition'" },
        { name: "More formats", version: "In Progress" },
        { name: "More assemblers", version: "In Progress" },
    ];
</script>

<p>This is a draft of REDasm's roadmap, items are listed in no particular order:</p>
<table class="table table-dark table-sm">
    <thead>
        <tr>
            <td>Feature</td>
            <td>In Version</td>
        </tr>
    </thead>
    <tbody>
      {#each ROADMAP as r}
        <tr>
            <td>{r.name}</td>
            <td class:text-primary={!r.version}>{r.version || "Not Implemented"}</td>
        </tr>
        {/each}
    </tbody>
</table>
