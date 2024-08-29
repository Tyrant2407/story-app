import { css, html, LitElement } from 'lit';

class SpinnerElement extends LitElement {
  static properties = {
    loading: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: block;
    }
    .spinner {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
    }
    :host([loading]) .spinner {
      display: block;
    }
    .spinner-grow {
      width: 60px;
      height: 60px;
      border: 8px solid #f3f3f3;
      border-top: 8px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  render() {
    return html`
      <div class="spinner">
        <div class="spinner-grow"></div>
      </div>
    `;
  }
}

customElements.define('spinner-element', SpinnerElement);
