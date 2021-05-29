<script>
    export let header = [ ];
</script>

<table class="w-full">
    <thead>
        <tr>
            {#each header as h}
                <th class="border-b">{h}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        <slot></slot>
    </tbody>
</table>
