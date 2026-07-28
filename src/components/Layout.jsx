import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop.jsx';

/**
 * App shell: Navbar + routed page content + Footer.
 * Navbar/Footer placeholder slots are wired up here for now and will be
 * replaced with the real pixel-perfect components in a follow-up task.
 */
function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <ScrollToTop />
      <header>{/* Navbar slot */}</header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>{/* Footer slot */}</footer>
    </div>
  );
}

export default Layout;
