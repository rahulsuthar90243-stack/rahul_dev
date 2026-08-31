import Navbar from "./components/Navbar"
import About from "./section/About"
import Home from "./section/Home"
import Projects from "./section/Projects"
import Skills from "./section/Skills"
import Experience from "./section/Experience"
import Testimonials from "./section/testimonials"
import Contact from "./section/Contact"



function App() {

  return (
  <div className="relative gradient">
  <Navbar/>
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
