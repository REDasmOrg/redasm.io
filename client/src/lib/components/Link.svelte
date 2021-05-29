<script>
    export let href = undefined;
    export let highlighted = true;
</script>

<a class="{$$props.class} { highlighted ? 'text-primary hover:text-secondary' : 'hover:text-primary'}" {href} on:click>
    <slot/>
</a>
