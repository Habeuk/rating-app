import axios from 'axios';


const currentUrl = window.location.host;
const baseUrl = currentUrl.includes("localhost") || currentUrl.includes("kksa") ? "http://my-nutribe.kksa/" : "http://my.nutribe.fr/";

export default axios.create({
    baseURL: baseUrl,
})
