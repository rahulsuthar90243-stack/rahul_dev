import { div, section } from 'framer-motion/client'
import React from 'react'
import {motion} from "framer-motion"
import profile from "../assets/profile.png"

function About() {

  const stats = [
    {label: "Experience", value: "3+ Month"},
    {label: "Speciality", value: "Full Stack"},
    {label: "Focus", value: "Performance & AI Automation"}
  ]

  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-2 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-9 blur-[140px] delay-300",
    // "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]"
  ]

  return (
    <section
      id="about"
      className="w-full relative bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#08a17b] to-[#109793] animate-pulse ${c}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-16 flex flex-col gap-12">
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div
            className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#302b63]/20 to-[#302b63]/20 border border-[#1cd8d2]/25"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src={profile} alt="profile" className="absolute  inset-0" />
          </motion.div>

          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#01b689] to-[#04a19c] animate-pulse">
              Rahul Suthar
            </h2>

            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Full Stack Developer
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              Full Stack Developer passionate about building real-world web
              applications and exploring AI automation. I believe in learning
              through practical projects, continuous improvement, and solving
              real-world problems. Currently seeking opportunities to
              contribute, learn from experienced professionals, and grow as a
              software developer
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.6 }}
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold">{item.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-3 justify-center sm:justify-start">
              <a
                href="#Project"
                className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition"
              >
                View Project
              </a>
              <a
                href="#contect"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-5 py-3 hover:bg-white/20 transition"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            About Me
          </h3>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            Hi, I’m Rahul, a passionate developer and BCA student who enjoys
            turning ideas into real-world projects. I believe the best way to
            learn is by building, experimenting, and continuously improving. I’m
            currently exploring AI automation and modern development while
            working on practical projects that solve real problems. My goal is
            to keep learning, take on new challenges, and grow into a skilled
            and creative developer.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default About 