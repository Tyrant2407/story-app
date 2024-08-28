// Import our custom CSS
import '../sass/main.scss';
 
// Import javascript file as needed
import Dashboard from './ui/pages/dashboard';
import Add from './ui/pages/story/add';
import Edit from './ui/pages/story/edit';
import Login from './ui/pages/auth/login';
import Register from './ui/pages/auth/register';
import Page404 from './ui/pages/404page';
import * as bootstrap from 'bootstrap';
 
const routes = {
  '/': Dashboard,
  '/story/add.html': Add,
  '/story/edit.html': Edit,

  '/auth/login.html': Login,
  '/auth/register.html': Register,
};
 
const detectRoute = () => {
  const route = routes[window.location.pathname];
  return route ? route : Page404;
};
 
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