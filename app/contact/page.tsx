"use client";
import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaIndustry, FaTools, FaShippingFast, FaAward } from 'react-icons/fa';
import { contactStats, contactMethods, pcbServices, manufacturingCapabilities } from '@/lib/utils';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you for your inquiry! Our PCB engineering team will review your requirements and get back to you within 4 hours with a detailed quote and timeline.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9EE] relative overflow-hidden">
      <div className="absolute inset-0 pcb-hero-bg opacity-40"></div>
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-1 bg-gradient-to-r from-transparent via-[#5068a4] to-transparent opacity-30 animate-pulse float-element"></div>
        <div className="absolute top-40 right-20 w-24 h-1 bg-gradient-to-r from-transparent via-[#00a86b] to-transparent opacity-40 animate-pulse float-delay-1"></div>
        <div className="absolute bottom-40 left-20 w-40 h-1 bg-gradient-to-r from-transparent via-[#5068a4] to-transparent opacity-25 animate-pulse float-delay-2"></div>
        <div className="absolute bottom-20 right-10 w-28 h-1 bg-gradient-to-r from-transparent via-[#3d5998] to-transparent opacity-35 animate-pulse float-element"></div>
        
        <div className="absolute top-32 left-44 w-4 h-4 bg-[#5068a4] rounded-full opacity-40 animate-pulse electric-pulse"></div>
        <div className="absolute top-60 right-40 w-3 h-3 bg-[#00a86b] rounded-full opacity-50 animate-pulse electric-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-60 left-60 w-5 h-5 bg-[#5068a4] rounded-full opacity-30 animate-pulse electric-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-32 w-3 h-3 bg-[#3d5998] rounded-full opacity-45 animate-pulse electric-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      <section className={`relative py-20 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
          <div className="text-center animate-in">
            <h1 className="text-4xl md:text-6xl font-bold text-[#5068a4] mb-6 text-glow">
              Contact Our <span className="text-gray-800">PCB Experts</span>
            </h1>
            <p className="text-md text-gray-700 max-w-4xl mx-auto leading-relaxed text-animate-delay mb-8">
              Ready to bring your electronic projects to life? Connect with our experienced PCB manufacturing team 
              for custom solutions, rapid prototyping, and high-volume production services.
            </p>
            
            <div className="grid grid-cols-4 gap-6 mt-12 max-md:grid-cols-2 max-sm:grid-cols-1">
              {contactStats.map((stat, index) => (
                <div key={index} className="text-center animate-scale" style={{animationDelay: stat.delay}}>
                  <div className="text-4xl font-bold text-[#5068a4] text-glow">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((contact, index) => {
              const getIcon = () => {
                switch (contact.iconType) {
                  case 'phone':
                    return <FaPhone className="text-3xl" />;
                  case 'email':
                    return <FaEnvelope className="text-3xl" />;
                  case 'location':
                    return <FaMapMarkerAlt className="text-3xl" />;
                  case 'clock':
                    return <FaClock className="text-3xl" />;
                  default:
                    return <FaPhone className="text-3xl" />;
                }
              };

              return (
                <div 
                  key={index} 
                  className={`relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden animate-scale pcb-trace`}
                  style={{animationDelay: contact.delay}}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5068a4] to-[#3d5998] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                       style={{
                         backgroundImage: `radial-gradient(circle at 25% 25%, #5068a4 2px, transparent 2px), radial-gradient(circle at 75% 75%, #3d5998 1px, transparent 1px)`,
                         backgroundSize: '30px 30px, 20px 20px'
                       }}>
                  </div>
                  
                  <div className="relative text-[#5068a4] mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:text-glow">
                    {getIcon()}
                    
                    <div className="absolute inset-0 rounded-full border-2 border-[#5068a4] opacity-0 group-hover:opacity-30 group-hover:animate-ping w-12 h-12 flex items-center justify-center -m-1.5"></div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#5068a4] mb-3 group-hover:text-glow transition-all duration-500 group-hover:scale-105">{contact.title}</h3>
                  <p className="text-sm font-semibold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">{contact.info}</p>
                  
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#5068a4] to-transparent opacity-0 group-hover:opacity-60 transform scale-x-0 group-hover:scale-x-100 transition-all duration-700 mt-4 mx-auto"></div>
                  
                  <div className="absolute top-4 right-4 w-3 h-3 bg-[#5068a4] rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#00a86b] rounded-full opacity-0 group-hover:opacity-30 group-hover:animate-ping transition-opacity duration-700"></div>
                  <div className="absolute top-1/2 right-6 w-1 h-8 bg-gradient-to-b from-[#5068a4] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="bg-white rounded-3xl p-10 shadow-2xl relative overflow-hidden group animate-in-right">
              <div className="absolute inset-0 pcb-pattern opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-[#5068a4] mb-6 text-glow">Write to us</h2>
                <p className="text-gray-600 mb-8 text-md">
                  Write your query or feedback to us. Our team will review and get back to you soon.
                </p>

                {submitMessage && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8 animate-scale">
                    <p className="text-green-700 font-medium">{submitMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="animate-scale" style={{animationDelay: '0.1s'}}>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[#5068a4]/20 focus:border-[#5068a4] transition-all duration-300 hover:shadow-lg text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="animate-scale" style={{animationDelay: '0.2s'}}>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-5 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[#5068a4]/20 focus:border-[#5068a4] transition-all duration-300 hover:shadow-lg text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="animate-scale" style={{animationDelay: '0.3s'}}>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[#5068a4]/20 focus:border-[#5068a4] transition-all duration-300 hover:shadow-lg text-sm"
                      placeholder="your.email@company.com"
                    />
                  </div>

                  <div className="animate-scale" style={{animationDelay: '0.4s'}}>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-3">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[#5068a4]/20 focus:border-[#5068a4] transition-all duration-300 hover:shadow-lg text-sm"
                      placeholder="Enter subject of your inquiry"
                    />
                  </div>

                  <div className="animate-scale" style={{animationDelay: '0.5s'}}>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
                      Description *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-5 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[#5068a4]/20 focus:border-[#5068a4] transition-all duration-300 resize-vertical hover:shadow-lg text-sm"
                      placeholder="Please describe your requirements in detail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-pcb-hero text-md py-2 animate-scale"
                    style={{animationDelay: '0.6s'}}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-8">
              
              <div className="bg-white rounded-3xl p-8 shadow-2xl animate-scale" style={{animationDelay: '0.2s'}}>
                <h3 className="text-3xl font-bold text-[#5068a4] mb-6 text-glow">Why Choose Our PCB Services?</h3>
                <div className="space-y-6">
                  {pcbServices.map((feature, index) => {
                    const getIcon = () => {
                      switch (feature.iconType) {
                        case 'tools':
                          return <FaTools className="text-2xl" />;
                        case 'shipping':
                          return <FaShippingFast className="text-2xl" />;
                        case 'industry':
                          return <FaIndustry className="text-2xl" />;
                        default:
                          return <FaTools className="text-2xl" />;
                      }
                    };

                    return (
                      <div key={index} className="flex items-start space-x-4 group p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                        <div className="text-[#5068a4] group-hover:scale-110 transition-transform duration-300 group-hover:text-glow mt-1">
                          {getIcon()}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2 group-hover:text-[#5068a4] transition-colors duration-300 text-md">{feature.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-2xl animate-scale" style={{animationDelay: '0.6s'}}>
                <h3 className="text-3xl font-bold text-[#5068a4] mb-6 text-glow">Manufacturing Capabilities</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    {manufacturingCapabilities.leftColumn.map((item, index) => (
                      <div key={index}>
                        <div className="font-semibold text-gray-800">{item.label}</div>
                        <div className="text-gray-600">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {manufacturingCapabilities.rightColumn.map((item, index) => (
                      <div key={index}>
                        <div className="font-semibold text-gray-800">{item.label}</div>
                        <div className="text-gray-600">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
