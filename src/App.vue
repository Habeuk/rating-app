<script setup lang="jsx">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import RatingResume from "./components/RatingResume.vue";
import CommentCard from "./components/CommentCard.vue";
import CommentPaginator from "./components/CommentPaginator.vue";

// const appLabel = "Proposé par Vysti";
const store = useStore();

const product_handler = ref("mct-pure-huile-mct-coco-bouteille-en-verre");
store.dispatch("loadData", { product_handler: product_handler.value });

const commentsTitle = computed(() => {
  return "Avis (" + store.state.commentsNumber + ")";
});
const meta = {
  label: "Proposé par ",
  logo: "/src/assets/Vysti.png",
};

const getComments = computed(() => {
  return store.getters.getFormatedComments;
});
const paginate = computed(() => {
  return store.state.commentsNumber > store.state.paginator.commentsPerPages;
});
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
  store.dispatch("loadData", { product_handler: product_handler.value, note: newFilter });
};
</script>

<template>
  <div class="comments-widget">
    <div class="comments-header"></div>
    <RatingResume @applyFilter="updateFilter" :rates-counts="store.state.summary"
      :rate-selected="store.state.rateSelected" />
    <div class="comments-resumed small-boxes">
      <span>{{ commentsTitle }}</span>
    </div>
    <div class="comments-content">
      <CommentCard v-for="element in getComments" v-bind="element" :key="element.id" />
      <CommentPaginator v-if="paginate" v-bind="store.state.paginator" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comments {
  &-widget {
    width: 100%;
  }

  &-header {
    padding: 25px 10px 0;
  }
}
</style>
