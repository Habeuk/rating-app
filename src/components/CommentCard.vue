<script>
import { ref } from 'vue';
import StarsRate from './StarsRate.vue';

export default {
    props: {
        name: String,
        state: Boolean,
        rate: Number,
        title: String,
        content: String,
        date: Number,
        reply: String,
        votesUp: Number,
        votesDown: Number,
    },
    setup(props) {
        const stateText = {
            verified: "Acheteur vérifié",
            not: "Acheteur"
        };
        const showMediaLink = ref(false);
        const shareLabel = "Partager";
        let currentUrl = window.location.href.replaceAll("/", "%2F").replaceAll(":", "%3AF");
        let testUrl = "www.nutribe.fr";
        let shareLinks = [
            {
                label: "Facebook",
                link: "https://www.facebook.com/sharer/sharer.php?u=" + testUrl + "&amp;src=sdkpreparse"
            },
            {
                label: "Twitter",
                link: "https://twitter.com/intent/tweet?text=visit%20this%20&url=" + testUrl
            }
        ];

        let popupLink = (link) => {
            console.log("link: ", link);
            window.open(link, 'popup', 'width=600,height=600');
            return false;
        }

        return ({
            ...props,
            stateText,
            shareLinks,
            shareLabel,
            showMediaLink,
            popupLink
        });
    },
    components: { StarsRate }
}
</script>

<template>
    <div class="single-comment">
        <div class="comment-header">
            <span class="user-profil-icon">
                <span class="user-profil-letter">
                    {{ name[0] }}
                </span>
                <span class="verified-icon"></span>
            </span>
            <div class="header-elements">
                <span class="user-profil-name">
                    {{ name }}
                </span>
                <div class="user-verified-state">
                    <span>
                        {{ state ? stateText.verified : stateText.not }}
                    </span>
                </div>
                <div class="clear-fix"></div>
                <div class="comments-rate">
                    <StarsRate :stars-number="rate" />
                </div>
            </div>
        </div>
        <div class="comment-main">
            <div class="comment-title"> {{ title }} </div>
            <div class="content-content">
                {{ content }}
            </div>
        </div>
        <div class="comment-footer">
            <div class="footer-action">
                <span class="open-actions" @click="showMediaLink = !showMediaLink">
                    <span class="share-icon"><svg width="800" height="800" viewBox="0 0 24 24" data-name="Flat Line"
                            xmlns="http://www.w3.org/2000/svg" class="icon flat-line">
                            <path d="m16 3 5 4-5 4V9s-5 0-7 3c0 0 1-6 7-7Z" style="stroke-width:2" />
                            <path d="m16 3 5 4-5 4V9s-5 0-7 3c0 0 1-6 7-7Z"
                                style="fill:currentColor;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2" />
                            <path data-name="primary" d="M21 13v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"
                                style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2" />
                        </svg></span>
                    <span class="share-label">{{ shareLabel }}</span>
                </span>
                <Transition>

                    <span v-if="showMediaLink" class="media-links">

                        <span class="separator"></span>
                        <span class="share-options-wrapper">
                            <span v-for="index in shareLinks.length" class="list-item">
                                <span class="y-label yotpo-action">
                                    <span class="action-btn" @click="popupLink(shareLinks[index - 1].link)">{{
                                        shareLinks[index
                                            -
                                            1].label }}
                                    </span>
                                    <span v-if="index != shareLinks.length" class="action-separator"></span>
                                </span>
                            </span>
                        </span>
                        <span class="separator"></span>
                    </span>
                </Transition>

            </div>
            <div class="comments-vote" role="group">
                <div class="up-vote">
                    <span class="up-vote-icon"></span>
                </div>
                <span class="up-vote-sum vote-count">{{ votesUp }}</span>
                <div class="down-vote">
                    <span class="down-vote-icon"></span>
                </div>
                <span class="down-vote-sum vote-count">{{ votesDown }}</span>
            </div>
        </div>
    </div>
</template>
    
<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(40px);
}
</style>
