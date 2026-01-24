import React from 'react';
import { Code, Palette, Globe, Cpu } from 'lucide-react';

const About = () => {
    const skills = [
        { icon: <Code size={24} />, title: "Full Stack", desc: "Expert in React, Node.js, and modern stack" },
        { icon: <Palette size={24} />, title: "UI/UX Design", desc: "Creating intuitive and beautiful interfaces" },
        { icon: <Globe size={24} />, title: "Deployment", desc: "CI/CD, Cloud hosting, and optimization" },
        { icon: <Cpu size={24} />, title: "Performance", desc: "Building fast, scalable applications" }
    ];

  return (
    <section id="about" className="py-24 bg-blue-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
                <div className="relative group perspective">
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100 rounded-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-emerald-100 rounded-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                        alt="Profile" 
                        className="rounded-2xl shadow-2xl w-full max-w-md mx-auto object-cover h-[500px] transition-transform duration-500 hover:rotate-1 hover:scale-[1.02]" 
                    />
                </div>
            </div>
            
            <div className="md:w-1/2">
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">About Me</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Passionate about creating digital excellence</h3>
                <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                    I'm a creative developer who blends technical expertise with an artist's eye. 
                    I don't just write code; I build solutions. Every project is an opportunity to push boundaries and create something unique.
                </p>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    With a background in both design and engineering, I bridge the gap between aesthetics and functionality.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex items-start p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                            <div className="p-3 rounded-lg bg-slate-50 text-blue-600 mr-4 group-hover:bg-blue-50">
                                {skill.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">{skill.title}</h4>
                                <p className="text-xs text-slate-500 mt-1">{skill.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;