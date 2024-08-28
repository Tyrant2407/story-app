
import LitWithoutShadowDom from '../../../base/LitWithOutShadowDom';
import { html } from 'lit';
import LocalePicker from '../component/LocalePicker';
import NavLinkAuth from './NavLinkAuth';

class NavLinkApp extends LitWithoutShadowDom {
  constructor() {
    super();
  }
  
  render() {
    return html`
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/story/add.html">Add Page</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/auth/login.html">Login</a>
              </li>
              <li class="nav-item">
                <nav-link-auth class="d-none" id="userLoggedMenu"></nav-link-auth>
              </li>
              <locale-picker></locale-picker>
      </ul>
      <form class="d-flex mt-3" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-success" type="submit">Search</button>
      </form>
    `;
  }
}
  
customElements.define('navlink-component', NavLinkApp);