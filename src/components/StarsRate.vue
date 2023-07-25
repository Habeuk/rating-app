<script lang="jsx">
import { h, handleError, ref } from "vue";
export default {
  props: {
    id: Number,
    starsNumber: Number,
    percentage: Number,
    label: {
      type: String,
      default: "",
    },
    labelClass: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const activeStarsClass = "comment-icon-star";
    const emptyStarsClass = "comment-icon-empty-star";
    const starsNumber = ref(Math.floor(props.percentage / 20));
    const halfPercent = 5 * (props.percentage % 20) + '%'
    let stars = Array(5);
    const id = props.id ? 'linear-gradient-' + props.id : "linear-gradient";
    let halfStar = (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={id}>
            <stop class={activeStarsClass + " comment-stars"} offset={halfPercent} />
            <stop class={emptyStarsClass + " comment-stars"} offset="0%" />
          </linearGradient>
        </defs>
        <path
          fill={"url(#" + id + ")"}
          d="m21.5 9.757-5.278 4.354 1.649 7.389L12 17.278 6.129 21.5l1.649-7.389L2.5 9.757l6.333-.924L12 2.5l3.167 6.333Z"
        />
      </svg>
    );
    let star = (
      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m21.5 9.757-5.278 4.354 1.649 7.389L12 17.278 6.129 21.5l1.649-7.389L2.5 9.757l6.333-.924L12 2.5l3.167 6.333Z" />
      </svg>
    );
    for (let index = 0; index < stars.length; index++) {
      stars[index] = index < starsNumber.value ? 1 : 0;
    }
    if (halfPercent != "0%")
      stars[starsNumber.value] = 2;
    let htmlStars = stars.map((element) => {
      return h(
        "span",
        { class: [element ? activeStarsClass : emptyStarsClass, "comment-stars"] },
        (element == 2) ? halfStar : star
      );
    });
    return () =>
      h("span", [
        ...htmlStars,
        props.label == "" ? "" : h("span", { class: props.labelClass }, props.label),
      ]);
  },
};
</script>
