import { html } from 'lit';
import LitWithoutShadowDom from '../../../base/LitWithOutShadowDom';
import Socmed from '../icon/socmed';

class FooterApp extends LitWithoutShadowDom {
  constructor() {
    super();
  }

  render() {
    return html`
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section links">
              <h2>Quick Links</h2>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="/story/add.html">Add</a></li>
                <li><a href="https://github.com/Tyrant2407/story-app">Github Source</a></li>
              </ul>
            </div>

            <div class="footer-section social">
              <h2>Connect with Us</h2>
              <div class="social-links">
                <a href="#"><i class="bi bi-facebook"></i></a>
                <a href="#"><i class="bi bi-twitter"></i></a>
                <a href="#"><i class="bi bi-instagram"></i></a>
                <a href="#"><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>

          <div class="footer-bottom">&copy; 2024 Dicoding | Rizky</div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', FooterApp);
