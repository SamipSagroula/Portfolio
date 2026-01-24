import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Github, Linkedin, Menu, X, ExternalLink, ArrowUpRight, Code2, Gamepad2 } from 'lucide-react';

const AnimatedRole = () => {
  const [index, setIndex] = useState(0);
  const roles = ['Software Engineer', 'Game Developer', 'React Expert'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-20 sm:h-24 overflow-hidden">
      {roles.map((role, i) => (
        <div
          key={role}
          className={`absolute inset-0 transition-all duration-700 ${
            i === index 
              ? 'opacity-100 translate-y-0' 
              : i < index 
                ? 'opacity-0 -translate-y-full' 
                : 'opacity-0 translate-y-full'
          }`}
        >
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            {role}
          </span>
        </div>
      ))}
    </div>
  );
};

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="fixed w-6 h-6 rounded-full border-2 border-cyan-400/30 pointer-events-none z-50 transition-opacity duration-300 hidden lg:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="absolute inset-0 rounded-full bg-cyan-400/10 animate-ping"></div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });
    
    const { current } = domRef;
    if (current) observer.observe(current);
    return () => current && observer.unobserve(current);
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      type: 'image', 
      title: 'FlavorFinds',
      mediaPath: '/aahomepage.png', 
      description: 'Enterprise-grade food delivery platform featuring real-time order tracking, dynamic menu management, and seamless payment integration. Built with scalability and performance in mind.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Esewa'],
      link: 'https://github.com/viperofficailll/FlavorFinds',
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      id: 2,
      type: 'video', 
      title: 'Sentinel',
      mediaPath: '/FinalInsta.mp4', 
      description: 'Immersive 3D action game built in Unreal Engine featuring advanced AI systems, dynamic lighting, and physics-based combat mechanics across multiple challenging levels.',
      tags: ['Unreal Engine', 'C++', 'Blueprints', 'Niagara VFX'],
      link: '#',
      gradient: 'from-purple-500/20 to-pink-500/20'
    }
  ];

  const skills = [
    { 
      name: 'React', 
      icon: <Code2 className="w-8 h-8" />, 
      expertise: 'Expert', 
      gradient: 'from-cyan-400 to-blue-500',
      glow: 'cyan'
    },
    { 
      name: 'HTML5', 
      icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>,
      expertise: 'Expert', 
      gradient: 'from-orange-400 to-red-500',
      glow: 'orange'
    },
    { 
      name: 'CSS3', 
      icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>,
      expertise: 'Expert', 
      gradient: 'from-blue-400 to-indigo-500',
      glow: 'blue'
    },
    { 
      name: 'Unreal', 
      icon: <Gamepad2 className="w-8 h-8" />,
      expertise: 'Advanced', 
      gradient: 'from-purple-400 to-pink-500',
      glow: 'purple'
    },
    { 
      name: 'AI/ML', 
      icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>,
      expertise: 'Intermediate', 
      gradient: 'from-emerald-400 to-green-500',
      glow: 'emerald'
    },
    { 
      name: 'Design', 
      icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
      expertise: 'Advanced', 
      gradient: 'from-pink-400 to-rose-500',
      glow: 'pink'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <MouseFollower />
      
      {/* Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="#home" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-lg transform group-hover:scale-110 transition-transform duration-300">
                  S
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>
              <span className="font-bold text-lg hidden sm:block">Samip<span className="text-cyan-400">.dev</span></span>
            </a>
            
            <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-full backdrop-blur-sm">
              {['home', 'skills', 'projects', 'contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeSection === item 
                      ? 'bg-white/10 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a 
                href="#contact" 
                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-0.5 transition-all duration-300 group"
              >
                Let's Talk
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button 
                className="md:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
              {['home', 'skills', 'projects', 'contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  className="block py-3 px-4 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 group hover:bg-white/10 transition-all cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <span className="text-sm font-medium text-gray-300">Available for freelance</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-none">
                <span className="block mb-4">I'm a</span>
                <AnimatedRole />
              </h1>
            </FadeIn>

            <FadeIn delay={400}>
              <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Crafting pixel-perfect interfaces and building immersive digital experiences. 
                Specialized in enterprise web applications and interactive game development.
              </p>
            </FadeIn>

            <FadeIn delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#projects" 
                  className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden hover:shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="relative z-10">View Projects</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
                <a 
                  href="#contact" 
                  className="px-8 py-4 border-2 border-white/20 font-semibold rounded-full hover:bg-white/5 hover:border-white/40 transform hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                >
                  Get in Touch
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={800}>
              <div className="flex justify-center gap-6 mt-16">
                <a href="#" className="group relative w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400 transition-all duration-300 transform hover:scale-110 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Github size={20} className="relative z-10 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full p-1">
            <div className="w-1 h-2 bg-white/60 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">Expertise</h2>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Arsenal</span>
              </h3>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Mastering the tools that power modern digital experiences
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500`}></div>
                  <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 cursor-default overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${skill.gradient} mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                        <div className="text-white">
                          {skill.icon}
                        </div>
                      </div>
                      
                      <h4 className="font-bold text-lg mb-1 text-white">{skill.name}</h4>
                      <p className="text-xs text-gray-400 font-medium">{skill.expertise}</p>
                      
                      <div className="absolute top-3 right-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.gradient} animate-pulse shadow-lg`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">Portfolio</h2>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Work</span>
              </h3>
            </div>
          </FadeIn>

          <div className="max-w-6xl mx-auto space-y-32">
            {projects.map((project, index) => (
              <FadeIn key={project.id}>
                <div className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl blur-3xl opacity-0 group-hover:opacity-30 transition-all duration-700`}></div>
                  
                  <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm group-hover:border-white/20 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {project.type === 'image' ? (
                          <div className="aspect-video relative overflow-hidden">
                            <img 
                              src={project.mediaPath} 
                              alt={project.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video bg-black">
                            <video 
                              src={project.mediaPath}
                              autoPlay
                              muted
                              loop
                              playsInline
                              controls
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} space-y-6`}>
                      <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-cyan-400">
                        {project.type === 'video' ? 'Game Development' : 'Web Application'}
                      </div>
                      
                      <h3 className="text-4xl lg:text-5xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a 
                        href={project.link}
                        className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:gap-3 transition-all group/link"
                      >
                        View Project 
                        <ArrowUpRight size={20} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  Let's Create Something <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Amazing Together</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Ready to bring your vision to life? Let's talk.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="grid md:grid-cols-2 gap-6 mb-16">
                <a 
                  href="mailto:samip.sangroula2022@gmail.com"
                  className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</div>
                      <div className="font-semibold">samip.sangroula2022@gmail.com</div>
                    </div>
                  </div>
                </a>

                <a 
                  href="tel:+977 9806623032"
                  className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</div>
                      <div className="font-semibold">+977 9806623032</div>
                    </div>
                  </div>
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="flex flex-col sm:flex-row items-center justify-between pt-12 border-t border-white/10 gap-6">
                <div className="text-gray-400 text-sm">
                  © 2026 Samip Sangroula. Crafted with precision.
                </div>
                
                <div className="flex gap-4">
                  <a href="#" className="group relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400 transition-all transform hover:scale-110 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Github size={18} className="relative z-10 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                 
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;