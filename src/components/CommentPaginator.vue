<script lang="jsx">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  props: {
    currentPage: Number,
    commentsPerPages: Number,
    indexPrinted: Number
  },
  emits: ['changePage'],
  setup(props, { emit }) {
    const store = useStore()
    //const pagesNumber = Math.ceil(store.state.commentsNumber / props.commentsPerPages)
    //**************refs******************//
    const finalIndexNbr = ref(props.indexPrinted % 2 ? props.indexPrinted - 1 : props.indexPrinted)
    //*************computed***************//
    const getCurrentPage = computed(() => {
      return props.currentPage
    })

    const getPageNumber = computed(() => {
      return Math.ceil(store.state.commentsNumber / props.commentsPerPages)
    })

    const getIndexes = computed(() => {
      let firstIndex = 1
      let lastIndex = 0
      if (props.currentPage == getPageNumber.value) {
        firstIndex = 1 + getPageNumber.value - props.indexPrinted
      } else {
        firstIndex = props.currentPage - Math.floor(finalIndexNbr.value / 2)
      }
      lastIndex = firstIndex + finalIndexNbr.value

      if (firstIndex < 1) {
        lastIndex += 1 - firstIndex
      }
      if (lastIndex > getPageNumber.value) {
        firstIndex -= lastIndex - getPageNumber.value
      }
      lastIndex = lastIndex > getPageNumber.value ? getPageNumber.value : lastIndex
      firstIndex = firstIndex < 1 ? 1 : firstIndex
      return { first: firstIndex, last: lastIndex, count: lastIndex - firstIndex + 1 }
    })

    const changePage = (index, event) => {
      event.preventDefault()
      if (index >= 1 && index <= getPageNumber.value) emit('changePage', index)
    }

    return {
      getIndexes,
      CP: props.currentPage,
      getPageNumber,
      finalIndexNbr,
      getCurrentPage,
      changePage
    }
  }
}
</script>

<template>
  <nav class="comments-navigation">
    <div class="comments-indexes">
      <a
        @click="changePage(getCurrentPage - 1, $event)"
        class="previous-comments puce go-to"
        :class="{ disabled: getCurrentPage <= 1 }"
        href="#"
        ><svg
          width="800"
          fill="none"
          height="800"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(90)"
        >
          <path fill="#fff" fill-opacity=".01" d="M0 0h48v48H0z" />
          <path
            d="M37 18 25 30 13 18"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
      <a
        v-for="range in getIndexes.count"
        :key="range"
        @click="changePage(getIndexes.first + range - 1, $event)"
        href="#"
        class="menu-item go-to"
        :class="{ active: getCurrentPage == getIndexes.first + range - 1 }"
      >
        {{ getIndexes.first + range - 1 }}
      </a>
      <a
        @click="changePage(getCurrentPage + 1, $event)"
        class="next-comments puce go-to"
        :class="{ disabled: getCurrentPage >= getPageNumber }"
        href="#"
        ><svg
          width="800"
          height="800"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="matrix(-1.8369701987210297e-16,-1,1,-1.8369701987210297e-16,0,0)"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path fill="#fff" fill-opacity=".01" d="M0 0h48v48H0z"></path>
          <path
            d="M37 18 25 30 13 18"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path></svg
      ></a>
    </div>
  </nav>
</template>
