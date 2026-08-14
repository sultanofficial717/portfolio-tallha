// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import { useEffect, useId, useRef } from "react";

/**
 * Animated port of the Figma "Electric Line" (node 2149:762).
 *
 * The design is not a hand-drawn bolt. It is a gentle 13-point polyline pushed
 * through Figma's texture effect, which exports as:
 *
 *   feTurbulence  type=fractalNoise baseFrequency=0.0228 numOctaves=3 seed=4981
 *   feDisplacementMap scale=41.89  xChannelSelector=R yChannelSelector=G
 *   feGaussianBlur    stdDeviation=<per layer>
 *
 * That displacement is what produces every kink. Behind it sit nine plain
 * straight strokes at increasing blur (the diffuse beam), and in front, four
 * copies of the displaced polyline at increasing blur. Everything composites
 * with `plus-lighter`.
 *
 * Because the shape comes from a noise field rather than fixed geometry, it
 * animates for free: advancing `seed` regenerates the field and the bolt
 * writhes, using the designer's own effect rather than an approximation of it.
 * Seeds are stepped at a low frame rate — regenerating turbulence is expensive,
 * and real lightning reads better flickering than gliding.
 *
 * Authored along the source's short axis so the bolt runs vertically; the Figma
 * frame draws it horizontally and rotates the whole group by 90.67°.
 */

/** Design space, transposed to vertical: 58 across × 575 along. */
const ACROSS = 58;
const ALONG = 575;
const CENTER = ACROSS / 2;

/**
 * The polyline every displaced layer strokes, as [along, across] pairs taken
 * from the exported `Vector 15` path.
 */
const SPINE: readonly (readonly [number, number])[] = [
  [20.9437, 30.0277],
  [36.6709, 30.0277],
  [52.3981, 27.1019],
  [71.5442, 31.8563],
  [102.999, 24.5418],
  [192.575, 35.5136],
  [304.033, 21.6159],
  [334.803, 35.5136],
  [394.977, 27.1019],
  [448.313, 31.8563],
  [479.767, 27.1019],
  [522.846, 30.0277],
  [543.359, 30.0277],
];

const spinePathAt = (offset: number) =>
  SPINE.map(
    ([along, across], i) =>
      `${i === 0 ? "M" : "L"}${(across - 28.5 + CENTER + offset).toFixed(3)} ${along.toFixed(3)}`,
  ).join("");

/** Straight blurred strokes behind the bolt — the beam. Figma layers v5–v13. */
const BEAM_LAYERS = [
  { width: 13.0898, blur: 26.1796, stops: ["#F370FF", "#D862FF"] },
  { width: 10.4719, blur: 15.7078, stops: ["#E270FF", "#C062FF"] },
  { width: 7.85389, blur: 10.4719, stops: ["#E270FF", "#C062FF"] },
  { width: 1.96347, blur: 7.85389, stops: ["#E270FF", "#C062FF"] },
  { width: 1.96347, blur: 3.92695, stops: ["#D470FF", "#E762FF"] },
  { width: 1.96347, blur: 2.61796, stops: ["#D470FF", "#E762FF"] },
  { width: 1.30898, blur: 1.30898, stops: ["#D470FF", "#E762FF"] },
  { width: 0.654491, blur: 0, stops: ["#D470FF", "#E762FF"] },
] as const;

/** Displaced copies of the spine — the bolt itself. Figma layers v15–v18. */
const BOLT_LAYERS = [
  { width: 1.96347, blur: 2.61796, stops: ["#FF70EE", "#C862FF"] },
  { width: 1.30898, blur: 1.30898, stops: ["#FF70EE", "#C862FF"] },
  { width: 0.654491, blur: 0.327246, stops: ["#FFFFFF", "#FFFFFF"] },
  { width: 0.654491, blur: 0, stops: ["#FFFFFF", "#FFFFFF"] },
] as const;

type ElectricLineProps = {
  /** Turbulence frequency. Lower = longer, lazier kinks. Figma uses 0.0228. */
  frequency?: number;
  /** Displacement distance in design units. Figma uses 41.89. */
  displace?: number;
  /** Seed steps per second. Lightning reads better flickering than gliding. */
  fps?: number;
  /** Overall thickness multiplier on every stroke. */
  weight?: number;
  /**
   * How many strands to draw. Each gets its own turbulence field, seed stride
   * and step interval so they move independently — a shared field is cheaper
   * but makes them bend in unison. Cost scales with this, so keep it low.
   */
  strands?: number;
  /** Lateral offset between strands, in design units (frame is 58 across). */
  strandSpread?: number;
  /**
   * Draw the straight blurred strokes that sit behind the bolt in Figma. Off by
   * default here — the hero already paints that beam with `thunder-mask.png`,
   * and doubling it just adds a hard line down the middle.
   */
  beam?: boolean;
  className?: string;
};

export const ElectricLine = ({
  frequency = 0.0228,
  displace = 41.89,
  fps = 14,
  weight = 1,
  strands = 1,
  strandSpread = 5,
  beam = false,
  className,
}: ElectricLineProps) => {
  const uid = useId().replace(/:/g, "");
  const count = Math.max(1, strands);
  const turbulenceRefs = useRef<(SVGFETurbulenceElement | null)[]>([]);

  /**
   * Each strand gets its own noise field, its own seed stride and its own step
   * interval. Sharing one field is cheaper, but a shared field makes every
   * strand bend the same way at the same instant — they read as parallel copies
   * rather than separate arcs. The primes here keep the clocks from ever landing
   * back in phase.
   */
  const STRIDES = [7, 11, 13, 17, 19];
  const RATES = [1, 0.78, 1.26, 0.62, 1.44];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = turbulenceRefs.current.slice(0, count);
    if (!nodes.length) return;

    const seeds = nodes.map((_, i) => 4981 + i * 1319);
    const last = nodes.map(() => 0);
    let raf = 0;

    const tick = (now: number) => {
      nodes.forEach((node, i) => {
        if (!node) return;
        const step = 1000 / Math.max(1, fps * RATES[i % RATES.length]);
        if (now - last[i] < step) return;
        last[i] = now;
        // Turbulence seeds are integers; a stride avoids the near-identical
        // fields that consecutive seeds produce.
        seeds[i] = (seeds[i] + STRIDES[i % STRIDES.length]) % 9973;
        node.setAttribute("seed", String(seeds[i]));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fps, count]);

  const gradient = (id: string, stops: readonly string[], fade: number) => (
    <linearGradient
      key={id}
      id={id}
      x1="0"
      y1="0"
      x2="0"
      y2={ALONG}
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor={stops[0]} stopOpacity="0" />
      <stop offset={fade} stopColor={stops[0]} />
      <stop offset={1 - fade} stopColor={stops[1]} />
      <stop offset="1" stopColor={stops[1]} stopOpacity="0" />
    </linearGradient>
  );

  return (
    <svg
      className={className}
      viewBox={`0 0 ${ACROSS} ${ALONG}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {/*
          The whole effect. `feDisplacementMap` bends the stroked polyline by the
          turbulence field; only the seed changes at runtime.
        */}
        {Array.from({ length: count }, (_, i) => (
          <filter
            key={i}
            id={`${uid}-bolt-f${i}`}
            x="-50%"
            y="-10%"
            width="200%"
            height="120%"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={(node) => {
                turbulenceRefs.current[i] = node;
              }}
              type="fractalNoise"
              // Detuned per strand so their kinks differ in scale, not just in
              // phase — identical frequencies read as the same bolt twice.
              baseFrequency={frequency * (1 + (i % 3) * 0.11)}
              numOctaves={3}
              seed={4981 + i * 1319}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displace * (1 - (i % 3) * 0.08)}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        ))}

        {BEAM_LAYERS.map((l, i) => gradient(`${uid}-beam-${i}`, l.stops, 0.2))}
        {BOLT_LAYERS.map((l, i) => gradient(`${uid}-bolt-${i}`, l.stops, 0.3))}

        {[...BEAM_LAYERS, ...BOLT_LAYERS].map((l, i) =>
          l.blur > 0 ? (
            <filter
              key={i}
              id={`${uid}-blur-${i}`}
              x="-100%"
              y="-20%"
              width="300%"
              height="140%"
            >
              <feGaussianBlur stdDeviation={l.blur} />
            </filter>
          ) : null,
        )}
      </defs>

      {/* Beam: straight strokes, widest and blurriest first. */}
      <g style={{ mixBlendMode: "plus-lighter" }}>
        {(beam ? BEAM_LAYERS : []).map((l, i) => (
          <line
            key={i}
            x1={CENTER}
            y1={12}
            x2={CENTER}
            y2={ALONG - 12}
            stroke={`url(#${uid}-beam-${i})`}
            strokeWidth={l.width * weight}
            filter={l.blur > 0 ? `url(#${uid}-blur-${i})` : undefined}
          />
        ))}
      </g>

      {/* Bolt: one filtered group per strand, each with its own noise field. */}
      {Array.from({ length: count }, (_, s) => {
        const offset = (s - (count - 1) / 2) * strandSpread;
        return (
          <g
            key={s}
            filter={`url(#${uid}-bolt-f${s})`}
            style={{ mixBlendMode: "plus-lighter" }}
          >
            {BOLT_LAYERS.map((l, i) => (
              <path
                key={i}
                d={spinePathAt(offset)}
                stroke={`url(#${uid}-bolt-${i})`}
                strokeWidth={l.width * weight}
                strokeLinecap="round"
                filter={
                  l.blur > 0
                    ? `url(#${uid}-blur-${BEAM_LAYERS.length + i})`
                    : undefined
                }
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

export default ElectricLine;
