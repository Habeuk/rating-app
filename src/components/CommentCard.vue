<script>
import { ref } from 'vue'
import StarsRate from './StarsRate.vue'

export default {
  props: {
    id: Number,
    name: String,
    surname: String,
    note: Number,
    description: String,
    created_at: Number,
    likes: Number,
    dislikes: Number,
    title: String,
    status_user_display: Boolean,
    status_user_text: String,
    status_user_badge: Boolean,
    adminPictureLink: String,
    adminName: String,
    adminReply: Object,
    adminReplyDate: Number,
    reponse: String
  },
  emits: ['likeAction', 'dislikeAction'],
  setup(props, { emit }) {
    const liked = ref(false)
    const disliked = ref(false)
    const showMediaLink = ref(false)
    const shareLabel = 'Partager'
    let currentUrl = encodeURI(window.location.href)
    let shareLinks = [
      {
        label: 'Facebook',
        link: 'https://www.facebook.com/sharer/sharer.php?u=' + currentUrl
      },
      {
        label: 'Twitter',
        link:
          'https://twitter.com/intent/tweet?text=' +
          encodeURI(props.description + '\n') +
          currentUrl
      }
    ]
    const actionLike = (id) => {
      const variation = liked.value ? -1 : 1
      liked.value = !liked.value
      emit('likeAction', { id: id, variation: variation })
    }
    const actionDislike = (id) => {
      const variation = disliked.value ? -1 : 1
      disliked.value = !disliked.value
      emit('dislikeAction', { id: id, variation: variation })
    }
    let popupLink = (link) => {
      window.open(link, 'popup', 'width=600,height=600')
      return false
    }
    let getFormatedDate = (date) => {
      const d = new Date(date * 1000)
      const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      const jsMonth = d.getMonth() + 1
      const month = jsMonth < 10 ? '0' + jsMonth : jsMonth
      return day + '/' + month + '/' + (d.getYear() - 100)
    }
    return {
      ...props,
      shareLinks,
      shareLabel,
      showMediaLink,
      liked,
      disliked,
      getFormatedDate,
      popupLink,
      actionLike,
      actionDislike
    }
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
        <span v-if="status_user_badge" class="verified-icon">
          <svg
            fill="currentColor"
            width="800"
            height="800"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 3C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3zm7.258 9.307-9.486 9.485a.61.61 0 0 1-.861 0l-.191-.191-.001.001L7.5 16.346a.61.61 0 0 1 0-.862l1.294-1.293a.61.61 0 0 1 .862 0l3.689 3.716 7.756-7.756a.61.61 0 0 1 .862 0l1.294 1.294a.609.609 0 0 1 .001.862z"
            />
          </svg>
        </span>
      </span>
      <div class="header-elements">
        <span class="user-profil-name">
          {{ name }}
        </span>
        <div v-if="status_user_display" class="user-verified-state">
          <span>
            {{ status_user_text }}
          </span>
        </div>
        <div class="clear-fix"></div>
        <div class="comments-rate">
          <StarsRate :percentage="note * 20" />
        </div>
      </div>
    </div>
    <div class="comment-main">
      <div class="comment-title">{{ title }}</div>
      <div class="content-content" v-html="description"></div>
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
                <span v-for="index in shareLinks.length" class="list-item" :key="index">
                  <span class="y-label yotpo-action">
                    <span class="action-btn" @click="popupLink(shareLinks[index - 1].link)"
                      >{{ shareLinks[index - 1].label }}
                    </span>
                    <span v-if="index != shareLinks.length" class="action-separator"></span>
                  </span>
                </span>
              </span>
              <span class="separator"></span>
            </span>
          </Transition>
        </div>
        <div class="reaction">
          <div class="comment-date">{{ getFormatedDate(created_at) }}</div>
          <div class="comment-vote" role="group">
            <div @click="actionLike(id)" class="up-vote vote">
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
            <span class="up-vote-sum vote-count">{{ likes }}</span>
            <div @click="actionDislike(id)" class="down-vote vote">
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
            <span class="down-vote-sum vote-count">{{ dislikes }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="reponse" class="admin-reply">
      <div class="content">
        <div class="comment-header">
          <span class="user-profil-icon">
            <div>
              <img
                class="yotpo-store-avatar"
                src="//cdn-yotpo-images-production.yotpo.com/App/323944/61533541/thumb.png?1540639645"
                alt=""
              />
            </div>
            <span class="verified-icon">
              <svg
                fill="currentColor"
                width="800"
                height="800"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3zm7.258 9.307-9.486 9.485a.61.61 0 0 1-.861 0l-.191-.191-.001.001L7.5 16.346a.61.61 0 0 1 0-.862l1.294-1.293a.61.61 0 0 1 .862 0l3.689 3.716 7.756-7.756a.61.61 0 0 1 .862 0l1.294 1.294a.609.609 0 0 1 .001.862z"
                />
              </svg>
            </span>
          </span>
          <!-- <div class="header-elements">
                        <span class="user-profil-name">Nutribe</span>
                    </div> -->
        </div>
        <div>
          <div></div>
          <div class="comment-main reply-content">
            {{ reponse }}
          </div>
        </div>
        <!-- <div>
                    <div class="comment-footer">
                        <span class="comment-date">{{ getFormatedDate(adminReply.date) }}</span>
                    </div>
                </div> -->
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
