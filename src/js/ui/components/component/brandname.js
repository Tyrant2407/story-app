import LitShadowDom from '../../../base/LitWithShadowDom';
import { html } from 'lit';
import "../../../../sass/vendors-extensions/bootstrap/_brandname.scss";
import "../../../../sass/main.scss";

class BrandNameApp extends LitShadowDom {

  createRenderRoot() {
    return this; 
  }
  
  constructor() {
    super();
  }
  
  render() {
    return html`
      <div class="brandname"><h1>Story App</h1></div>
    `;
  }
}

customElements.define('brandname-component', BrandNameApp);
