import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Get in Touch</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Let's start a conversation</h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            <div className="lg:w-1/3 space-y-8">
                <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl text-white shadow-xl">
                    <h4 className="text-xl font-bold mb-6">Contact Information</h4>
                    <p className="opacity-90 mb-8 leading-relaxed text-sm">Fill up the form and our team will get back to you within 24 hours.</p>
                    
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <Phone className="mt-1 opacity-80" size={20} />
                            <div>
                                <p className="text-xs opacity-60 uppercase font-bold tracking-wider mb-1">Phone</p>
                                <p className="font-medium">+0123 4567 8910</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Mail className="mt-1 opacity-80" size={20} />
                            <div>
                                <p className="text-xs opacity-60 uppercase font-bold tracking-wider mb-1">Email</p>
                                <p className="font-medium">hello@domain.com</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <MapPin className="mt-1 opacity-80" size={20} />
                            <div>
                                <p className="text-xs opacity-60 uppercase font-bold tracking-wider mb-1">Location</p>
                                <p className="font-medium">102 Street 2714, <br/>New York, USA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:w-2/3">
                <form className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">First Name</label>
                            <input 
                                type="text" 
                                placeholder="John" 
                                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Last Name</label>
                            <input 
                                type="text" 
                                placeholder="Doe" 
                                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="john@example.com" 
                            className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                        />
                    </div>
                    
                    <div className="space-y-2 mb-8">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                        <textarea 
                            rows="4" 
                            placeholder="Tell us about your project..." 
                            className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                        ></textarea>
                    </div>
                    
                    <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2">
                        Send Message
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;