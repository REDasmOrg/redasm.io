<script>
    import Table from "$lib/components/Table.svelte";

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

<svelte:head>
    <title>REDasm - Roadmap</title>
</svelte:head>

<p class="pb-2">This is a draft of REDasm's roadmap, items are listed in no particular order:</p>
<Table class="table" header={["Feature", "In Version"]}>
    {#each ROADMAP as r}
        <tr>
            <td class="p-1">{r.name}</td>
            <td class="p-1">
                <div class:text-primary={!r.version}>
                    {r.version || "Not Implemented"}
                </div>
            </td>
        </tr>
    {/each}
</Table>
