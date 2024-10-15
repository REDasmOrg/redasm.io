<script>
    export let header = [];
</script>

<table class="table table-hover table-dark">
    <thead>
        <tr>
            {#each header as h}
                <th>{h}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        <slot></slot>
    </tbody>
</table>
