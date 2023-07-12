<script>
import { h, ref } from 'vue';
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
        }
        return ({
            ...props,
            stateText,

        });
    },
    components: { StarsRate }
}
</script>

<template>
    <div>
        <div class="comment-header">
            <span class="user-profil-icon">
                <span class="user-profil-letter">
                    {{ name[0] }}
                </span>
                <span class="verified-icon"></span>
            </span>
            <div class="header-element">
                <span class="user-profil-name">
                    {{ name }}
                </span>
                <div class="user-verified-state">
                    <span>
                        {{ state ? stateText.verified : stateText.not }}
                    </span>
                </div>
                <div>
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
            <div class="yotpo-helpful" role="group">
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
    
<style scoped></style>
