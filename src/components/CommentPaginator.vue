<script lang="jsx">
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    currentPage: Number,
    commentsPerPages: Number,
    indexPrinted: Number,
  },
  emits: ["changePage"],
  setup(props, { emit }) {
    const store = useStore();
    const pagesNumber = Math.ceil(store.state.commentsNumber / props.commentsPerPages);
    const finalIndexNbr = ref(
      props.indexPrinted % 2 ? props.indexPrinted - 1 : props.indexPrinted
    );
    const firstIndex = ref(1);
    const lastIndex = ref(0);
    const getCurrentPage = computed(() => {
      return props.currentPage;
    })

    if (props.currentPage == pagesNumber) {
      firstIndex.value = 1 + pagesNumber - props.indexPrinted;
    } else {
      firstIndex.value = props.currentPage - Math.floor(finalIndexNbr.value / 2);
    }
    lastIndex.value = firstIndex.value + finalIndexNbr.value;

    if (firstIndex.value < 1) {
      lastIndex.value += 1 - firstIndex.value;
    }
    if (lastIndex.value > pagesNumber) {
      firstIndex.value -= lastIndex.value - pagesNumber;
    }
    lastIndex.value = lastIndex.value > pagesNumber ? pagesNumber : lastIndex.value;
    firstIndex.value = firstIndex.value < 1 ? 1 : firstIndex.value;

    const getPageCount = computed(() => {
      return lastIndex.value - firstIndex.value + 1;
    });
    const getPageNumber = computed(() => {
      return Math.ceil(store.state.commentsNumber / props.commentsPerPages);
    });
    const changePage = (index, event) => {
      event.preventDefault();
      if (index >= 1 && index <= pagesNumber)
        emit('changePage', index)
    }

    return {
      firstIndex,
      CP: props.currentPage,
      getPageCount,
      getPageNumber,
      finalIndexNbr,
      getCurrentPage,
      changePage,
    };
  },
};
</script>

<template>
  <nav class="comments-navigation">
    <div class="comments-indexes">
      <a @click="changePage(getCurrentPage - 1, $event)" class="previous-comments puce go-to"
        :class="{ disabled: getCurrentPage <= 1 }" href="#"><svg width="800" fill="none" height="800" viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg" transform="rotate(90)">
          <path fill="#fff" fill-opacity=".01" d="M0 0h48v48H0z" />
          <path d="M37 18 25 30 13 18" stroke="currentColor" stroke-width="4" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </a>
      <a v-for="range in getPageCount" :key="range" @click="changePage(firstIndex + range - 1, $event)" href="#"
        class="menu-item go-to" :class="{ active: getCurrentPage == firstIndex + range - 1 }">
        {{ firstIndex + range - 1 }}
      </a>
      <a @click="changePage(getCurrentPage + 1, $event)" class="next-comments puce go-to"
        :class="{ disabled: getCurrentPage >= getPageNumber }" href="#"><svg width="800" height="800" viewBox="0 0 48 48"
          fill="none" xmlns="http://www.w3.org/2000/svg"
          transform="matrix(-1.8369701987210297e-16,-1,1,-1.8369701987210297e-16,0,0)" version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <path fill="#fff" fill-opacity=".01" d="M0 0h48v48H0z"></path>
          <path d="M37 18 25 30 13 18" stroke="currentColor" stroke-width="4" stroke-linecap="round"
            stroke-linejoin="round">
          </path>
        </svg></a>
    </div>
  </nav>
</template>
