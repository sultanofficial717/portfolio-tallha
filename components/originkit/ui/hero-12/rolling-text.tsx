// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import * as React from "react";
import { motion, stagger, useReducedMotion } from "motion/react";

type FontStyle = React.CSSProperties;

type TransitionValue = {
  duration?: number;
  delay?: number;
  ease?: any;
  staggerChildren?: number;
};

type StaggerFrom = "start" | "center" | "end" | "random";
type StartFrom = "top" | "bottom";

type TextTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "p"
  | "span"
  | "div"
  | "section";

export type RollingSegment = {
  text: string;
  className?: string;
};

type Props = {
  text?: string;
  /** Prefer over `text` when you need mixed styles (e.g. italic spans, line breaks via `\n`). */
  segments?: RollingSegment[];
  font?: FontStyle;
  color?: string;
  startFrom?: StartFrom;
  staggerFrom?: StaggerFrom;
  tag?: TextTag;
  transition?: TransitionValue;
  /** When false, stays hidden. When true, plays the reveal. */
  animate?: boolean;
  onAnimationComplete?: () => void;
  className?: string;
};

const startYMap = {
  top: "-500%",
  bottom: "500%",
};

const staggerOrigin = {
  start: "first",
  center: "center",
  end: "last",
  random: Math.random(),
} as const;

const flattenSegments = (
  text: string | undefined,
  segments: RollingSegment[] | undefined,
): RollingSegment[] => {
  if (segments?.length) return segments;
  return [{ text: text ?? "ROLLING LETTERS" }];
};

export default function RollingLetters({
  text = "ROLLING LETTERS",
  segments,
  font = {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "120px",
    fontWeight: 600,
    letterSpacing: "-0.025em",
    lineHeight: "1.1em",
    textAlign: "left",
  },
  color = "#fff",
  startFrom = "bottom",
  staggerFrom = "center",
  tag = "h1",
  transition = {
    duration: 0.6,
    delay: 0,
    ease: [0.22, 1, 0.36, 1],
    staggerChildren: 0.08,
  },
  animate = true,
  onAnimationComplete,
  className,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[tag] as typeof motion.div;
  const resolvedSegments = flattenSegments(text, segments);
  const plainText = resolvedSegments.map((s) => s.text).join("");

  if (prefersReducedMotion) {
    const StaticTag = tag;
    return (
      <StaticTag
        className={className}
        style={{
          margin: 0,
          display: "block",
          color,
          ...font,
        }}
      >
        {resolvedSegments.map((segment, segmentIndex) => (
          <React.Fragment key={segmentIndex}>
            {segment.text.split("\n").map((line, lineIndex, lines) => (
              <React.Fragment key={`${segmentIndex}-${lineIndex}`}>
                {lineIndex > 0 ? <br /> : null}
                <span className={segment.className}>{line}</span>
                {lineIndex === lines.length - 1 &&
                segment.text.endsWith("\n") ? (
                  <br />
                ) : null}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </StaticTag>
    );
  }

  const letters: {
    char: string;
    className?: string;
    breakBefore?: boolean;
  }[] = [];

  for (const segment of resolvedSegments) {
    const parts = segment.text.split("\n");
    parts.forEach((part, partIndex) => {
      if (partIndex > 0) {
        letters.push({ char: "\n", breakBefore: true });
      }
      for (const char of part) {
        letters.push({ char, className: segment.className });
      }
    });
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate={animate ? "show" : "hidden"}
      aria-label={plainText.replace(/\n/g, " ")}
      onAnimationComplete={(definition) => {
        if (definition === "show") onAnimationComplete?.();
      }}
      style={{
        margin: 0,
        display: "block",
        overflow: "hidden",
        whiteSpace: "pre-wrap",
        color,
        ...font,
      }}
      variants={{
        show: {
          transition: {
            delayChildren: transition.delay,
            staggerChildren: stagger(transition.staggerChildren ?? 0.08, {
              from: staggerOrigin[staggerFrom],
            }) as unknown as number,
          },
        },
      }}
    >
      {letters.map((letter, i) => {
        if (letter.char === "\n") {
          return <br key={`br-${i}`} />;
        }

        return (
          <span
            key={i}
            className={letter.className}
            aria-hidden="true"
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
            }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              variants={{
                hidden: {
                  y: startYMap[startFrom],
                },
                show: {
                  y: "0%",
                  transition: {
                    duration: transition.duration,
                    ease: transition.ease,
                  },
                },
              }}
            >
              {letter.char === " " ? "\u00A0" : letter.char}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
