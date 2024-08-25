import LitWithoutShadowDom from '../../../base/LitWithOutShadowDom';
import { html } from 'lit';
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
                  <div class="footer-section about">
                      <h2 class="logo-text">YourCompany</h2>
                      <p>YourCompany is a leading provider of quality products and services. We are committed to delivering the best experiences to our customers.</p>
                  </div>

                  <div class="footer-section links">
                      <h2>Quick Links</h2>
                      <ul>
                          <li><a href="#">Home</a></li>
                          <li><a href="#">About</a></li>
                          <li><a href="#">Services</a></li>
                          <li><a href="#">Contact</a></li>
                          <li><a href="#">Privacy Policy</a></li>
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

              <div class="footer-bottom">
                  &copy; 2024 YourCompany | Designed by You
              </div>
          </div>
      </footer>
    `;
  }
}
  
customElements.define('footer-component', FooterApp);