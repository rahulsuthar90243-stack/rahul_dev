import About from "./section/About"
import Home from "./section/Home"
import Projects from "./section/Projects"
import Skills from "./section/Skills"
import Experience from "./section/Experience"
import Testimonials from "./section/Testimonials"
import Contact from "./section/Contact"
import CustomCursor from "./components/CustomCursor"
import { useState } from "react"
import IntroAnimation from "./components/IntroAnimation"
import GitandLettcdoePage from "./section/GitandLettcdoePage"



function App() {

  const [introDone, setIntroDone] = useState(true);

  return (

    <>
    {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)}/>}
   {introDone && (
  <div className="relative gradient text-white">
    <CustomCursor/>
  <Home/>
  <About/>
  <GitandLettcdoePage/>
  <Skills/>
  <Projects/>
  <Experience/>
  {/* <Testimonials/> */}
  <Contact/>
  </div>
  )}
  </>
  )
}

export default App
