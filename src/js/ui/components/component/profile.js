import { LitElement, html } from 'lit';
import { msg, str, updateWhenLocaleChanges } from '@lit/localize';
import "../../../../sass/dashboard.scss";
import "../../../../sass/main.scss";

class ProfileCard extends LitElement {
    constructor() {
        super();
        updateWhenLocaleChanges(this);
    }

    createRenderRoot() {
        return this; 
    }

    render() {
        return html`
          <div class="profile-card">
                <div class="profile-img">
                    <img src="/img/dicoding.png" alt="Profile Image">
                </div>
                <div class="profile-content">
                    <h2 class="profile-name">${msg(str`Introducing our Story Application`)}</h2>
                    <p class="profile-description">${msg(str`Web Developer | Dicoding`)}</p>
                    <button class="profile-btn">${msg(str`Learn more`)}</button>
                </div>
            </div>
        `;
    }
}

customElements.define('profile-card', ProfileCard);









