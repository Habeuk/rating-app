<script lang="ts">
import { h, ref } from 'vue';
import StarsRate from './StarsRate.vue';
import PercentBar from './PercentBar.vue';

export default {
  props: {
    ratesCounts: Array<number>
  },
  setup(props) {

    const activeStarsClass = "comment-icon-star";
    const emptyStarsClass = "comment-icon-empty-star"
    /**
     * @param {number} numberStars
     * @return Array of span containing html code for five stars
   */
    const createHTMLStars = (numberStars: number) => {
      return h("span", { class: numberStars ? activeStarsClass : emptyStarsClass })
    }
    /**
     * 
     * @param {number} part 
     * @param {number} total 
     */
    const calcPercent = (part: number, total: number) => {
      return (part / total) * 100;
    }

    //initialize array with number of one egal to the number of active ex: stars 1 = [1, 0, 0, 0, 0]
    let stars = ref(new Array());
    let sum = 0;
    let counts = props.ratesCounts;

    counts?.forEach(num => {
      sum += num
    });

    for (let index = 0; index < 5; index++) {
      let temp = new Array(0, 0, 0, 0, 0);
      for (let i = 0; i < index; i++) {
        temp[i] = 1;
      }
      stars.value.push(temp);
    }
    let resumeLabel = sum + " Avis";
    return { sum, calcPercent };
  },
  components: { StarsRate, PercentBar }
}
</script>

<template>
  <div tabindex="0">
    <div class="comments-review">
      <span class="yotpo-stars">
        <StarsRate :stars-number="5" />
        <span>{{ sum + " Avis" }}</span>
      </span>
    </div>
    <div class="comments-resume">
      <div class="comments-resume-stars">
        <StarsRate v-for="index in 5" :key="6 - index" :stars-number="6 - index" />
      </div>
      <div class="comments-resume-counts">
        <span v-for="index in 5" :key="6 - index">({{ ratesCounts[index - 1] }})</span>
      </div>
      <div v-for="index in 5" :key="6 - index" class="graph-container">
        <div class="comments-resume-graphs">
          <PercentBar :percentage="calcPercent(ratesCounts[index - 1], sum)" />
        </div>
      </div>
    </div>
  </div>
</template>
    
<style scoped></style>
