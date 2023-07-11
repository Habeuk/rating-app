<script>
import { h } from 'vue';
export default {
    props: {
        starsNumber: Number,
        label: {
            type: String,
            default: ""
        },
        labelClass: {
            type: String,
            default: ""
        },
    },
    setup(props) {
        console.log("props: ", props);
        const activeStarsClass = "comment-icon-star";
        const emptyStarsClass = "comment-icon-empty-star";
        let stars = Array(5);
        for (let index = 0; index < stars.length; index++) {
            stars[index] = index < props.starsNumber ? 1 : 0;

        }
        let htmlStars = stars.map((element) => {
            return h("span", { class: element ? activeStarsClass : emptyStarsClass }, "*");
        });
        console.log("type: ", typeof (htmlStars[0]));
        return () => h('span', [
            ...htmlStars,
            (props.label == "") ?
                "" :
                h("span", { class: props.labelClass }, props.label)
        ]);
    }
}
</script>