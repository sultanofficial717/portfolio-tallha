// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import { motion } from "motion/react";
import RollingLetters from "@/components/originkit/ui/hero-12/rolling-text";
import { Button } from "@/components/originkit/ui/hero-12/button";

type HeroContentProps = {
  onStartAutomating: () => void;
  onBookDemo: () => void;
  showHeadline?: boolean;
  showContent?: boolean;
  onHeadlineComplete?: () => void;
};

const SIDE_CALLOUTS = [
  {
    lines: ["Built with AI for", "Maximum efficiency"],
  },
  {
    lines: ["Smart Responses for", "Every Scenario"],
  },
] as const;

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export const HeroContent = ({
  onStartAutomating,
  onBookDemo,
  showHeadline = true,
  showContent = true,
  onHeadlineComplete,
}: HeroContentProps) => {
  return (
    <div className="relative z-20 mx-auto flex w-full max-w-[370px] flex-col items-center gap-6 px-4 desktop-sm:mx-0 desktop-sm:max-w-none desktop-sm:items-stretch desktop-sm:gap-0 desktop-sm:px-0">
      {/* Eyebrow + headline */}
      <div className="flex w-full flex-col items-center gap-3 text-center desktop-sm:max-w-[923px] desktop-sm:items-start desktop-sm:gap-6 desktop-sm:text-left">
        <motion.p
          initial={false}
          animate={showHeadline ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="font-sans text-[16px] font-normal leading-normal tracking-[-0.48px] text-[#c98bff] whitespace-nowrap desktop-sm:font-tight desktop-sm:text-[18px] desktop-sm:font-medium desktop-sm:tracking-[-0.54px]"
        >
          Future Conversation solution
        </motion.p>

        <div className="flex w-full flex-col items-center gap-2 desktop-sm:items-start desktop-sm:gap-0">
          <RollingLetters
            tag="h1"
            className="w-full text-balance text-center font-instrument-serif text-[48px] leading-[1.1] tracking-[-1.44px] desktop-sm:text-left desktop-sm:text-[104px] desktop-sm:tracking-[-3.12px]"
            color="#ffffff"
            startFrom="bottom"
            staggerFrom="start"
            animate={showHeadline}
            onAnimationComplete={onHeadlineComplete}
            font={{
              fontWeight: 400,
            }}
            transition={{
              duration: 0.4,
              delay: 0.05,
              ease: EASE_OUT,
              staggerChildren: 0.022,
            }}
            text={"Intelligent Service\nAutomation"}
          />

          {/* Mobile / tablet description stays under the headline */}
          <motion.p
            initial={false}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="w-full max-w-[332px] font-sans text-[14px] font-normal leading-[1.4] tracking-[-0.28px] text-white/80 text-pretty desktop-sm:hidden"
          >
            Automate your customer service with conversational AI that can
            answer, understand, and adept to each user in real time improving
            efficiency, satisfaction,and support quality effortlessly.
          </motion.p>
        </div>
      </div>

      {/* CTAs — stacked on mobile, row on desktop */}
      <motion.div
        initial={false}
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className="flex w-full flex-col items-center gap-3 pb-[58px] desktop-sm:mt-10 desktop-sm:w-auto desktop-sm:flex-row desktop-sm:items-center desktop-sm:gap-3 desktop-sm:pb-0"
      >
        <Button
          variant="primary"
          aria-label="Start Automating"
          onClick={onStartAutomating}
          className="w-full desktop-sm:w-fit"
        >
          Start Automating
        </Button>
        <Button
          variant="secondary"
          aria-label="Book a Demo"
          onClick={onBookDemo}
          className="w-full desktop-sm:w-fit"
        >
          Book a Demo
        </Button>
      </motion.div>

      {/* Desktop description — lower left (Figma 1:1858) */}
      <motion.p
        initial={false}
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 }}
        className="mt-auto hidden max-w-[420px] font-tight text-[18px] leading-[25.5px] tracking-[-0.36px] text-white/80 desktop-sm:mt-[148px] desktop-sm:block"
      >
        Automate your customer service with conversational AI that can answer,
        understand, and adept to each user in real time - improving efficiency,
        satisfaction, and support quality effortlessly.
      </motion.p>

      {/* Desktop side callouts — right column (Figma 1:1836 / 1:1832) */}
      <motion.aside
        initial={false}
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.2 }}
        aria-label="Product highlights"
        className="pointer-events-none absolute top-[442px] right-0 hidden flex-col items-end gap-[66px] text-right desktop-sm:flex"
      >
        {SIDE_CALLOUTS.map((callout) => (
          <p
            key={callout.lines[0]}
            className="font-tight text-[18px] leading-normal font-medium tracking-[-0.54px] text-[#c98bff] whitespace-nowrap"
          >
            {callout.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        ))}
      </motion.aside>
    </div>
  );
};
