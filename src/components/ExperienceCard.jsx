import { motion } from "framer-motion";

/**
 * ExperienceCard
 * Purely presentational — renders a single experience entry.
 * Reusable: pass different props to render multiple cards later.
 */
export default function ExperienceCard({
  role,
  company,
  duration,
  description,
  technologies = [],
}) {
  return (
    <motion.article
      className="
        w-full max-w-sm sm:max-w-md
        rounded-2xl border border-white/10
        bg-white/[0.03] backdrop-blur-xl
        px-6 py-6 sm:px-7 sm:py-7
        shadow-[0_0_40px_-12px_rgba(99,102,241,0.25)]
        hover:border-white/20
        transition-colors duration-300
      "
    >
      <header className="mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
          {role}
        </h3>
        <p className="mt-1 text-sm sm:text-[15px] text-indigo-300/90 font-medium">
          {company}
        </p>
        <p className="mt-1 text-xs sm:text-sm text-gray-400">{duration}</p>
      </header>

      <p className="text-sm sm:text-[15px] text-gray-300/90 leading-relaxed">
        {description}
      </p>

      {technologies.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="
                text-xs text-gray-300
                bg-white/5 border border-white/10
                rounded-full px-3 py-1
              "
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}