import { LitElement, html } from 'lit';
import '../../../../sass/vendors-extensions/bootstrap/_upbutton.scss';

class ScrollToTopButton extends LitElement {
  constructor() {
    super();
    this.isVisible = false;
    this._scrollListener = this._onScroll.bind(this);
  }

  createRenderRoot() {
    return this; // Disable shadow DOM to apply global styles
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this._scrollListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._scrollListener);
  }

  render() {
    return html`
      <button
        class="scroll-to-top ${this.isVisible ? '' : 'hidden'}"
        @click="${this._scrollToTop}"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    `;
  }

  _onScroll() {
    this.isVisible = window.scrollY > 200;
    this.requestUpdate();
  }

  _scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

customElements.define('scroll-to-top-button', ScrollToTopButton);
