<script setup lang="jsx">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import RatingResume from "./components/RatingResume.vue";
import CommentCard from "./components/CommentCard.vue";
import CommentPaginator from "./components/CommentPaginator.vue";

// .get("http://my-nutribe.kksa/shopify/get-reviews.php?product_handler=mct-pure-huile-mct-coco-bouteille-en-verre")
// axios.get("/shopify/get-reviews.php?product_handler=" + "mct-pure-huile-mct-coco-bouteille-en-verre")
//   .then((response) => {
//     console.log(response);
//   });

// const appLabel = "Proposé par Vysti";
const store = useStore();

const product_handler = ref("mct-pure-huile-mct-coco-bouteille-en-verre");
store.dispatch("loadData", { product_handler: product_handler.value });

console.log(store.state.paginator);
const comments = ref(store.state.comments);
comments.value = comments.value
  ? comments.value
  : ref([
    {
      id: 0,
      name: "Lelong f.",
      state: true,
      rate: 2,
      title: " Parfait ",
      content: "Nickel, rentrée en cetose rapidement ",
      date: 1688986905420,
      adminReply: {
        name: "admin",
        date: null,
        content: "",
      },
    },
    {
      id: 1,
      name: "Michaël R.",
      state: true,
      rate: 2,
      title: "good",
      content:
        "Excellent !! quasiment sans amertume ça devient un vrai régal et une bonne alternative aux autres édulcorants ! ",
      date: 1688986905420,
      adminReply: {
        name: "admin",
        date: Date.now(),
        content: "this is the reply",
      },
      votesUp: 2,
      votesDown: 4,
    },
    {
      id: 3,
      name: "Vanessa M.",
      state: false,
      rate: 5,
      title: "good",
      content:
        "Huile très agréable pour le café gras. Je l’utilise également pour des préparations sans cuisson. ",
      date: 1688986905420,
      adminReply: {
        name: "admin",
        date: null,
        content: "",
      },
      votesUp: 2,
      votesDown: 4,
    },
    {
      id: 4,
      name: "Miguel B",
      state: true,
      rate: 5,
      title: " Très bon produit Je m’en",
      content:
        "Très bon produit \nJe m’en sers pour à peu près tout y compris dans mon café alterné avec la crème goût vanille. \nA recommander pour les régimes cétogènes 👍 ",
      date: 1688986905420,
      adminReply: {
        name: "admin",
        date: Date.now(),
        content: "this is the reply",
      },
      votesUp: 2,
      votesDown: 4,
    },
  ]);
console.log("there ", comments.value);
const resume = ref(store.getters.getResume);
const commentsTitle = computed(() => {
  return "Avis (" + store.state.commentsNumber + ")";
});
const meta = {
  label: "Proposé par ",
  logo: "/src/assets/Vysti.png",
};

const getComments = computed(() => {
  return store.getters.getFormatedComments;
});
const paginate = computed(() => {
  return store.state.commentsNumber > store.state.paginator.commentsPerPages;
});
/**
 * function to get the count of each rate
 * @param {Array} comments
 * @return {Array} count of each rate
 */
// function resumeRates(comments) {
//   let rates = [0, 0, 0, 0, 0];
//   comments.forEach((comment) => {
//     rates[comment.rate - 1]++;
//   });
//   return rates;
// }

const updateFilter = (newFilter) => {
  store.dispatch("loadData", { product_handler: product_handler.value, note: newFilter });
};
</script>

<template>
  <div class="comments-widget">
    <div class="comments-meta small-boxes">
      <span class="label">{{ meta.label }} </span>
      <div class="comments-meta-logo">
        <img :src="meta.logo" />
      </div>
    </div>
    <div class="comments-header"></div>
    <RatingResume @applyFilter="updateFilter" :rates-counts="resume" :rate-selected="store.data.rateSelected" />
    <div class="comments-resumed small-boxes">
      <span>{{ commentsTitle }}</span>
    </div>
    <div class="comments-content">
      <CommentCard v-for="element in getComments" v-bind="element" :key="element.id" />
      <CommentPaginator v-if="paginate" v-bind="store.state.paginator" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comments {
  &-widget {
    width: 100%;
  }

  &-header {
    padding: 25px 10px 0;
  }
}
</style>
