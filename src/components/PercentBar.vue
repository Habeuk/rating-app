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
  setup(props) {
    console.log("rate: ", props.rateSelected);
    const store = useStore();
    const isSelected = computed(() => {
      return props.rate == store.state.rateSelected ? true : false;
    });
    const isFiltered = computed(() => {
      return props.rate != store.state.rateSelected && store.state.rateSelected;
    });
    console.log(store.state);
    const onSelect = () => {
      if (props.percentage) {
        store.dispatch("set_selected_rate", props.rate);
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
  <div
    @click="onSelect"
    class="comment-progressbar-container"
    :style="{ cursor: percentage != 0 ? 'pointer' : 'unset' }"
  >
    <div
      :class="{
        selected: isSelected,
        inactive: isFiltered,
        general: !(isSelected || isFiltered),
      }"
      class="comment-progressbar"
      :style="{ width: percentage + '%' }"
    ></div>
  </div>
</template>
