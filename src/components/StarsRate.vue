<script lang="jsx">
import { h } from "vue";
export default {
  props: {
    starsNumber: Number,
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
    let stars = Array(5);
    let half_star = (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="a">
            <stop offset="50%" stop-color="#ff0" />
            <stop offset="50%" stop-color="gray" />
          </linearGradient>
        </defs>
        <path
          fill="url(#a)"
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
      stars[index] = index < props.starsNumber ? 1 : 0;
    }
    let htmlStars = stars.map((element) => {
      return h(
        "span",
        { class: [element ? activeStarsClass : emptyStarsClass, "comment-stars"] },
        star
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
