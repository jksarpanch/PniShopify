import { ShopifyFunctions } from './shopify-functions'
import './style.css';
import html from './test.html';
export class ShopifyPage {
  // Add interface
  private wf: ShopifyFunctions;
  constructor() {
    this.wf = new ShopifyFunctions();
  }

  replacePage = () => {
    console.log(html)
    document.getElementById('pni-shopify-widget').innerHTML = html;
    // document.getElementById('')
  }
  
}