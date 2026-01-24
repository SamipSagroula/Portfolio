import React from 'react';
import { Mail, Phone, Github, Linkedin, Twitter } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-slate-900 text-slate-400 py-2.5 text-xs font-medium tracking-wide hidden lg:block relative z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <a href="mailto:contact@mysite.com" className="flex items-center space-x-2 hover:text-white transition-colors duration-300">
            <Mail size={14} className="text-blue-500" />
            <span>contact@mysite.com</span>
          </a>
          <span className="h-3 w-px bg-slate-700"></span>
          <div className="flex items-center space-x-2 text-slate-400 cursor-default">
            <Phone size={14} className="text-emerald-500" />
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <span className="text-slate-500">Follow Me:</span>
          <div className="flex space-x-4">
            <a href="#" aria-label="Github" className="hover:text-white hover:scale-110 transition-all duration-300"><Github size={16} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-400 hover:scale-110 transition-all duration-300"><Linkedin size={16} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400 hover:scale-110 transition-all duration-300"><Twitter size={16} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;