<script lang="ts">
import { computed, h, ref } from 'vue'
import StarsRate from './StarsRate.vue'
import PercentBar from './PercentBar.vue'

export default {
  props: {
    ratesCounts: Array,
    rateSelected: Number
  },
  emits: ['applyFilter'],
  setup(props, { emit }) {
    const calcSum = computed(() => {
      let sum = 0
      props.ratesCounts?.forEach((element) => {
        sum += element
      })
      return sum
    })
    /**
     * @param {number} numberStars
     */
    const createHTMLStars = (numberStars: number) => {
      return h('span', { class: numberStars ? activeStarsClass : emptyStarsClass })
    }
    /**
     *
     * @param {number} part
     * @param {number} total
     */
    const calcPercent = (part: number, total: number) => {
      return (part / total) * 100
    }
    const applyFilter = (starsNumber: number) => {
      isFiltered.value = true
      emit('applyFilter', starsNumber)
    }

    const isFiltered = ref(false)
    //initialize array with number of one egal to the number of active ex: stars 1 = [1, 0, 0, 0, 0]
    let stars = ref(new Array())

    for (let index = 0; index < 5; index++) {
      let temp = new Array(0, 0, 0, 0, 0)
      for (let i = 0; i < index; i++) {
        temp[i] = 1
      }
      stars.value.push(temp)
    }
    const activeStarsClass = 'comment-icon-star'
    const emptyStarsClass = 'comment-icon-empty-star'
    return {
      isFiltered,
      rateSelected: props.rateSelected,
      calcPercent,
      calcSum,
      applyFilter
    }
  },
  components: { StarsRate, PercentBar }
}
</script>

<template>
  <div class="resume-container">
    <div class="comments-review">
      <span class="d-flex align-items-center">
        <StarsRate class="stars-review d-flex" :percentage="100" />
        <span class="review-label h4 m-0">{{ calcSum + ' Avis' }}</span>
      </span>
    </div>
    <div class="comments-resume">
      <div class="comments-resume-stars">
        <StarsRate
          v-for="index in 5"
          :key="6 - index"
          :percentage="20 * (6 - index)"
          class="stars-set d-flex"
        />
      </div>
      <div class="comments-resume-counts">
        <span class="resume-count font-weight-bold" v-for="index in 5" :key="6 - index"
          >({{ ratesCounts[5 - index] }})</span
        >
      </div>
      <div class="comments-resume-graphs">
        <div v-for="index in 5" :key="6 - index" class="graph-container">
          <PercentBar
            @onFilter="applyFilter"
            :percentage="calcPercent(ratesCounts[5 - index], calcSum)"
            :rate="6 - index"
            :rate-selected="rateSelected"
            :key="20 - index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
