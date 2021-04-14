declare var PniWizard
export class ShopifyFunctions {
    jsonData = {};
    apiUrl = 'https://pni-dev-p2p-web-api.pnidev.com/api/shopify/getproducts/';

    updateProducts = (newData) =>{
        let orderList = document.querySelector('#product-list')
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
                '       <div>$' + sortedVariants[0].price + '</div>  '
            '  </div></a>' +
                '</div>'
            orderList.insertAdjacentHTML("beforeend", productCard);
        }
    }
    fetchProduct = (handleIds) =>{

        if (handleIds) {
            for (var i = 0; i < handleIds.length; i++) {
                handleIds[i] = handleIds[i].toString();
            }
            fetch(this.apiUrl, {
                method: 'POST',
                body: JSON.stringify({ "handleIds": handleIds })
            }).then((response) =>{
                return response.json();
            }).then((data) =>{
                this.updateProducts(data)
            }).catch((error) => {
                console.error('Error:', error);
            });
        }
        else {
            fetch(this.apiUrl, {
                method: 'Get'
            }).then((response) => {
                return response.json();
            }).then((data) =>{
                this.updateProducts(data)
            }).catch((error) => {
                console.error('Error:', error);
            });

        }
    }
    displayProducts = (productIds) => {
        this.fetchProduct(productIds);
    }

    initializePage = () => {
        setTimeout(() => {
            PniWizard.openInteractiveWizard();
            PniWizard.configureWizard(this.displayProducts);
            this.fetchProduct(null)
        }, 2000)
    }


    // Pagination
    current_page = 1;
    records_per_page = 20;
    prevPage = () => {
        if (this.current_page > 1) {
            this.current_page--;
            this.changePage(this.current_page);
        }
    }

    nextPage = () => {
        if (this.current_page < this.numPages()) {
            this.current_page++;
            this.changePage(this.current_page);
        }
    }

    changePage(page) {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var page_span = document.getElementById("page");

        // Validate page
        if (page < 1) page = 1;
        if (page > this.numPages()) page = this.numPages();


        page_span.innerHTML = page;

        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }

        if (page == this.numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";

        }
    }
    numPages = () =>{
        return Math.ceil(100 / this.records_per_page);
    }
    constructor() {
        this.changePage(1)
        this.initializePage()
    }

}