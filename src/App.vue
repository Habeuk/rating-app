<script setup lang="ts">
import { h, ref, computed } from 'vue';
import RatingResume from './components/RatingResume.vue';

const appLabel = "Proposé par Vysti";
const comments = ref([
  {
    name: "",
    state: true,
    rate: 2,
    title: "good",
    content: "Poudre ultra crémeuse, un régal! Faim coupée à coup sûr ",
    date: 1688986905420,
    replies: []
  },
  {
    name: "",
    state: true,
    rate: 2,
    title: "good",
    content: "",
    date: 1688986905420,
    replies: []
  },
  {
    name: "",
    state: true,
    rate: 5,
    title: "good",
    content: "",
    date: 1688986905420,
    replies: []
  },
  {
    name: "",
    state: true,
    rate: 5,
    title: "good",
    content: "",
    date: 1688986905420,
    replies: []
  },
]);
const resume = ref(resumeRates(comments.value));





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
    <RatingResume class="hello_world" :rates-counts="resume" />
    <div class="comments-resumed"></div>
    <div class="comments-reviews"></div>
    <div class="comments-content"></div>
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
