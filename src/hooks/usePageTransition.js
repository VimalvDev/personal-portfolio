import { useNavigate } from "react-router-dom";
import { usePageTransitionTrigger } from "../context/PageTransitionContext";

/**
 * usePageTransition Hook
 *
 * Combines the page transition animation (from PageTransition component via
 * Context) with React Router navigation.
 *
 * Flow:
 * 1. User clicks a nav link
 * 2. Bars animate up and cover the screen (0–0.75s)
 * 3. navigate(path) fires at 0.75s (user can't see the switch)
 * 4. Bars collapse down (0.85–1.4s), new page is revealed
 */
export const usePageTransition = () => {
  const navigate = useNavigate();

  // Read trigger from context ref (set by PageTransition on mount)
  const triggerRef = usePageTransitionTrigger();

  const navigateWithTransition = async (path) => {
    const trigger = triggerRef.current;

    if (trigger) {
      await trigger(() => {
        navigate(path);
      });
    } else {
      // Fallback: PageTransition not mounted yet
      navigate(path);
    }
  };

  return navigateWithTransition;
};
