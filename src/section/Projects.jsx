import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import photo1 from "../assets/photo1.png"
import photo2 from "../assets/photo2.png"
import photo3 from "../assets/photo3.png"
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"

const useIsMobile = (query = "(max-width : 639px)") => {  // default query is for mobile devices with a max width of 639px
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  )

  useEffect(() => {
    if(typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change" , handler);
  }, [query])
  return isMobile;

}

function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef();

  const projects = useMemo(
    () => [
      {
        title: "AI Tools Directory",
        link: "https://ai-hunt-delta.vercel.app/",
        bgColor: "#3884d3",
        image: isMobile ? img1 : photo1,
      },
       {
        title: "snake-game",
        link: "https://ai-hunt-delta.vercel.app/",
        bgColor: "#0dad3d",
        image: isMobile ? img2 : photo2,
      },
       {
        title: "Kanban-Board",
        link: "https://ai-hunt-delta.vercel.app/",
        bgColor: "#dc9317",
        image: isMobile ? img3 : photo3
      }
    ],
    [isMobile]
  );

  const {scrollYProgress} = useScroll({
    target:sceneRef,
    offset : ["start start", "end end"]
  })

  const thresholds = projects.map((_,i) => (i+1)/projects.length)
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length -1 : idx)
  });
  const activeProject = projects[activeIndex]

  return (
    <section id='project'
    ref={sceneRef}
    className='relative text-white'
    style={{
      height : `${100*projects.length}vh`,
      backgroundColor : activeProject.bgColor,
      transition : "background-color 400ms ease"
    }}
    >

      <div className='sticky top-0 h-screen flex flex-col items-center overflow-hidden pt-5 sm:pt-6'>
        <h2 className='z-10 text-center text-base font-semibold sm:text-lg'>
          My Work
        </h2>

        <div className='relative flex w-full flex-1 items-center justify-center px-5 sm:px-10'>
         {projects.map((project, idx) => (
          <div key={project.title}
          className={`absolute left-1/2 top-1/2 w-full max-w-[1100px] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeIndex === idx ? "z-20 opacity-100" : "z-0 opacity-0"}`}
          >

         <AnimatePresence mode="wait">
          {activeIndex === idx && (
            <motion.h3 key={project.title}
            initial = {{opacity: 0, y: -30}}
            animate = {{opacity: 1, y: 0}}
            exit = {{opacity: 0, y: 30}}
            transition = {{duration: 0.5, ease : "easeOut"}}
            className='absolute -top-14 left-0 z-20 whitespace-nowrap text-[clamp(2.5rem,7vw,5.8rem)] font-semibold italic leading-none tracking-tight text-white drop-shadow-lg sm:-top-20 sm:-left-8'
            style={{
              zIndex: 5,
            }}>
              {project.title}
            </motion.h3>
          )}
         </AnimatePresence>

         <div className={`relative w-full overflow-hidden rounded-md bg-black/20 shadow-[0_24px_45px_-18px_rgba(0,0,0,0.85)] sm:rounded-lg ${isMobile ? "aspect-[9/16] max-w-[430px]" : "aspect-video"}`}
                         style={{zIndex:10, transition: "box-shadow 250ms ease"}}>
          <img src={project.image} alt={project.title} 
          className='h-full w-full object-contain drop-shadow-2xl'
          style={{
            position: "relative",
            zIndex: 10,
            filter: "drop-shadow(0,16px 40px rgba(0,0,0, 0.65))",
            transition: "filter 200ms ease",
          }}
          loading="lazy"
          /> 
          <div className='pointer-events-none absolute inset-0'
          style={{
            zIndex: 11,
            background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)"
          }}>
          </div>
         </div >
          </div>
         ))}
        </div>
        <div className={`absolute ${isMobile ? "bottom-20" : "bottom-10"}`}>
          <a href={activeProject?.link} 
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all'
          aria-label={`View ${activeProject?.title}`}
          >View Project</a>
        </div>
      </div>
    </section>
  )
}

export default Projects