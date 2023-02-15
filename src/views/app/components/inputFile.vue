<template>
        <input
                class="form-control"
                type="file"
                v-model="value"
                :disabled="disabled"
                :maxlength="schema.max"
                :placeholder="schema.placeholder"
                :readonly="schema.readonly" />

</template>

<script>
    import { abstractField } from "VueFormGenerator";
    export default {
        name: "inputFile",
        mixins: [ abstractField ]
    }
</script>

<style scoped>

</style>