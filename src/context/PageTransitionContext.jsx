import { createContext, useContext, useRef } from "react";

/**
 * PageTransitionContext
 *
 * Replaces the `window.triggerPageTransition` anti-pattern.
 * Provides a shared ref that:
 *   - PageTransition component writes to (registers the trigger fn)
 *   - usePageTransition hook reads from (calls the trigger fn)
 *
 * Using a ref (not state) means registering the function never
 * causes a re-render.
 */
const PageTransitionContext = createContext(null);

export function PageTransitionProvider({ children }) {
  // This ref will hold the actual trigger function once
  // PageTransition mounts and registers it.
  const triggerRef = useRef(null);

  return (
    <PageTransitionContext.Provider value={triggerRef}>
      {children}
    </PageTransitionContext.Provider>
  );
}

/** Hook used by PageTransition to register its trigger function. */
export function usePageTransitionRegister() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx)
    throw new Error(
      "usePageTransitionRegister must be used inside PageTransitionProvider",
    );
  return ctx;
}

/** Hook used by consumers (Nav, links) to call the trigger. */
export function usePageTransitionTrigger() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx)
    throw new Error(
      "usePageTransitionTrigger must be used inside PageTransitionProvider",
    );
  return ctx;
}
