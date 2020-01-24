<template>
    <nuxt />
</template>

<script>
export default {
    mounted() {
        this.$nextTick(() => {
            this.$store.commit('setLoading', false);
        });
    }
};
</script>
