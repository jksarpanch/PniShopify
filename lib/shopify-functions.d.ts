export declare class ShopifyFunctions {
    jsonData: {};
    apiUrl: string;
    updateProducts: (newData: any) => void;
    fetchProduct: (handleIds: any) => void;
    displayProducts: (productIds: any) => void;
    initializePage: () => void;
    current_page: number;
    records_per_page: number;
    prevPage: () => void;
    nextPage: () => void;
    changePage(page: any): void;
    numPages: () => number;
    constructor();
}
