<script>
    export let color = "primary";
</script>

<button type="button" class="bg-{color} p-2 {$$props.class}" on:click>
    <slot/>
</button>
