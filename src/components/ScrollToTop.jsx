import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll-restoration helper: resets the viewport to the top of the page
 * on every route change (React Router does not do this by default when
 * using <BrowserRouter>/<Routes>).
 *
 * When the target URL carries a hash (e.g. `/contact#contact-form`) the
 * matching element is scrolled into view instead, so deep links from other
 * pages land on the right section rather than the top of the page.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
