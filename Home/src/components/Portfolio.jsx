import React from 'react';
import { Mail, Phone, Github, Linkedin, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const skills = [
    { name: 'React.js', icon: '⚛️', color: 'from-cyan-500 to-blue-600' },
    { name: 'HTML', icon: '🌐', color: 'from-orange-500 to-red-600' },
    { name: 'CSS', icon: '🎨', color: 'from-blue-500 to-indigo-600' },
    { name: 'Unreal Engine', icon: '🎮', color: 'from-purple-500 to-pink-600' },
    { name: 'AI', icon: '🤖', color: 'from-green-500 to-emerald-600' },
    { name: 'Photoshop', icon: '🖼️', color: 'from-blue-600 to-cyan-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-base sm:text-lg font-bold text-slate-900">
              <span className="hidden sm:inline">👋 Hi, I'm </span>
              <span className="text-blue-600">Samip Sangroula</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium text-slate-600">
              <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
              <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 text-sm font-medium text-slate-600">
              <a href="#home" className="hover:text-blue-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#skills" className="hover:text-blue-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Skills</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold">
                Available for Work
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Professionalism at Its <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Peak</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              Game Developer • React Expert • Software Engineer
            </p>
            <p className="text-sm sm:text-base text-slate-500 mb-8 sm:mb-10 max-w-xl mx-auto px-4">
              Building enterprise web applications and tackling challenges that push boundaries. I love creating solutions that make a difference.
            </p>
            <a 
              href="#contact" 
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">What I Do</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 px-4">Skills & Expertise</h3>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-4">
              A diverse toolkit for bringing ideas to life across multiple domains.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="group relative bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{skill.icon}</div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {skill.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer id="contact" className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Let's Work Together</h2>
            <p className="text-sm sm:text-base text-slate-400 mb-8 sm:mb-10 px-4">
              Have a project in mind? Feel free to reach out and let's create something amazing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="flex items-center justify-center gap-3 bg-slate-800 rounded-lg p-5 sm:p-6 hover:bg-slate-750 transition-colors">
                <Mail className="text-blue-400 flex-shrink-0" size={20} />
                <div className="text-left min-w-0">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Email</div>
                  <div className="font-semibold text-sm sm:text-base truncate">samip.sangroula2022@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3 bg-slate-800 rounded-lg p-5 sm:p-6 hover:bg-slate-750 transition-colors">
                <Phone className="text-blue-400 flex-shrink-0" size={20} />
                <div className="text-left">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Phone</div>
                  <div className="font-semibold text-sm sm:text-base">+977 9806623032</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <a 
                href="https://github.com/SamipSagroula" 
                className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
             
            </div>

            <div className="border-t border-slate-800 pt-6 sm:pt-8">
              <p className="text-slate-400 text-xs sm:text-sm px-4">
                © 2026 Samip Sangroula. All rights reserved. Built with passion and dedication.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;