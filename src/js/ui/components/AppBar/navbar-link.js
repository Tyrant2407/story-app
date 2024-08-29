import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from '../../../base/LitWithOutShadowDom';
import LocalePicker from '../component/LocalePicker';
import NavLinkAuth from './NavLinkAuth';
import '../../../../sass/vendors-extensions/bootstrap/_dropdown.scss';

class NavLinkApp extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
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
                <a class="nav-link" href="https://github.com/Tyrant2407">Github</a>
              </li>
              <nav-link-auth id="userLoggedMenu"></nav-link-auth>
                <li class="nav-item">
                  <a class="nav-link" href="/auth/login.html" id="loginMenu">${msg(`Masuk`)}</a>
                </li>
              </li>
              <li class="nav-item">
                  <locale-picker class="dropdown"></locale-picker>
              </li>
      </ul>
    `;
  }
}

customElements.define('navlink-component', NavLinkApp);
