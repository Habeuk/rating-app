<script setup lang="jsx">
import { computed } from 'vue'
import { useStore } from 'vuex'
import RatingResume from './components/RatingResume.vue'
import CommentCard from './components/CommentCard.vue'
import CommentPaginator from './components/CommentPaginator.vue'
import addComment from './components/addComment.vue'

// const appLabel = "Proposé par Vysti";
const store = useStore()

const commentsTitle = computed(() => {
  return 'Avis (' + store.state.commentsNumber + ')'
})

const getPaginator = computed(() => {
  return store.state.paginator
})
const getComments = computed(() => {
  return store.getters.getFormatedComments
})
const paginate = computed(() => {
  return store.state.commentsNumber > store.state.paginator.commentsPerPages
})
/**
 * function to get the count of each rate
 * @param {Array} comments
 * @return {Array} count of each rate
 */
// function resumeRates(comments) {
//   let rates = [0, 0, 0, 0, 0];
//   comments.forEach((comment) => {
//     rates[comment.rate - 1]++;
//   });
//   return rates;
// }

const updateFilter = (newFilter) => {
  store.dispatch('loadData', { note: newFilter })
}
const changePage = (page) => {
  store.dispatch('loadData', { page })
}
const likeComment = (payload) => {
  store.dispatch('likeComment', payload)
}
const dislikeComment = (payload) => {
  store.dispatch('dislikeComment', payload)
}
</script>

<template>
  <div class="comments-widget">
    <RatingResume
      @applyFilter="updateFilter"
      :rates-counts="store.state.summary"
      :rate-selected="store.state.rateSelected"
      class="mb-5"
    />
    <div class="clear-fix"></div>
    <div @click="updateFilter(0)" v-if="store.state.rateSelected" class="reset-comments">
      Voir tous les avis
    </div>
    <addComment></addComment>
    <div class="comments-resumed small-boxes">
      <span>{{ commentsTitle }}</span>
    </div>

    <div class="comments-content">
      <CommentCard
        @likeAction="likeComment"
        @dislikeAction="dislikeComment"
        v-for="element in getComments"
        v-bind="element"
        :key="element.id"
      />
      <CommentPaginator v-if="paginate" v-bind="getPaginator" @changePage="changePage" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comments {
  &-widget {
    width: 100%;
  }
}
</style>
