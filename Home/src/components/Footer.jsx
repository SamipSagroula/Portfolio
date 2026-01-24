import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <span className="text-2xl font-bold text-white">Portfoli.</span>
                        <p className="text-sm mt-2 text-slate-400">Building digital experiences that matter.</p>
                    </div>
                    
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-blue-400 transition-colors"><Github size={20} /></a>
                        <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
                
                <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>&copy; {currentYear} Portfoli. All rights reserved.</p>
                    <p className="flex items-center gap-1 mt-2 md:mt-0">
                        Made with <Heart size={14} className="text-red-500 fill-red-500" /> by You
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;