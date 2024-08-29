import { LitElement, html } from 'lit';
import '../../../../sass/vendors-extensions/bootstrap/_alert.scss';
import '../../../../sass/main.scss';

class Alertmsg extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Perhatian!</strong> Untuk fitur ini belum aktif dalam menambahkan ya :)
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }
}

customElements.define('alert-card', Alertmsg);
