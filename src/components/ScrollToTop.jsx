import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll-restoration helper: resets the viewport to the top of the page
 * on every route change (React Router does not do this by default when
 * using <BrowserRouter>/<Routes>).
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
