import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "A full-featured e-commerce platform with Stripe integration, user dashboard, and admin panel.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      title: "Task Management App",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Collaborative task manager with real-time updates, drag-and-drop interface, and team analytics.",
      tags: ["Vue.js", "Firebase", "Tailwind"]
    },
    {
      title: "Finance Dashboard",
      category: "Fintech",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Data visualization dashboard for personal finance tracking with investment portfolio analysis.",
      tags: ["React", "D3.js", "Express"]
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">My Portfolio</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Recent Projects</h3>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Explore some of my recent work. I love building things that solve real-world problems.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <div key={index} className="group rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative overflow-hidden h-48">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                            <div className="flex gap-2">
                                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-slate-900 transition-colors">
                                    <Github size={18} />
                                </button>
                                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-slate-900 transition-colors">
                                    <ExternalLink size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{project.category}</span>
                        <h4 className="text-xl font-bold text-slate-900 mt-3 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h4>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-medium">
                            {project.tags.map(tag => (
                                <span key={tag} className="before:content-['#'] mr-1">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;