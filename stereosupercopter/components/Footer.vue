<template>
    <footer role="contentinfo" class="footer container">
        <div v-if="text" class="fade" v-html="text" />
    </footer>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.footer {
    padding-bottom: 20px;
    font-size: 1.3rem;
}
</style>
