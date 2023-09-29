// const currentUrl = window.location.host;

// export const baseUrl = currentUrl.includes("localhost") || currentUrl.includes("kksa") ? "http://my-nutribe.kksa/" : "http://my.nutribe.fr/";
export const baseUrl = "https://reviews.habeuk.com";
export const getRequestPath = "/api/v1/reviews?";
export const likePath = "/shopify/like-review.php?id=";//id represent the id of the comment getting de action
export const dislikePath = "/shopify/dislike-review.php?id=";//id represent the id of the comment getting de action
export const resetActionVar = "&reset=1"
export const appId = "app";
export const dataSelector = "data-product-handler";
export const paginator = {
    currentPage: 1,
    commentsPerPages: 10,
    indexPrinted: 5,
} 