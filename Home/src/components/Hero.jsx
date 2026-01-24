import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-white">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/3 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[100px] opacity-60"></div>
        
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Available for Work
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
                    Crafting digital <br/>
                    <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">experiences</span> that matter.
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    I'm a passionate Full Stack Developer specializing in building exceptional digital experiences. 
                    I transform complex problems into beautiful, intuitive designs.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#portfolio" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 group">
                        View My Work
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <a href="#" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-slate-700 border border-slate-200 font-medium hover:border-slate-300 hover:bg-slate-50 transition-all hover:shadow-lg flex items-center justify-center gap-2">
                        <Download size={18} />
                        Download CV
                    </a>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;