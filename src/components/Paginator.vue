<script lang="jsx">
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    currentPage: Number,
    commentsPerPages: Number,
    indexPrinted: Number,
  },
  setup(props) {
    const store = useStore();
    const pagesNumber = Math.ceil(store.state.commentsNumber / props.commentsPerPages);
    const finalIndexNbr = ref(
      props.indexPrinted % 2 ? props.indexPrinted : props.indexPrinted + 1
    );
    const firstIndex = ref(1);
    const lastIndex = ref(0);
    if (props.currentPage == pagesNumber) {
      firstIndex.value = 1 + pagesNumber - props.indexPrinted;
    } else {
      firstIndex.value = props.currentPage - Math.floor(finalIndexNbr.value / 2);
    }
    console.log("fistIndex: ", props.currentPage);
    lastIndex.value = firstIndex.value + finalIndexNbr.value;

    if (firstIndex.value < 1) {
      lastIndex.value += 1 - firstIndex.value;
    }
    if (lastIndex.value > pagesNumber) {
      firstIndex.value -= pagesNumber - lastIndex.value
    }
    lastIndex.value = (lastIndex.value > pagesNumber) ? pagesNumber : lastIndex.value;
    firstIndex.value = (firstIndex.value < 1) ? 1 : firstIndex.value;

    const getPageCount = computed(() => {
      return lastIndex.value - firstIndex.value + 1;
    });
    const getPageNumber = computed(() => {
      return Math.ceil(store.state.commentsNumber / props.commentsPerPages);
    })
    return {
      firstIndex,
      currentPage: props.currentPage,
      getPageCount,
      getPageNumber,
    };
  },
};
</script>

<template>
  <nav role="comments-navigation">
    <div>
      <a class="previous-comments" :class="{ active: currentPage > 1 }" href="#"></a>
      <a v-for="range in getPageCount" :key="range" href="#" class="menu-item goTo"
        :class="{ active: (currentPage == (firstIndex + range - 1)) }"> {{ firstIndex + range - 1 }} </a>
      <a class="next-comments" :class="{ active: currentPage < getPageNumber }" href="#"></a>
    </div>
  </nav>
</template>
