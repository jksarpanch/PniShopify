"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replacePage = void 0;
var shopify_page_1 = require("./shopify-page");
var shopify_functions_1 = require("./shopify-functions");
var sp = new shopify_page_1.ShopifyPage();
var sf = new shopify_functions_1.ShopifyFunctions();
var replacePage = sp.replacePage;
exports.replacePage = replacePage;
var Shopify = (function () {
    function Shopify() {
        console.log('test');
    }
    return Shopify;
}());
//# sourceMappingURL=index.js.map