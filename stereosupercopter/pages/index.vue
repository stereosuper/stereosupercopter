<template>
    <div>
        <PageHeader :text="global.header" />

        <main role="main" class="main">
            <header class="hero">
                <div class="container">
                    <div class="content">
                        <h1>
                            <span>Stéréo</span>
                            <span>super</span>
                            <span>copter</span>
                        </h1>
                        <div v-if="data.subtitle" class="network" v-html="data.subtitle" />
                    </div>

                    <div ref="chopper" class="stereosupercopter">
                        <img :src="global.copter.url" :alt="global.copter.alt" />
                        <div
                            ref="copter"
                            class="helices"
                            :data-src="global.propellers.url"
                            :style="'background-image:url(' + global.propellers.url + ')'"
                        />
                    </div>
                </div>
            </header>

            <div class="container">
                <div class="content">
                    <ol v-if="data.defis">
                        <li v-for="defi in data.defis" :key="defi.text">
                            <p>{{ defi.text }}</p>
                        </li>
                    </ol>

                    <p>
                        <a
                            v-if="data.btn[0]"
                            target="_blank"
                            rel="noopener noreferrer"
                            :href="data.btn[0].link"
                            class="btn"
                        >
                            {{ data.btn[0].text }}
                        </a>
                    </p>
                </div>
            </div>
        </main>

        <PageFooter :text="global.footer" />
    </div>
</template>

<script>
import gql from 'graphql-tag';

import gsap from 'gsap';

import Sprite from '~/assets/js/Sprite';

import PageHeader from '~/components/Header';
import PageFooter from '~/components/Footer';

export default {
    components: { PageHeader, PageFooter },
    async asyncData({ app }) {
        const apolloClient = app.apolloProvider.defaultClient;

        const global = await apolloClient
            .query({
                query: gql`
                    query Global {
                        global {
                            header
                            footer
                            propellers {
                                url
                            }
                            copter {
                                alt
                                url
                            }
                        }
                    }
                `
            })
            .catch(err => {
                console.error(err);
            });

        const home = await apolloClient
            .query({
                query: gql`
                    query HomePage {
                        home {
                            subtitle
                            defis {
                                text
                                done
                            }
                            btn {
                                link
                                text
                            }
                        }
                    }
                `
            })
            .catch(err => {
                console.error(err);
            });

        return { data: home.data.home, global: global.data.global };
    },
    mounted() {
        const chopper = this.$refs.chopper;
        const copter = this.$refs.copter;

        if (!copter || !chopper) return;

        const spUrl = copter.getAttribute('data-src');
        const spImg = new Image();

        let sp = null;
        let tl = null;

        spImg.addEventListener(
            'load',
            () => {
                sp = new Sprite({
                    image: copter,
                    cols: 2,
                    rows: 8,
                    interval: 0.05,
                    loop: true
                });

                tl = gsap.timeline({ repeat: -1 });

                tl.to(chopper, 2, { y: 10 });
                tl.to(chopper, 1.5, { y: 0 });

                sp.play();
            },
            false
        );

        spImg.src = spUrl;
    }
};
</script>

<style lang="scss" scoped>
.hero {
    padding: 60px 0 12vh;
    position: relative;
}

.stereosupercopter {
    max-width: 45vw;
    min-width: 600px;
    position: fixed;
    top: 15vh;
    right: -$gutter;
    z-index: 10;
    pointer-events: none;
    transform: rotate(5deg);
    > img {
        position: relative;
        margin: 17% 0 0;
        z-index: 1;
    }
}

.helices {
    position: absolute;
    width: 200%;
    height: 0;
    padding: 0 0 31%;
    top: 0;
    left: 50%;
    background-repeat: no-repeat;
    background-size: 200% auto;
    transform: translate3d(-50%, 0, 0);
}

.network {
    position: relative;
    &:before {
        content: '👉';
        position: absolute;
        top: 2px;
        left: -40px;
    }
}

@media (min-width: $desktop-big) {
    .stereosupercopter {
        top: 10vh;
        right: $gutter;
    }
}
</style>
