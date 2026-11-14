import Hero from './components/Hero';
import Process from './components/Process';
import Contact from './components/Contact';
import PixelTransition from './components/ui/PixelTransition';
import ScrollStack, { ScrollStackItem } from './components/ui/ScrollStack';
import Lanyard from './components/ui/Lanyard';
import './index.css';

const projects = [
  {
    title: "E-Commerce (Fashion Boutique)",
    desc: "A full-featured modern online store experience.",
    url: "https://akuma-gears-demo.netlify.app/",
    color1: "#FF5E00",
    color2: "#030305"
  },
  {
    title: "Dental",
    desc: "Professional and clean web presence for dental care.",
    url: "https://dentaljhs.netlify.app/",
    color1: "#FF003C",
    color2: "#030305"
  },
  {
    title: "Interior Design",
    desc: "Elegant portfolio for modern interior design agencies.",
    url: "https://interiordesignersjhs.netlify.app/",
    color1: "#FF2A00",
    color2: "#030305"
  },
  {
    title: "Onboard Project",
    desc: "A streamlined client onboarding platform.",
    url: "https://lewts.netlify.app/",
    color1: "#FF5E00",
    color2: "#030305"
  },
  {
    title: "Gym",
    desc: "High-energy fitness center landing page.",
    url: "https://gym-demo-webcreations.netlify.app/",
    color1: "#FF003C",
    color2: "#030305"
  },
  {
    title: "Restaurant",
    desc: "Premium restaurant experience and digital menu.",
    url: "https://luxebristo-webcreations.netlify.app/",
    color1: "#FF5E00",
    color2: "#030305"
  },
  {
    title: "Creative Portfolio",
    desc: "Showcase of digital web creations and process.",
    url: "https://portfolio-webcreations.netlify.app/#processare",
    color1: "#FF003C",
    color2: "#030305"
  },
  {
    title: "TSS Computer",
    desc: "Professional computer and technology services.",
    url: "https://tsscomputer.in/",
    color1: "#FF2A00",
    color2: "#030305"
  },
  {
    title: "E-Commerce Site",
    desc: "Modern e-commerce platform and storefront.",
    url: "https://ecommercestoredemo-webcreations.netlify.app/",
    color1: "#FF5E00",
    color2: "#030305"
  },
  {
    title: "7ven Heaven",
    desc: "Artisan bakery and cafe web experience.",
    url: "https://rococo-mousse-659228.netlify.app/",
    color1: "#FF003C",
    color2: "#030305"
  }
];

function App() {
  return (
    <div className="portfolio-app">
      <Hero />
      <section id="projects" className="portfolio-section" style={{ padding: '0 5vw', display: 'block' }}>
        <h2 className="section-title" style={{ textAlign: 'center', margin: '100px 0 0 0' }}>Featured Projects</h2>
        <ScrollStack
          useWindowScroll={true}
          itemDistance={50}
          itemScale={0.05}
          itemStackDistance={30}
          stackPosition="25%"
          scaleEndPosition="5%"
          baseScale={0.8}
          scaleDuration={0.5}
          rotationAmount={1.5}
          blurAmount={2}
        >
          {projects.map((project, index) => (
            <ScrollStackItem key={index} itemClassName="project-card">
              <PixelTransition
                firstContent={
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                  </div>
                }
                secondContent={
                  <div className="project-content" style={{ backgroundColor: project.color1, color: project.color2 }}>
                    <h3 style={{ background: 'none', WebkitTextFillColor: 'initial', color: project.color2 }}>
                      {project.title}
                    </h3>
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ 
                        color: project.color2, 
                        fontWeight: 'bold', 
                        textDecoration: 'none', 
                        fontSize: '1.2rem',
                        border: `2px solid ${project.color2}`,
                        padding: '0.8rem 2rem',
                        borderRadius: '30px',
                        marginTop: '1.5rem',
                        display: 'inline-block',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = project.color2;
                        e.currentTarget.style.color = project.color1;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = project.color2;
                      }}
                    >
                      Visit Live Site
                    </a>
                  </div>
                }
                gridSize={12}
                pixelColor={project.color1}
                animationStepDuration={0.4}
                aspectRatio="0"
                style={{ width: '100%', height: '100%' }}
              />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>
      
      <Process />

      <section id="about" style={{ background: '#050508', minHeight: '100vh', display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}>
        <div className="about-section-container">

          {/* LEFT: Bio */}
          <div className="about-content-left">

            <span style={{ display: 'inline-block', background: 'linear-gradient(135deg,rgba(255,94,0,0.15),rgba(255,0,60,0.15))', border: '1px solid rgba(255,94,0,0.3)', borderRadius: '999px', color: '#ff9c5e', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '6px 20px', width: 'fit-content' }}>
              Portfolio · 2025
            </span>

            <h2 style={{ fontSize: '72px', fontWeight: 800, lineHeight: 1.05, color: '#fff', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
              About<br />
              <span className="hero-gradient-text">Me.</span>
            </h2>

            <p style={{ fontSize: '18px', lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', margin: 0, maxWidth: '540px' }}>
              Hey! I'm <strong style={{ color: '#fff', fontWeight: 700 }}>Atharv Singh</strong>, a 16-year-old developer and creative thinker from India. I specialize in crafting beautiful, interactive web experiences that push the boundaries of what browsers can do.
            </p>
            <p style={{ fontSize: '18px', lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', margin: 0, maxWidth: '540px' }}>
              Currently a student at <strong style={{ color: '#fff', fontWeight: 700 }}>RLPS</strong>, I've been programming for 3+ years — building everything from UI design systems to 3D web apps. When I'm not coding, I'm designing, exploring new tech, or working on creative side projects.
            </p>

            {/* Stats */}
            <div className="about-stats-container" style={{ display: 'flex', gap: '40px', marginTop: '8px' }}>
              {[{ num: '3+', label: 'Years Coding' }, { num: '16', label: 'Years Old' }, { num: '10+', label: 'Projects Built' }].map(s => (
                <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span className="hero-gradient-text" style={{ fontSize: '40px', fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>{s.num}</span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Skill chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['React', 'TypeScript', 'Three.js', 'Node.js', 'Tailwind CSS', 'Figma', 'Next.js'].map(skill => (
                <span key={skill} style={{ padding: '8px 18px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontWeight: 500 }}>{skill}</span>
              ))}
            </div>

            {/* Info rows */}
            <div className="about-info-rows" style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '28px' }}>
              {[{ label: 'Location', value: 'India' }, { label: 'School', value: 'RLPS' }, { label: 'Available for', value: 'Freelance · Collabs · Internships' }].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '20px', alignItems: 'baseline' }}>
                  <span style={{ minWidth: '120px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>{item.label}</span>
                  <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT: Lanyard — sticky full-height column */}
          <div className="about-lanyard-wrapper">
            <div className="about-lanyard-sticky">
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </div>
          </div>

        </div>
      </section>

      <Contact />
    </div>
  );
}

export default App;
