import About from "./section/About"
import Home from "./section/Home"
import Projects from "./section/Projects"
import Skills from "./section/Skills"
import Experience from "./section/Experience"
import Testimonials from "./section/testimonials"
import Contact from "./section/Contact"
import CustomCursor from "./components/CustomCursor"
import OverlayMenu from "./components/OverlayMenu"



function App() {

  return (
  <div className="relative gradient text-white">
    <CustomCursor/>
  <Home/>
  <About/>
  <Skills/>
  <Projects/>
  <Experience/>
  <Testimonials/>
  <Contact/>
  </div>
  )
}

export default App
