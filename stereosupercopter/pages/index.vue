<template>
    <div class="container">
        {{ data }}
    </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
    async asyncData({ app }) {
        const apolloClient = app.apolloProvider.defaultClient;

        const home = await apolloClient
            .query({
                query: gql`
                    query HomePage {
                        home {
                            id
                        }
                    }
                `
            })
            .catch(err => {
                console.error(err);
            });

        return { data: home.data.home };
    }
};
</script>

<style lang="scss" scoped></style>
