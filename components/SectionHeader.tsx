import Reveal from "./Reveal";

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  center = false,
  gradient = "amber",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  center?: boolean;
  gradient?: "amber" | "cyan" | "none";
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={`mt-4 heading-lg ${
            gradient === "amber"
              ? "text-gradient-amber"
              : gradient === "cyan"
                ? "text-gradient-cyan"
                : "text-white"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={`mt-5 font-mono text-sm leading-relaxed text-ink-200 ${
              center ? "mx-auto" : ""
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
