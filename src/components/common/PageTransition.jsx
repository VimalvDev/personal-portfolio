import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePageTransitionRegister } from "../../context/PageTransitionContext";

/**
 * PageTransition Component
 *
 * Handles the visual animation of page transitions.
 * Creates 5 vertical bars that animate up on page change, then down when done.
 *
 * The trigger function is registered via Context (not window) so there is no
 * global pollution and it works correctly in StrictMode.
 */
function PageTransition() {
  const transitionRef = useRef(null);
  const overlayRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const timelineRef = useRef(null);

  // Get the shared ref from context and write our trigger into it
  const triggerRef = usePageTransitionRegister();

  useEffect(() => {
    const trigger = async (onPageChange) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      return new Promise((resolve) => {
        const bars = transitionRef.current?.querySelectorAll(".transition-bar");
        const overlay = overlayRef.current;

        if (!bars || !overlay) {
          isAnimatingRef.current = false;
          resolve();
          return;
        }

        if (timelineRef.current) {
          timelineRef.current.kill();
        }

        gsap.set(bars, {
          height: "0%",
          scaleY: 1,
          transformOrigin: "top center",
        });
        gsap.set(overlay, { opacity: 0 });

        overlay.style.pointerEvents = "auto";

        const tl = gsap.timeline();
        timelineRef.current = tl;

        // Overlay fades in
        tl.to(overlay, { opacity: 0.5, duration: 0.3 }, 0);

        // Bars rise up (staggered)
        tl.to(
          bars,
          {
            height: "100%",
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.inOut",
          },
          0,
        );

        // Page change fires when bars fully cover the screen
        tl.call(
          () => {
            if (onPageChange) onPageChange();
          },
          null,
          0.75,
        );

        // Bars collapse down
        tl.to(
          bars,
          {
            height: "0%",
            scaleY: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.inOut",
            transformOrigin: "top center",
          },
          0.85,
        );

        // Overlay fades out
        tl.to(overlay, { opacity: 0, duration: 0.5 }, 0.85);

        // Cleanup
        tl.call(
          () => {
            isAnimatingRef.current = false;
            overlay.style.pointerEvents = "none";
            timelineRef.current = null;
            resolve();
          },
          null,
          ">-0.2",
        );
      });
    };

    // Register trigger into context ref (accessible to the hook)
    triggerRef.current = trigger;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      // Clear the ref on unmount
      triggerRef.current = null;
    };
  }, [triggerRef]);

  return (
    <div ref={transitionRef} className="fixed inset-0 pointer-events-none z-500">
      {/* Black overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-0 pointer-events-none " 
      />

      {/* Transition bars */}
      <div className="flex h-full relative z-10">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="transition-bar flex-1 bg-black h-0 w-[20%] pointer-events-none "
          />
        ))}
      </div>
      
    </div>
  );
}

export default PageTransition;
