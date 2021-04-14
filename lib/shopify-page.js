"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyPage = void 0;
var shopify_functions_1 = require("./shopify-functions");
require("./style.css");
var test_html_1 = require("./test.html");
var ShopifyPage = (function () {
    function ShopifyPage() {
        this.replacePage = function () {
            console.log(test_html_1.default);
            document.getElementById('pni-shopify-widget').innerHTML = test_html_1.default;
        };
        this.wf = new shopify_functions_1.ShopifyFunctions();
    }
    return ShopifyPage;
}());
exports.ShopifyPage = ShopifyPage;
//# sourceMappingURL=shopify-page.js.map