"use client";


import "./cta-02.css";
import "./cta-01.css";
import Image from "next/image";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { useState, type FormEvent } from "react";

/** Asset root — flat files in package assets/. */
const A = "/originkit/hero-07";

const easeOutQuint = [0.23, 1, 0.32, 1] as const;

const useWaitlistReveal = (delay: number) => {
  const prefersReducedMotion = useReducedMotion();

  return {
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 24, filter: "blur(4px)" },
    animate: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
      type: "tween" as const,
      duration: prefersReducedMotion ? 0.2 : 0.5,
      delay: prefersReducedMotion ? 0 : delay,
      ease: easeOutQuint,
    },
  };
};

type WaitlistRevealProps = HTMLMotionProps<"div"> & {
  delay: number;
};

const WaitlistReveal = ({ delay, children, ...props }: WaitlistRevealProps) => {
  const reveal = useWaitlistReveal(delay);

  return (
    <motion.div {...reveal} {...props}>
      {children}
    </motion.div>
  );
};

const NAV_LINKS = [
  { label: "Partners", href: undefined },
  { label: "Benefits", href: undefined },
  { label: "Testimonials", href: undefined },
  { label: "Team", href: undefined },
] as const;

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: undefined,
    icon: `${A}/icon-linkedin.svg`,
  },
  {
    label: "X",
    href: undefined,
    icon: `${A}/icon-x.svg`,
  },
  {
    label: "Instagram",
    href: undefined,
    icon: `${A}/icon-instagram.svg`,
  },
] as const;

const Navbar = () => {
  return (
    <nav
      aria-label="Primary"
      className="relative flex w-full max-w-[400px] items-center justify-between rounded-full bg-white py-1.5 pr-1.5 pl-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0_rgba(0,0,0,0.04)] ipad:max-w-[500px] ipad-landscape:w-auto ipad-landscape:max-w-none ipad-landscape:justify-start ipad-landscape:gap-4 ipad-landscape:pl-6 ipad-landscape:pr-6"
    >
      <a
        className="relative flex size-12.5 shrink-0 items-center justify-center overflow-clip rounded-full transition-transform duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b47eb] active:scale-[0.96] motion-reduce:active:scale-100"
        aria-label="Replex home"
       onClick={(e) => e.preventDefault()}>
        <span className="relative size-[42px]">
          <Image
            src={`${A}/logo-purple.svg`}
            alt=""
            width={44}
            height={27}
            className="size-full object-contain"
            aria-hidden="true"
          />
        </span>
      </a>

      <div className="flex items-center gap-1 ipad-landscape:gap-4">
        <a
          className="inline-flex min-h-11 touch-manipulation items-center gap-1 overflow-clip rounded-full bg-[#8b47eb] py-3.5 pr-3.5 pl-4 text-[17px] font-bold leading-none whitespace-nowrap text-white transition-[opacity,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b47eb] active:scale-[0.96] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
         onClick={(e) => e.preventDefault()}>
          Home
          <Image
            src={`${A}/icon-down.svg`}
            alt=""
            width={20}
            height={20}
            className="size-5 shrink-0"
            aria-hidden="true"
          />
        </a>

        <ul
          className="hidden items-center gap-1 ipad-landscape:flex ipad-landscape:gap-3"
          aria-label="Navigation links"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                className="inline-flex min-h-11 items-center px-2.5 text-[16px] font-medium leading-none whitespace-nowrap text-[#5b5e71] transition-colors duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b47eb] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#2b106a]"
               onClick={(e) => e.preventDefault()}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const BrandMark = () => (
  <div className="relative -mt-2 flex size-[68px] shrink-0 -translate-y-2 items-center justify-center motion-reduce:translate-y-0 ipad:-mt-3 ipad:-translate-y-3 lg:size-[78px]">
    {/*
      Comet orbit: conic gradient masked to a thin ring.
      Outer box tracks the circle (60→70 on lg) so the trail stays snug.
    */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 will-change-transform animate-logo-orbit motion-reduce:animate-none"
    >
      {/* Soft glow under the trail */}
      <div
        className="absolute inset-0 rounded-full opacity-80 blur-[1.5px]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 200deg, rgba(139,71,235,0.05) 230deg, rgba(139,71,235,0.2) 270deg, rgba(168,117,240,0.45) 310deg, rgba(199,187,246,0.55) 340deg, transparent 360deg)",
          maskImage:
            "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
          WebkitMaskImage:
            "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
        }}
      />

      {/* Crisp trail stroke */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 210deg, rgba(199,187,246,0.15) 240deg, rgba(168,117,240,0.45) 280deg, rgba(139,71,235,0.85) 320deg, rgba(139,71,235,0.35) 345deg, transparent 360deg)",
          maskImage:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
          WebkitMaskImage:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
        }}
      />
    </div>

    {/* <div
      aria-hidden="true"
      className="hidden lg:blockpointer-events-none absolute bottom-[-6.5px] left-1/2 h-[254px] w-[219px] -translate-x-1/2"
    >
      <Image
        src={`${A}/logo-glow.svg`}
        alt=""
        width={219}
        height={255}
        className="size-full max-w-none"
      />
    </div> */}

    <div
      className="relative z-10 flex size-[60px] items-center justify-center rounded-full shadow-[0_-1px_0_0_#AB7AF0] lg:size-[70px]"
      style={{
        background: "linear-gradient(180deg, #A875F0 0%, #8B47EB 100%)",
      }}
    >
      <Image
        src={`${A}/logo-white.svg`}
        alt="Replex"
        width={50}
        height={31}
        className="h-[15px] w-6 lg:h-[31px] lg:w-[50px]"
        priority
      />
    </div>
  </div>
);

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    window.setTimeout(() => {
      setIsSubmitting(false);
      setStatus("success");
      setEmail("");
    }, 600);
  };

  return (
    <div className="relative w-full max-w-[411px] md:max-w-[433px] xl:max-w-[540px]">
      <Image
        src={`${A}/connector.svg`}
        alt=""
        width={45}
        height={34}
        className="pointer-events-none absolute top-[-34px] left-[30px] h-[34px] w-[45px]"
        aria-hidden="true"
      />
      <Image
        src={`${A}/connector.svg`}
        alt=""
        width={45}
        height={34}
        className="pointer-events-none absolute top-[-34px] right-[30px] h-[34px] w-[45px]"
        aria-hidden="true"
      />

      <div className="rounded-3xl bg-linear-to-b from-white/50 to-white/0 p-1.5 backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,black_0%,black_83%,rgba(0,0,0,0.45)_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.45)_88%,transparent_100%)] [mask-size:100%_100%] [mask-repeat:no-repeat]">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="relative flex w-full flex-col items-center gap-7.5 md:gap-4 overflow-clip rounded-[20px] border border-solid border-white/60 bg-[#f8f6fe]/55 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[16px] backdrop-saturate-150 iphone:p-8 ipad:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-1px] left-[35px] h-[82px] w-[19px] bg-linear-to-b from-[#8b47eb]/30 to-transparent blur-[9px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-1px] right-[34px] h-[82px] w-[19px] bg-linear-to-b from-[#8b47eb]/30 to-transparent blur-[9px]"
          />

          <div className="flex w-full flex-col items-center gap-0.5 text-center leading-normal">
            <h2 className="w-full text-[22px] md:text-[17px] lg:text-[18px] xl:text-[20px] font-semibold text-[#200c50]">
              Join the waitlist
            </h2>
            <p className="w-full text-[15px] xl:text-[17px] font-medium text-[#72758d]">
              Sign up now for early notification upon launch.
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch gap-3 md:gap-2 ipad-landscape:flex-row ipad-landscape:items-start">
            <label className="sr-only" htmlFor="waitlist-email">
              Email address
            </label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="Enter your Email…"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== "idle") {
                  setStatus("idle");
                }
              }}
              disabled={isSubmitting}
              className="h-[48px] w-full min-w-0 flex-1 touch-manipulation rounded-full border border-solid border-[#e2dbfa] bg-[#f4f1fd]/80 px-5 py-3.5 text-center text-[15px] font-medium leading-normal text-[#200c50] placeholder:text-[#72758d] transition-colors duration-200 ease disabled:opacity-70 focus-visible:ring-0 focus-visible:outline-0 ipad-landscape:text-left"
              aria-invalid={status === "error"}
              aria-describedby="waitlist-status"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-[42px] lg:h-[48px] w-full shrink-0 touch-manipulation items-center justify-center overflow-clip rounded-full bg-[#8b47eb] px-5 py-3.5 text-[15px] font-bold leading-normal whitespace-nowrap text-white transition-[opacity,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b47eb] active:scale-[0.96] disabled:opacity-70 motion-reduce:active:scale-100 ipad-landscape:w-auto [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90 cursor-pointer"
            >
              {isSubmitting ? "Joining…" : "Join Waitlist"}
            </button>
          </div>

          <p
            id="waitlist-status"
            role="status"
            aria-live="polite"
            className={`min-h-5 text-center text-sm font-medium ${
              status === "error"
                ? "text-[#b42318]"
                : status === "success"
                  ? "text-[#027a48]"
                  : "sr-only"
            }`}
          >
            {status === "error"
              ? "Enter a valid email address."
              : status === "success"
                ? "You’re on the list. We’ll be in touch."
                : ""}
          </p>
        </form>
      </div>
    </div>
  );
};

const SocialLinks = () => (
  <ul className="-mt-10 flex items-start gap-2.5">
    {SOCIAL_LINKS.map((link) => (
      <li key={link.label}>
        <a
          aria-label={link.label}
          className="inline-flex size-12 touch-manipulation items-center justify-center rounded-full border border-solid border-[#ede9fc] bg-white will-change-transform transition-transform duration-300 [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b47eb] active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100 xl:size-[56px] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1.5"
         onClick={(e) => e.preventDefault()}>
          <Image
            src={link.icon}
            alt=""
            width={26}
            height={26}
            className="size-6 xl:size-[26px]"
            aria-hidden="true"
          />
        </a>
      </li>
    ))}
  </ul>
);

const HeroAtmosphere = () => (
  <div
    aria-hidden="true"
    className="hidden lg:blockpointer-events-none absolute inset-0 overflow-hidden border-none"
  >
    <div className="absolute top-[-25px] left-[3%] h-[365px] w-[653px] rotate-[23.65deg] mix-blend-screen opacity-80">
      <Image
        src={`${A}/glow-left.png`}
        alt=""
        width={408}
        height={228}
        className="size-full object-cover"
      />
    </div>
    <div className="absolute top-[-25px] right-[4%] h-[189px] w-[597px] -rotate-[34deg] mix-blend-screen opacity-80">
      <Image
        src={`${A}/glow-right.png`}
        alt=""
        width={287}
        height={91}
        className="size-full object-cover"
      />
    </div>
    <div className="absolute top-[20%] right-[6%] h-[345px] w-[725px] mix-blend-screen opacity-70">
      <Image
        src={`${A}/glow-center.png`}
        alt=""
        width={313}
        height={135}
        className="size-full object-cover"
      />
    </div>
    <div className="absolute top-[-10%] left-1/2 h-[485px] w-[495px] -translate-x-1/2 rotate-[42deg] opacity-60">
      <Image
        src={`${A}/lights.svg`}
        alt=""
        width={495}
        height={485}
        className="size-full max-w-none"
      />
    </div>
    <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-b from-transparent via-[#f6e8f7]/80 to-[#f8f6fe]" />
  </div>
);

const Section9 = () => {
  const headingReveal = useWaitlistReveal(0.24);
  const descriptionReveal = useWaitlistReveal(0.34);

  return (
    <main
      id="top"
      className="min-h-screen bg-[#f8f6fe] font-manrope text-[#19093e]"
    >
      <div className="relative mx-auto flex w-full max-w-[1835px] flex-col items-center px-2 pt-10 iphone:px-2 ipad:pt-12 ipad-landscape:px-12.5 laptop:pt-[54px]">
        {/* Mobile / tablet: separate floating navbar */}
        <div className="relative z-40 mb-4 flex w-full justify-center px-2 ipad-landscape:hidden">
          <Navbar />
        </div>

        <section
          aria-labelledby="waitlist-heading"
          className="relative w-full rounded-tl-[40px] rounded-tr-[40px] rounded-br-3xl rounded-bl-3xl bg-linear-to-b from-white to-white/0 p-1.5 ipad:rounded-tl-[70px] ipad:rounded-tr-[70px] ipad:rounded-br-[40px] ipad:rounded-bl-[40px]"
        >
          {/* Desktop: overlapping navbar on section edge */}
          <div className="absolute top-0 left-1/2 z-40 hidden -translate-x-1/2 -translate-y-1/2 ipad-landscape:block">
            <Navbar />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 h-70 w-full -translate-x-1/2 bg-[#f8f6fe] mask-[linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]"
          />
          <div className="relative z-10 flex w-full flex-col items-center gap-8 overflow-clip rounded-tl-[36px] rounded-tr-[36px] bg-[url(/originkit/hero-07/mobile-background.png)] bg-top bg-no-repeat px-4 pt-20 pb-16 iphone:gap-10 iphone:px-6 md:bg-[url(/originkit/hero-07/tablet-background.png)] xl:bg-[url(/originkit/hero-07/desktop-background.png)] bg-contain xl:bg-cover ipad:rounded-tl-[64px] ipad:rounded-tr-[64px] ipad:px-10 ipad:pt-30 ipad:pb-20">
            {/* <HeroAtmosphere /> */}

            <div className="relative z-10 flex w-full max-w-210 flex-col items-center gap-3.5">
              <BrandMark />

              <div className="flex w-full flex-col items-center gap-4 text-center ipad:gap-4">
                <div className="mt-2 flex w-full flex-col items-center gap-11.75 ipad:mt-0">
                  <div className="flex w-full max-w-none flex-col items-center gap-4 px-0">
                    <motion.h1
                      id="waitlist-heading"
                      className="w-full max-w-none text-[28px] lg:text-[44px] xl:text-[58px] font-bold text-[#19093e] leading-tight"
                      {...headingReveal}
                    >
                      Be the First to get update
                      <br className="hidden md:block" />
                      by joining our{" "}
                      <span className="font-playfair italic font-bold">
                        Waitlist!
                      </span>
                    </motion.h1>
                    <motion.p
                      className="max-w-160 text-balance text-[16px] xl:text-[18px] font-medium leading-normal text-[#2b106a]"
                      {...descriptionReveal}
                    >
                      Be first to experience Replex. Join our waitlist for
                      exclusive benefits and revolutionary automation solutions.
                    </motion.p>
                  </div>

                  <WaitlistReveal
                    delay={0.44}
                    className="flex w-full flex-col items-center"
                  >
                    <WaitlistForm />
                  </WaitlistReveal>
                  <WaitlistReveal delay={0.54}>
                    <SocialLinks />
                  </WaitlistReveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Section9;
