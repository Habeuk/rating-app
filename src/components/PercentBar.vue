<script>
import { h } from 'vue';

export default {
    props: {
        percentage: Number
    },
    setup(props) {
        return () => h("div", { class: "comment-progressbar-container" }, h("div", {
            style: { width: props.percentage + "%" },
            class: "comment-progressbar"
        }));
    }
}
</script>