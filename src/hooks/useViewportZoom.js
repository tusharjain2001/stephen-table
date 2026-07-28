import { useEffect } from 'react';

/** Figma only defines the desktop layout at 1440px wide. */
const DESIGN_WIDTH = 1440;

/**
 * Above 1440px viewport width, the site has no wider design to fall back on
 * (every section is `max-w-[1440px] mx-auto`), so Chrome/Edge would otherwise
 * render the pixel-exact 1440 layout centered with dead margin on both sides.
 *
 * Instead, scale the whole document with the CSS `zoom` property so the
 * 1440 layout fills the screen with identical proportions at any width
 * above 1440 (1920 -> zoom 1.333, 2560 -> zoom 1.778, etc). `zoom` (unlike
 * `transform: scale`) also rescales the effective layout viewport available
 * to descendants, so percentage/`max-w-[1440px]` math still resolves the
 * same way it does at a real 1440 viewport — it just paints larger.
 *
 * Media queries key off the *real* (unzoomed) viewport width, so `xl`/`2xl`
 * classes stay active above 1440 exactly as intended; zoom only scales the
 * rendering of the 1440-equivalent layout those classes already produce.
 *
 * Below 1440, zoom is cleared and the existing responsive breakpoints
 * (lg/md/sm/base) render unchanged.
 */
function useViewportZoom() {
  useEffect(() => {
    function applyZoom() {
      const width = window.innerWidth;
      document.documentElement.style.zoom =
        width >= DESIGN_WIDTH ? String(width / DESIGN_WIDTH) : '';
    }

    applyZoom();
    window.addEventListener('resize', applyZoom);

    return () => {
      window.removeEventListener('resize', applyZoom);
      document.documentElement.style.zoom = '';
    };
  }, []);
}

export default useViewportZoom;
