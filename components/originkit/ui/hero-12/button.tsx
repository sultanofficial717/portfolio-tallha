// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const BASE_CLASS =
  "inline-flex h-11 w-fit shrink-0 touch-manipulation items-center justify-center rounded-[12px] px-6 py-3 font-tight text-[16px] font-medium tracking-[-0.32px] whitespace-nowrap transition-[opacity,transform,border-color,background-color] duration-200 ease [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100 cursor-pointer";

export const Button = ({
  variant = "primary",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  if (variant === "secondary") {
    return (
      <button
        type={type}
        className={`${BASE_CLASS} border border-solid border-white/10 bg-white/[0.02] tracking-[-0.48px] text-white [@media(hover:hover)_and_(pointer:fine)]:hover:border-white/25 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.05] ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`${BASE_CLASS} border border-solid border-white text-black [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(174.94deg, rgb(255, 255, 255) 16.97%, rgb(214, 214, 214) 88.48%)",
      }}
      {...props}
    >
      {children}
    </button>
  );
};
