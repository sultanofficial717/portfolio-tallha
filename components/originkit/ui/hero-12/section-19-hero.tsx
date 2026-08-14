// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import StarBurst from "@/components/originkit/ui/hero-12/starburst";
import StarDust from "@/components/originkit/ui/hero-12/star-dust";
import { HeroContent } from "@/components/originkit/ui/hero-12/hero-content";
import {
  HeroVisual,
  HERO_CONTENT_GAP,
  useHeroVisualLayout,
} from "@/components/originkit/ui/hero-12/hero-visual";
import { Navbar } from "@/components/originkit/ui/hero-12/navbar";

/** Public asset under /sections/hero-12/assets */
function asset(file: string) {
  return `/originkit/hero-12/${file}`;
}

/** StarDust sits shorter than the glow container, pinned to the bottom. */
const STAR_DUST_HEIGHT = 80;

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

type RevealPhase = "visual" | "nav" | "headline" | "content";

export const Section19Hero = () => {
  const {
    breakpoint,
    circleSize,
    maskSize,
    thunderMaskW,
    thunderMaskH,
    circleTop,
    offsetY,
    visualHeight,
    stageHeight,
  } = useHeroVisualLayout();

  const isDesktop = breakpoint === "desktop";
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<RevealPhase>("visual");

  useEffect(() => {
    if (prefersReducedMotion) setPhase("content");
  }, [prefersReducedMotion]);

  const showNav = prefersReducedMotion || phase !== "visual";
  const showHeadline =
    prefersReducedMotion || phase === "headline" || phase === "content";
  const showContent = prefersReducedMotion || phase === "content";

  const handleVisualReady = useCallback(() => {
    setPhase((current) => (current === "visual" ? "nav" : current));
  }, []);

  const handleNavComplete = () => {
    setPhase((current) => (current === "nav" ? "headline" : current));
  };

  const handleHeadlineComplete = () => {
    setPhase((current) => (current === "headline" ? "content" : current));
  };

  const handleStartAutomating = () => {
    window.location.hash = "#start";
  };

  const handleBookDemo = () => {
    window.location.hash = "#demo";
  };

  return (
    <section
      aria-label="Neura intelligent service automation"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-[#04020b]"
    >
      {/* Ambient layers — visible with visual, soft fade */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-full w-full desktop-sm:translate-x-[16%]"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        <StarBurst
          speed={7}
          starCount={140}
          color="#E8D4FF"
          centerX={50}
          centerY={0}
          starSize={18}
          opacity={28}
          flowerIntensity={2}
          twinkleSpeed={3}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-11 bg-[url(/originkit/hero-12/diagonal-line.png)] bg-size-[402px_874px] bg-top bg-repeat mix-blend-overlay"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.05 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-15 flex h-[250px] items-end justify-center overflow-hidden ipad:h-[150px] desktop-sm:h-[170px]"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.1 }}
      >
        <img
          src={asset("bottom-glow.png")}
          alt=""
          width={1440}
          height={210}
          className="absolute inset-x-0 bottom-0 mx-auto h-[210px] w-full object-cover object-bottom mix-blend-screen mask-radial-[90%_100%] mask-radial-at-bottom mask-radial-from-20% mask-radial-to-75% mask-no-repeat desktop-sm:h-[150px]"
        />
        <div
          className="absolute inset-x-0 bottom-0 w-full overflow-hidden opacity-50 mask-radial-[90%_100%] mask-radial-at-bottom mask-radial-from-40% mask-radial-to-95% mask-no-repeat ipad:opacity-40 desktop-sm:opacity-45"
          style={{ height: STAR_DUST_HEIGHT }}
        >
          <StarDust
            angle={360}
            background="rgba(0,0,0,0)"
            particleColor="#FFFFFF"
            particleDensity={5}
            minSize={0.5}
            maxSize={1.5}
            speed={6}
            particleSpeed={2}
            movement={4}
          />
        </div>
      </motion.div>

      <div className="relative z-20 mx-auto flex min-h-svh w-full max-w-100.5 flex-col ipad:max-w-none desktop-sm:max-w-[1380px]">
        {/* 2. Navbar — slides in after HeroVisual is ready */}
        <motion.div
          initial={prefersReducedMotion ? false : { y: "-120%", opacity: 0 }}
          animate={showNav ? { y: 0, opacity: 1 } : { y: "-120%", opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          onAnimationComplete={() => {
            if (showNav) handleNavComplete();
          }}
        >
          <Navbar />
        </motion.div>

        <div className="relative flex flex-1 flex-col items-center desktop-sm:block">
          {/*
            1. HeroVisual — mounts immediately, assets preload, then UI starts.
            Mobile/tablet: in-flow stage reserves space under the visual.
            Desktop: absolute so content can sit left while the orb stays center-right.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative w-full shrink-0 overflow-visible desktop-sm:absolute desktop-sm:inset-x-0 desktop-sm:top-0 desktop-sm:h-full"
            style={{ height: isDesktop ? undefined : stageHeight }}
          >
            <div
              className="absolute inset-x-0 overflow-visible desktop-sm:left-1/2 desktop-sm:w-full desktop-sm:max-w-[720px] desktop-sm:-translate-x-[12%] desktop-sm:translate-y-[-10%]"
              style={{
                top: offsetY,
                height: visualHeight,
              }}
            >
              <HeroVisual
                circleSize={circleSize}
                maskSize={maskSize}
                thunderMaskW={thunderMaskW}
                thunderMaskH={thunderMaskH}
                circleTop={circleTop}
                onReady={handleVisualReady}
              />
            </div>
          </div>

          {/* 3–4. Headline rolling + staggered content after navbar */}
          <div
            className="mt-auto flex w-full flex-col items-center pb-10 desktop-sm:relative desktop-sm:mt-0 desktop-sm:h-full desktop-sm:min-h-[calc(100svh-88px)] desktop-sm:items-stretch"
            style={{ paddingTop: isDesktop ? 150 : HERO_CONTENT_GAP }}
          >
            <HeroContent
              onStartAutomating={handleStartAutomating}
              onBookDemo={handleBookDemo}
              showHeadline={showHeadline}
              showContent={showContent}
              onHeadlineComplete={handleHeadlineComplete}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
