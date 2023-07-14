<script>
import { ref } from "vue";
import StarsRate from "./StarsRate.vue";

export default {
  props: {
    name: String,
    state: Boolean,
    rate: Number,
    title: String,
    content: String,
    ts_date: Number,
    reply: String,
    votesUp: Number,
    votesDown: Number,
  },
  setup(props) {
    const stateText = {
      verified: "Acheteur vérifié",
      not: "Acheteur",
    };
    const showMediaLink = ref(false);
    const shareLabel = "Partager";
    let currentUrl = window.location.href.replaceAll("/", "%2F").replaceAll(":", "%3AF");
    let testUrl = "www.nutribe.fr";
    let shareLinks = [
      {
        label: "Facebook",
        link:
          "https://www.facebook.com/sharer/sharer.php?u=" +
          testUrl +
          "&amp;src=sdkpreparse",
      },
      {
        label: "Twitter",
        link: "https://twitter.com/intent/tweet?text=visit%20this%20&url=" + testUrl,
      },
    ];

    let popupLink = (link) => {
      console.log("link: ", link);
      window.open(link, "popup", "width=600,height=600");
      return false;
    };

    //Format the date from timeStamp to dd/mm/yy format
    let date = new Date(props.ts_date);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
    console.log(date);
    date = day + "/" + month + "/" + (date.getYear() - 100);
    return {
      ...props,
      stateText,
      shareLinks,
      shareLabel,
      showMediaLink,
      date,
      popupLink,
    };
  },
  components: { StarsRate },
};
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
      <div class="comment-title">{{ title }}</div>
      <div class="content-content">
        {{ content }}
      </div>
    </div>
    <div class="comment-footer">
      <div class="footer-action">
        <div class="primary-action">
          <span class="open-actions" @click="showMediaLink = !showMediaLink">
            <span class="share-icon"
              ><svg
                width="800"
                height="800"
                viewBox="0 0 24 24"
                data-name="Flat Line"
                xmlns="http://www.w3.org/2000/svg"
                class="icon flat-line"
              >
                <path d="m16 3 5 4-5 4V9s-5 0-7 3c0 0 1-6 7-7Z" style="stroke-width: 2" />
                <path
                  d="m16 3 5 4-5 4V9s-5 0-7 3c0 0 1-6 7-7Z"
                  style="
                    fill: currentColor;
                    stroke: currentColor;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 2;
                  "
                />
                <path
                  data-name="primary"
                  d="M21 13v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"
                  style="
                    fill: none;
                    stroke: currentColor;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 2;
                  "
                /></svg
            ></span>
            <span class="share-label">{{ shareLabel }}</span>
          </span>
          <Transition>
            <span v-if="showMediaLink" class="media-links">
              <span class="separator"></span>
              <span class="share-options-wrapper">
                <span v-for="index in shareLinks.length" class="list-item">
                  <span class="y-label yotpo-action">
                    <span
                      class="action-btn"
                      @click="popupLink(shareLinks[index - 1].link)"
                      >{{ shareLinks[index - 1].label }}
                    </span>
                    <span
                      v-if="index != shareLinks.length"
                      class="action-separator"
                    ></span>
                  </span>
                </span>
              </span>
              <span class="separator"></span>
            </span>
          </Transition>
        </div>
        <div class="reaction">
          <div class="comment-date">{{ date }}</div>
          <div class="comment-vote" role="group">
            <div class="up-vote vote">
              <span class="up-vote-icon vote-icon"
                ><svg
                  fill="currentColor"
                  width="800"
                  height="800"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 21a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3v10Zm16.949-11h-5.771V5c0-2-3.076-2-3.076-2s0 4-1.026 5C9.52 8.543 8.669 10.348 8 11v10h10.644a2.036 2.036 0 0 0 2.017-1.642l1.3-7A2.015 2.015 0 0 0 19.949 10Z"
                  /></svg
              ></span>
            </div>
            <span class="up-vote-sum vote-count">{{ votesUp }}</span>
            <div class="down-vote vote">
              <span class="down-vote-icon vote-icon"
                ><svg
                  width="800"
                  height="800"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.1 20.5c0 1.5 1.482 2.5 2.64 2.5.806 0 .869-.613.993-1.82.055-.53.121-1.174.267-1.93.386-2.002 1.72-4.56 2.996-5.325V8C15 5.75 14.25 5 11 5H7.227C5.051 5 4.524 6.432 4.328 6.964A15.85 15.85 0 0 1 4.315 7c-.114.306-.358.546-.638.82-.31.306-.664.653-.927 1.18-.311.623-.27 1.177-.233 1.67.023.299.044.575-.017.83-.064.27-.146.475-.225.671-.143.356-.275.686-.275 1.329 0 1.5.748 2.498 2.315 2.498H8.5S8.1 19 8.1 20.5zM18.5 15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-3 0v7a1.5 1.5 0 0 0 1.5 1.5z"
                    fill="currentColor"
                  /></svg
              ></span>
            </div>
            <span class="down-vote-sum vote-count">{{ votesDown }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div>
        <div>
          <span>
            <div>
              <img
                class="yotpo-store-avatar"
                src="//cdn-yotpo-images-production.yotpo.com/App/323944/61533541/thumb.png?1540639645"
                alt=""
              />
            </div>
            <span></span>
          </span>
          <div>
            <div>
              <span>Product manager1</span>
            </div>
          </div>
        </div>
        <div>
          <div></div>
          <div>
            Merci pour votre commentaire. <br />Il est prévu que nous augmentions l'arôme
            lors de la prochaine fabrication.
          </div>
        </div>
        <div>
          <div>
            <span>03/06/23</span>
          </div>
        </div>
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
