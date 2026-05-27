import { lazy, Suspense } from "react";
import Navbar from "@/layout/Navbar";
import Hero from "@/sections/Hero";
import { Footer } from "./layout/Footer";

const About = lazy(() => import("@/sections/About"));
const Projects = lazy(() => import("@/sections/Projects"));
const Experiences = lazy(() => import("@/sections/Experiences"));
const Testimonials = lazy(() => import("@/sections/Testimonials"));
const Contact = lazy(() => import("@/sections/Contact"));

function SectionFallback() {
  return <div className="py-32" aria-hidden="true" />;
}

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden" >
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experiences />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
