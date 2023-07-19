<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    percentage: Number,
    rate: Number,
    rateSelected: Number,
  },
  emits: ["onFilter"],
  setup(props, { emit }) {
    const store = useStore();
    const isSelected = computed(() => {
      return props.rate == store.state.rateSelected ? true : false;
    });
    const isFiltered = computed(() => {
      return props.rate != store.state.rateSelected && store.state.rateSelected;
    });
    const onSelect = () => {
      if (props.percentage) {
        emit("onFilter", props.rate);
      }
    };
    return {
      ...props,
      isSelected,
      selected: store.state.rateSlected,
      isFiltered,
      onSelect,
    };
  },
};
</script>
<template>
  <div @click="onSelect" class="comment-progressbar-container" :style="{ cursor: percentage != 0 ? 'pointer' : 'unset' }">
    <div :class="{
      selected: isSelected,
      inactive: isFiltered,
      general: !(isSelected || isFiltered),
    }" class="comment-progressbar" :style="{ width: percentage + '%' }"></div>
  </div>
</template>
