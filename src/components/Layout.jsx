import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import VolunteerDialog from './VolunteerDialog.jsx';
import { VolunteerFormContext } from '../volunteerForm.js';

/** App shell: Navbar + routed page content + Footer, plus the site-wide volunteer popup. */
function Layout() {
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const openVolunteerForm = useCallback(() => setVolunteerOpen(true), []);
  const closeVolunteerForm = useCallback(() => setVolunteerOpen(false), []);

  return (
    <VolunteerFormContext.Provider value={openVolunteerForm}>
      <div className="flex min-h-screen flex-col bg-cream">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <VolunteerDialog open={volunteerOpen} onClose={closeVolunteerForm} />
    </VolunteerFormContext.Provider>
  );
}

export default Layout;
