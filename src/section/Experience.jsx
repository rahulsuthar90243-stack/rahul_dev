import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ExperienceCard from "../components/ExperienceCard";
import ParticlesBackground from "../components/ParticlesBackground.jsx"

// Add more entries here later — no other code needs to change.
const experiences = [
  {
    role: "Trainee Automation Specialist",
    company: "AnantKaya Solutions Pvt. Ltd.",
    duration: "May 2026 – August 2026",
    description:
      "Worked on AI automation workflows and agent-based systems using n8n, APIs, webhooks, and modern AI tools. Built and tested automation workflows for real-world business processes and patient communication systems.",
    technologies: ["n8n", "AI Automation", "APIs", "Webhooks", "JavaScript"],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  // Tracks scroll progress as the section moves through the viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 40%"],
  });

  // Horizontal line fill, tied directly to scroll progress.
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Card + node react to the same progress so scrolling up reverses them.
  const cardOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0, 0.4], [24, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.4], [0.96, 1]);
  const nodeScale = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);
  const nodeShadow = useTransform(
    scrollYProgress,
    [0.1, 0.45],
    [
      "0 0 0px 0px rgba(129,140,248,0)",
      "0 0 26px 4px rgba(196,181,253,0.6)",
    ]
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-black py-24 sm:py-32 overflow-hidden"
    >
      <ParticlesBackground/>
      <motion.h2 className="text-center text-3xl sm:text-4xl font-semibold text-white mb-16 sm:mb-20"
      initial={{opacity:0, y: -30}}
      whileInView={{opacity:1, y:0}}>
        Experience
      </motion.h2>

      {/* ---------- Desktop / tablet: horizontal timeline ---------- */}
      <div className="hidden md:flex flex-col items-center">
        <div className="relative w-full max-w-2xl px-6">
          {experiences.map((exp) => (
            <motion.div
              key={exp.role + exp.company}
              style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
              className="flex justify-center mb-8"
            >
              <ExperienceCard {...exp} />
            </motion.div>
          ))}

          {/* connector from card down to node */}
          <div className="mx-auto h-8 w-px bg-white/30" />

          {/* node */}
          <div className="flex justify-center">
            <motion.span
              style={{ scale: nodeScale, boxShadow: nodeShadow }}
              className="block h-3.5 w-3.5 rounded-full bg-white ring-4 ring-white/10"
            />
          </div>

          {/* timeline line */}
          <div className="relative mt-6 h-[2px] w-full bg-white/25 shadow-[0_0_18px_rgba(196,181,253,0.22)]">
            <motion.div
              style={{ scaleX: lineScaleX }}
              className="absolute inset-y-0 left-0 h-full w-full origin-left bg-gradient-to-r from-white via-violet-200 to-violet-400 shadow-[0_0_10px_rgba(196,181,253,0.8)]"
            />
          </div>
        </div>
      </div>

      {/* ---------- Mobile: vertical timeline ---------- */}
      <div className="flex md:hidden flex-col items-center px-4">
        <div className="relative flex flex-col items-center">
          {/* vertical track */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-white/20">
            <motion.div
              style={{ scaleY: lineScaleX }}
              className="w-px h-full origin-top bg-gradient-to-b from-white via-violet-200 to-violet-400 shadow-[0_0_10px_rgba(196,181,253,0.8)]"
            />
          </div>

          <motion.span
            style={{ scale: nodeScale }}
            className="relative z-10 block h-3.5 w-3.5 rounded-full bg-white ring-4 ring-white/10 mb-8"
          />

          {experiences.map((exp) => (
            <motion.div
              key={exp.role + exp.company}
              style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
              className="relative z-10 mb-8"
            >
              <ExperienceCard {...exp} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}