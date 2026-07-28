import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import useViewportZoom from '../hooks/useViewportZoom.js';

/** App shell: Navbar + routed page content + Footer. */
function Layout() {
  useViewportZoom();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
