import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop component that resets scroll position when route changes
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location]);

  return null; // This component doesn't render anything
}