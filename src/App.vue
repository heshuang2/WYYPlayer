<template>
    <div id="app">
        <index />
        <top />
    </div>
</template>

<script>
import top from "./components/top.vue";
import index from "./components/index.vue";
export default {
    name: "app",
    components: {
        top,
        index
    }
};
</script>

<style></style>
