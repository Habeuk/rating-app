import { createApp } from "vue";
import axios from "./axios-configure";
import StarsRate from "./components/StarsRate.vue";
import './assets/styles/rateStars.scss';

const element = Array.prototype.slice.call(document.getElementsByClassName("rating-app-item"));
let count = 1;
element.forEach(element => {
    const product_handler = element.getAttribute("data-product-handler");
    const url = "/shopify/get-reviews.php?minify=1&" + "product_handler=" + product_handler;
    const temp = count;
    axios.get(url)
        .then((response) => {
            if (response.status == 200) {
                console.log("product: " + product_handler + " percentage: " + response.data.minify.mean);
                createApp(StarsRate, {
                    percentage: response.data.minify.mean,
                    label: response.data.minify.count + " Avis",
                    id: temp
                }).mount(element);
            }
        })
        .catch((err) => {
            console.log("something went wrong: ", err);
            createApp(StarsRate, {
                percentage: 0,
                id: temp,
                label: "0 Avis",
            }).mount(element);
        })
    console.log(count);
    count += 1;
});