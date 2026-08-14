// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import type { KeyboardEvent } from "react";
import { Button } from "@/components/originkit/ui/hero-12/button";

/** Public asset under /sections/hero-12/assets */
function asset(file: string) {
  return `/originkit/hero-12/${file}`;
}

const NAV_LINKS = [
  { label: "Artists", href: "#artists" },
  { label: "Genres", href: "#genres" },
  { label: "Playlists", href: "#playlists" },
  { label: "Charts", href: "#charts" },
] as const;

export const Navbar = () => {
  const handleSignUp = () => {
    window.location.hash = "#signup";
  };

  const handleSignIn = () => {
    window.location.hash = "#signin";
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    window.location.hash = href;
  };

  return (
    <nav aria-label="Primary" className="relative z-30 w-full">
      {/* Mobile / tablet */}
      <div className="flex w-full items-center justify-between p-4 ipad:px-12 desktop-sm:hidden">
        <a
          href="#"
          aria-label="Neura home"
          className="inline-flex min-h-11 items-center gap-2 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent]"
        >
          <img
            src={asset("nav-logo.svg")}
            alt=""
            width={22}
            height={22}
            className="size-[22px] shrink-0"
            aria-hidden="true"
          />
          <span className="font-sans text-[20px] font-medium leading-[32.39px] tracking-[-0.4px] text-white whitespace-nowrap">
            Neura
          </span>
        </a>

        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center touch-manipulation transition-opacity duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-80"
        >
          <img
            src={asset("nav-menu.svg")}
            alt=""
            width={24}
            height={24}
            className="size-6"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Desktop — Figma 1:1837 */}
      <div className="relative mx-auto hidden w-full items-center justify-between pt-9 desktop-sm:flex">
        <div className="flex items-center gap-[52px]">
          <a
            href="#"
            aria-label="Neura home"
            className="inline-flex min-h-11 items-center gap-2 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent]"
          >
            <img
              src={asset("nav-logo.svg")}
              alt=""
              width={22}
              height={22}
              className="size-[22px] shrink-0"
              aria-hidden="true"
            />
            <span className="font-sans text-[20px] font-medium leading-[32.39px] tracking-[-0.4px] text-white whitespace-nowrap">
              Neura
            </span>
          </a>

          <ul className="flex items-center gap-6 font-tight text-[17px] leading-[25.5px] tracking-[-0.34px] text-white">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  tabIndex={0}
                  aria-label={link.label}
                  onKeyDown={(event) => handleKeyDown(event, link.href)}
                  className="inline-flex min-h-11 items-center touch-manipulation whitespace-nowrap transition-opacity duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-80"
                >
                  {"// "}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3.5">
          <Button
            variant="secondary"
            aria-label="Sign Up"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Button
            variant="primary"
            aria-label="Sign In"
            onClick={handleSignIn}
            className="h-[43px] text-[14px] tracking-[-0.28px] text-[#040404]"
          >
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};
