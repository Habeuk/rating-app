<script>
import { ref, computed } from 'vue';
export default {
    props: {
        percentage: Number,
        rate: Number,
        rateSelected: Number
    },
    emits: ["onFilter"],
    setup(props, { emit }) {
        console.log("rate: ", props.rateSelected);
        const isSelected = computed(() => {
            return (props.rate == props.rateSelected);
        });
        const onSelect = () => {
            if (props.percentage) {
                emit("onFilter", props.rate);
            }
        }
        return {
            ...props,
            isSelected,
            onSelect
        };
    }
}
</script>
<template>
    <div @click="onSelect" class="comment-progressbar-container" :class="{ selected: isSelected }"
        :style="{ cursor: percentage != 0 ? 'pointer' : 'unset' }">
        <div class="comment-progressbar" :style="{ width: percentage + '%' }">
        </div>
    </div>
</template>