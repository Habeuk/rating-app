<script lang="ts">
import { h, ref } from 'vue';
import StarsRate from './StarsRate.vue';

export default {
  props: {
    ratesCounts: Array<number>
  },
  setup(props) {

    const activeStarsClass = "comment-icon-star";
    const emptyStarsClass = "comment-icon-empty-star"

    //initialize array with number of one egal to the number of active ex: stars 1 = [1, 0, 0, 0, 0]
    let stars = ref(new Array());
    let sum = 0;
    let counts = props.ratesCounts;
    console.log("hello there: ", counts);
    counts?.forEach(num => {
      sum += num
    });
    console.log(sum);
    for (let index = 0; index < 5; index++) {
      let temp = new Array(0, 0, 0, 0, 0);
      for (let i = 0; i < index; i++) {
        temp[i] = 1;
        sum++;
      }
      stars.value.push(temp);
    }
    let resumeLabel = sum + "Avis";


    // const rates = {
    //   oneStar: h("span",
    //     stars[0].map(num => funtion)
    //   )
    // }


    /**
     * @param {number} numberStars
     * @return Array of span containing html code for five stars
   */
    function createHTMLStars(numberStars: number) {
      return h("span", { class: numberStars ? activeStarsClass : emptyStarsClass })
    }
  }
}
</script>

<template>
  <div class="yotpo-bottomline-box-1 yotpo-stars-and-sum-reviews" tabindex="0">
    <span class="yotpo-stars">
      <StarsRate stars-number="5" :label="sum + ' Avis'" />
    </span>
  </div>
</template>
    
<style scoped></style>
