<script setup lang="ts">
import { h, ref, computed } from 'vue';
import RatingResume from './components/RatingResume.vue';
import CommentCard from './components/CommentCard.vue';

const appLabel = "Proposé par Vysti";
const comments = ref([
  {
    name: "Lelong f.",
    state: true,
    rate: 2,
    title: " Parfait ",
    content: "Nickel, rentrée en cetose rapidement ",
    date: 1688986905420,
    reply: ""
  },
  {
    name: "Michaël R.",
    state: true,
    rate: 2,
    title: "good",
    content: "Excellent !! quasiment sans amertume ça devient un vrai régal et une bonne alternative aux autres édulcorants ! ",
    date: 1688986905420,
    reply: "",
    votesUp: 2,
    votesDown: 4,
  },
  {
    name: "Vanessa M.",
    state: false,
    rate: 5,
    title: "good",
    content: "Huile très agréable pour le café gras. Je l’utilise également pour des préparations sans cuisson. ",
    date: 1688986905420,
    reply: "",
    votesUp: 2,
    votesDown: 4,
  },
  {
    name: "Miguel B",
    state: true,
    rate: 5,
    title: " Très bon produit Je m’en",
    content: "Très bon produit \nJe m’en sers pour à peu près tout y compris dans mon café alterné avec la crème goût vanille. \nA recommander pour les régimes cétogènes 👍 ",
    date: 1688986905420,
    reply: "",
    votesUp: 2,
    votesDown: 4,
  },
]);
const resume = ref(resumeRates(comments.value));
const commentsTitle = "Avis (" + comments.value.length + ")";




/**
 * function to get the count of each rate
 * @param {Array} comments
 * @return {Array} count of each rate
 */
function resumeRates(comments: Array<{ rate: number }>): Array<number> {
  let rates = [0, 0, 0, 0, 0];
  comments.forEach(comment => {
    rates[comment.rate - 1]++;
  });
  return rates;
}
</script>

<template>
  <div class="comments-widget">
    <div class="comments-header"></div>
    <RatingResume :rates-counts="resume" />
    <div class="comments-resumed">
      <span>{{ commentsTitle }}</span>
    </div>
    <div class="comments-content">
      <CommentCard v-for="element in comments" v-bind="element" />
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
