import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { IoMdClose } from "react-icons/io";

function OverlayMenu({ isOpen, onClose }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = isMobile ? "95% 8%" : "50% 8%";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, clipPath: `circle(0% at ${origin})` }}
          animate={{ opacity: 1, clipPath: `circle(150% at ${origin})` }}
          exit={{ opacity: 0, clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80  backdrop-blur-sm "
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Close Menu"
          >
            <IoMdClose />
          </button>

          <ul className="space-y-6 text-center">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Experience",
              "Testimonials",
              "Contact",
            ].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OverlayMenu;