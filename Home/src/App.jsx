import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">Samip Sangroula</div>
        <ul className="nav-links">
          <li onClick={() => scrollToSection('home')}>Home</li>
          <li onClick={() => scrollToSection('about')}>About</li>
          <li onClick={() => scrollToSection('skills')}>Skills</li>
          <li onClick={() => scrollToSection('projects')}>Projects</li>
          <li onClick={() => scrollToSection('contact')}>Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Hi, I'm <span className="highlight">Samip Sangroula</span></h1>
          <h2>Software Engineer</h2>
          <p>Building robust and scalable solutions for the modern web.</p>
          <button className="cta-button" onClick={() => scrollToSection('projects')}>View My Work</button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <h2>About Me</h2>
          <p>
            I am a passionate Software Engineer with a knack for problem-solving and a love for clean code. 
            I specialize in building efficient, user-centric applications. When I'm not coding, you can find me exploring new technologies or solving complex algorithms.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-card">JavaScript</div>
            <div className="skill-card">React</div>
            <div className="skill-card">Node.js</div>
            <div className="skill-card">Python</div>
            <div className="skill-card">SQL</div>
            <div className="skill-card">Git</div>
            <div className="skill-card">HTML/CSS</div>
            <div className="skill-card">REST APIs</div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <h2>Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>E-Commerce Platform</h3>
              <p>A full-stack online store with secure payment integration.</p>
              <div className="tech-stack">
                <span>React</span>
                <span>Node.js</span>
              </div>
            </div>
            <div className="project-card">
              <h3>Task Management App</h3>
              <p>Productivity tool for teams to manage workflows efficiently.</p>
              <div className="tech-stack">
                <span>Vue.js</span>
                <span>Firebase</span>
              </div>
            </div>
            <div className="project-card">
              <h3>Portfolio Website</h3>
              <p>Responsive personal portfolio to showcase experience.</p>
              <div className="tech-stack">
                <span>React</span>
                <span>Vite</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <h2>Get In Touch</h2>
          <p>Interested in collaborating? Feel free to reach out!</p>
          <a href="mailto:contact@example.com" className="contact-button">Email Me</a>
          <div className="social-links">
            {/* Add actual links here */}
            <span>[LinkedIn Placeholder]</span>
            <span>[GitHub Placeholder]</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Samip Sangroula. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
