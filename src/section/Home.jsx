import React, { useEffect, useMemo, useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

const socials = [
  { Icon: FaXTwitter, label: "x", href: "https://x.com/rahulsuthar_" },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rahul-suthar-41364330a/",
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/rahulsuthar90243-stack",
  },
];

const glowVariants = {
  initial: {
    scale: 1,
    y: 0,
    filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))",
  },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13, 88, 204, 0.9)) drop-shadow(0 0 18px rgba(16, 185, 129, 0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

function Home() {
  const roles = useMemo(
    () => ["Web Developer", "Software Developer", "N8N Agents Developer"],
    [],
  );
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const delay =
      !deleting && subIndex === current.length ? 1200 : deleting ? 40 : 60;
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) {
        setSubIndex((value) => value + 1);
      } else if (!deleting && subIndex === current.length) {
        setDeleting(true);
      } else if (deleting && subIndex > 0) {
        setSubIndex((value) => value - 1);
      } else {
        setDeleting(false);
        setIndex((value) => (value + 1) % roles.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <section
      id="home"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <Navbar />
      <ParticlesBackground />
      <div className="absolute inset-0 ">
        <div
          className="  absolute -top-32 -left-32
             w-[70vw] sm:w-[z-500vw] md:w-[40vw]
             h-[70vw] sm:h-[50vw] md:h-[40vw]
             max-w-[500px] max-h-[500px]
             rounded-full
             bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
             opacity-30 sm:opacity-20 md:opacity-10
             blur-[100px] sm:blur-[130px] md:blur-[150px]
             animate-pulse"
        ></div>

        <div
          className="  absolute bottom-0 right-0
             w-[70vw] sm:w-[z-500vw] md:w-[40vw]
             h-[70vw] sm:h-[50vw] md:h-[40vw]
             max-w-[500px] max-h-[500px]
             rounded-full
             bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
             opacity-30 sm:opacity-20 md:opacity-10
             blur-[100px] sm:blur-[130px] md:blur-[150px]
             animate-pulse delay-200"
        ></div>
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle"
                style={{ height: "1em" }}
              ></span>
            </motion.div>
          </div>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hello, I'm <br />
            <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap ">
              Rahul Suthar
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            I turn complex ideas into seamless, high-impact web experiences,
            building modern, scalable, and lightning-fast applications that make a
            difference.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all"
            >
              View My Work
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 rounded-full font-medium text-black bg-white shadow-lg hover:bg-gray-200 hover:scale-105 transition-all"
            >
              My Resume
            </a>
          </motion.div>

          <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
            {socials.map(({ Icon, href }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={glowVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                style={{ display: "inline-block", overflow: "visible" }}
              >
                <Icon className="w-7 h-7 text-white" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
