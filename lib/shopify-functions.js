"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyFunctions = void 0;
var ShopifyFunctions = (function () {
    function ShopifyFunctions() {
        var _this = this;
        this.jsonData = {};
        this.apiUrl = 'https://pni-dev-p2p-web-api.pnidev.com/api/shopify/getproducts/';
        this.updateProducts = function (newData) {
            var orderList = document.querySelector('#product-list');
            orderList.innerHTML = '';
            for (var i = 0; i < newData.length; i++) {
                var product = newData[i];
                var imageUrl = product.image.src;
                var sortedVariants = product.variants.sort(function (a, b) {
                    return parseFloat(a.price) - parseFloat(b.price);
                });
                var productCard = '<div class="col-md-3 col-6">' +
                    '  <div class="grid-view-item product-card">' +
                    '       <a style="border: none!important" href="/collections/all/products/' + product.handle + '">' +
                    '       <div class="">' +
                    '           <div id="ProductCardImageWrapper-collection-template-' + product.id + '">' +
                    '               <div>' +
                    '                   <img id="ProductCardImage-collection-template-6256811114678" class="" alt="" ' +
                    '                    src="' + imageUrl + '" />' +
                    '               </div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div class="h4">' + product.title + '</div>' +
                    '       <div>$' + sortedVariants[0].price + '</div>  ';
                '  </div></a>' +
                    '</div>';
                orderList.insertAdjacentHTML("beforeend", productCard);
            }
        };
        this.fetchProduct = function (handleIds) {
            if (handleIds) {
                for (var i = 0; i < handleIds.length; i++) {
                    handleIds[i] = handleIds[i].toString();
                }
                fetch(_this.apiUrl, {
                    method: 'POST',
                    body: JSON.stringify({ "handleIds": handleIds })
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    _this.updateProducts(data);
                }).catch(function (error) {
                    console.error('Error:', error);
                });
            }
            else {
                fetch(_this.apiUrl, {
                    method: 'Get'
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    _this.updateProducts(data);
                }).catch(function (error) {
                    console.error('Error:', error);
                });
            }
        };
        this.displayProducts = function (productIds) {
            _this.fetchProduct(productIds);
        };
        this.initializePage = function () {
            setTimeout(function () {
                PniWizard.openInteractiveWizard();
                PniWizard.configureWizard(_this.displayProducts);
                _this.fetchProduct(null);
            }, 2000);
        };
        this.current_page = 1;
        this.records_per_page = 20;
        this.prevPage = function () {
            if (_this.current_page > 1) {
                _this.current_page--;
                _this.changePage(_this.current_page);
            }
        };
        this.nextPage = function () {
            if (_this.current_page < _this.numPages()) {
                _this.current_page++;
                _this.changePage(_this.current_page);
            }
        };
        this.numPages = function () {
            return Math.ceil(100 / _this.records_per_page);
        };
        this.changePage(1);
        this.initializePage();
    }
    ShopifyFunctions.prototype.changePage = function (page) {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var page_span = document.getElementById("page");
        if (page < 1)
            page = 1;
        if (page > this.numPages())
            page = this.numPages();
        page_span.innerHTML = page;
        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        }
        else {
            btn_prev.style.visibility = "visible";
        }
        if (page == this.numPages()) {
            btn_next.style.visibility = "hidden";
        }
        else {
            btn_next.style.visibility = "visible";
        }
    };
    return ShopifyFunctions;
}());
exports.ShopifyFunctions = ShopifyFunctions;
//# sourceMappingURL=shopify-functions.js.map