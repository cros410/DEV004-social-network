import { Login } from './pages/login';
import { Register } from './pages/register';
import { Home } from './pages/home';

const root = document.getElementById('root');

const routes = {
  '/': Login,
  '/registro': Register,
  '/home': Home,
};

export const navigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  root.innerHTML = '';
  root.appendChild(routes[pathname](navigate));
};

const component = routes[window.location.pathname];

root.append(component(navigate));
