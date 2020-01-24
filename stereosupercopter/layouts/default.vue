<template>
    <div>
        <nuxt />
    </div>
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

<style></style>
