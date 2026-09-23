import OverlayMenu from "./OverlayMenu";
import React, { useState, useRef } from "react";
import Logo3 from "../assets/Logo3.png";
import { FiMenu } from "react-icons/fi";
import { useEffect } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(window.scrollY);
  const timerId = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        if (timerId.current) clearTimeout(timerId.current);
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        if (timerId.current) clearTimeout(timerId.current);
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true);
        if (timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => setVisible(false), 3000);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full flex items-center justify-center px-6 py-4 z-50 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0 pointer-events-none"}`}
       initial={{ opacity: 0, y: 20}}
           animate={{ opacity: 1, y: 0}}
           transition={{ duration: 0.8, delay: 0.3}}
      >
        <div className="absolute left-6 flex items-center">
          <img src={Logo3} alt="logo" className="mt-8 w-12 h-12" />
          <div className="mt-12 text-3xl font-bold text-white hidden sm:block">
            Rahul
          </div>
        </div>

        <div className="block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white text-3xl focus:outline-none mt-4 cursor-pointer"
          >
            <FiMenu />
          </button>
        </div>

        <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 mt-4">
          <a
            href="#contact"
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Reach Out
          </a>
        </div>

      </motion.nav>

      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Navbar;
