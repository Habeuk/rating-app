<script lang="jsx">
import { h } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    commentsPerPage: Number,
    currentPage: Number,
    indexPrinted: Number,
  },
  setup(props) {
    const store = useStore();
    const pageNumber = Math.floor(store.state.commentsNumber / props.commentsPerPage);
    const finalIndexNbr = ref(
      props.indexPrinted % 2 ? props.indexPrinted : props.indexPrinted + 1
    );
    const firstIndex = ref(1);
    const lastIndex = ref(0);
    if (props.currentPage == pageNumber) {
      firstIndex.value = 1 + pageNumber - props.indexPrinted;
    } else {
      firstIndex.value = currentPage - floor(finalIndexNbr.value / 2);
    }
    lastIndex.value = firstIndex.value + finalIndexNbr.value;

    if (firstIndex.value < 1) {
      lastIndex.value += 1 - firstIndex.value;
      firstIndex = 1;
    }
    lastIndex.value = lastIndex.value > pageNumber ? pageNumber : lastIndex.value;

    const getPageCount = computed(() => {
      return lastIndex.value - firstIndex + 1;
    });

    return {
      firstIndex,
      lastIndex,
      getPageCount,
    };
  },
};
</script>

<template>
  <nav role="comments-navigation">
    <div>
      <a class="previous-comments" href="#"></a>
      <a href="#" class="menu-item goTo"> 1 </a>
      <a class="next-comments" href="#"></a>
    </div>
  </nav>
</template>
