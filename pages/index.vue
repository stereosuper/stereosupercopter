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
                    <ol v-if="data.defis" class="defis">
                        <li v-for="defi in data.defis" :key="defi.text" :class="[{ done: defi.done }]">
                            <p v-if="defi.link">
                                <a :href="defi.link" target="_blank" rel="noopener noreferrer">{{ defi.text }}</a>
                            </p>
                            <p v-else>
                                {{ defi.text }}
                            </p>
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
                            <span>{{ data.btn[0].text }}</span>
                            <svg
                                class="icon i1"
                                width="23"
                                height="9"
                                viewBox="0 0 23 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19.6695 8.5H18.4172L20.7477 4.5L18.4172 0.5H19.6695L22.452 4.413V4.60425L19.6695 8.5ZM0 4.84775L0.0175 4.0825L21.0435 4.152V4.84775H0H0Z"
                                />
                            </svg>
                            <svg
                                class="icon i2"
                                width="23"
                                height="9"
                                viewBox="0 0 23 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19.6695 8.5H18.4172L20.7477 4.5L18.4172 0.5H19.6695L22.452 4.413V4.60425L19.6695 8.5ZM0 4.84775L0.0175 4.0825L21.0435 4.152V4.84775H0H0Z"
                                />
                            </svg>
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

import { gsap } from 'gsap';

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
                                link
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

                tl.to(chopper, 2, { y: 10, rotation: 4.5, ease: 'none' });
                tl.to(chopper, 1.5, { y: 0, rotation: 5, ease: 'none' });

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
    display: none;
}

.network {
    position: relative;
    &:before {
        content: '👉';
        position: absolute;
        top: 2px;
        left: -40px;
    }
    /deep/ p {
        opacity: 0.7;
    }
}

.defis {
    margin-bottom: 80px;
    a {
        text-decoration: none;
        &:hover,
        &:focus {
            color: #fff;
            opacity: 0.7;
        }
    }
}

.done {
    opacity: 0.7;
    p {
        display: inline;
        background: repeating-linear-gradient(#000, #000 13px, #fff 13px, #fff 15px, #000 15px, #000 30px);
    }
}

@media (min-width: $tablet) {
    .stereosupercopter {
        display: block;
        width: 55vw;
        max-width: 700px;
        min-width: 450px;
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
        width: 250%;
        height: 0;
        padding: 0 0 39%;
        top: 0;
        left: 50%;
        background-repeat: no-repeat;
        background-size: 200% auto;
        transform: translate3d(-50%, 0, 0);
    }
}

@media (min-width: $desktop-big) {
    .stereosupercopter {
        top: 10vh;
    }
}
</style>
