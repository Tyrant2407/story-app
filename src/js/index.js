// Import our custom CSS
import '../sass/main.scss';
 
// Import javascript file as needed
import Dashboard from './ui/pages/dashboard';
import Add from './ui/pages/story/add';
import Edit from './ui/pages/story/edit';
import * as bootstrap from 'bootstrap';
 
const routes = {
  '/': Dashboard,
  '/story/add.html': Add,
  '/story/edit.html': Edit,
};
 
const detectRoute = () => routes[window.location.pathname];
 
const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
 
  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${header.clientHeight + footer.clientHeight}px)`;
  }
};
 
window.addEventListener('DOMContentLoaded', async () => {
  initPages();
 
  const route = detectRoute();
  route.init();
});