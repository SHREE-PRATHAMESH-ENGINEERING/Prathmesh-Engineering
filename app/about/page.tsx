"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9EE] relative overflow-hidden">
      {/* PCB Background Pattern */}
      <div className="absolute inset-0 pcb-hero-bg opacity-30"></div>
      
      {/* Animated Circuit Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Floating Circuit Traces */}
        <div className="absolute top-20 left-10 w-32 h-1 bg-gradient-to-r from-transparent via-[#5068a4] to-transparent opacity-30 animate-pulse float-element"></div>
        <div className="absolute top-40 right-20 w-24 h-1 bg-gradient-to-r from-transparent via-[#00a86b] to-transparent opacity-40 animate-pulse float-delay-1"></div>
        <div className="absolute bottom-40 left-20 w-40 h-1 bg-gradient-to-r from-transparent via-[#5068a4] to-transparent opacity-25 animate-pulse float-delay-2"></div>
        <div className="absolute bottom-20 right-10 w-28 h-1 bg-gradient-to-r from-transparent via-[#3d5998] to-transparent opacity-35 animate-pulse float-element"></div>
        
        {/* Circuit Nodes */}
        <div className="absolute top-32 left-44 w-4 h-4 bg-[#5068a4] rounded-full opacity-40 animate-pulse electric-pulse"></div>
        <div className="absolute top-60 right-40 w-3 h-3 bg-[#00a86b] rounded-full opacity-50 animate-pulse electric-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-60 left-60 w-5 h-5 bg-[#5068a4] rounded-full opacity-30 animate-pulse electric-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-32 w-3 h-3 bg-[#3d5998] rounded-full opacity-45 animate-pulse electric-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Hero Section */}
      <section className={`relative py-20 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
          <div className="text-center animate-in">
            <h1 className="text-5xl md:text-7xl font-bold text-[#5068a4] mb-6 text-glow">
              About <span className="text-gray-800">Shree Prathmesh Engineering</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed text-animate-delay mb-8">
              Your trusted partner in professional PCB manufacturing, delivering cutting-edge solutions 
              for the electronics industry with precision, quality, and innovation.
            </p>
            
            {/* Animated Stats */}
            <div className="grid grid-cols-4 gap-6 mt-12 max-md:grid-cols-2 max-sm:grid-cols-1">
              <div className="text-center animate-scale" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl font-bold text-[#5068a4] text-glow">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center animate-scale" style={{animationDelay: '0.4s'}}>
                <div className="text-4xl font-bold text-[#5068a4] text-glow">50K+</div>
                <div className="text-sm text-gray-600">PCBs Delivered</div>
              </div>
              <div className="text-center animate-scale" style={{animationDelay: '0.6s'}}>
                <div className="text-4xl font-bold text-[#5068a4] text-glow">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center animate-scale" style={{animationDelay: '0.8s'}}>
                <div className="text-4xl font-bold text-[#5068a4] text-glow">99.9%</div>
                <div className="text-sm text-gray-600">Quality Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in">
              <h2 className="text-4xl md:text-5xl font-bold text-[#5068a4] mb-6 text-glow">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p className="text-animate-delay">
                  Founded with a vision to revolutionize PCB manufacturing, Shree Prathmesh Engineering 
                  has grown from a small workshop to a leading manufacturer in the electronics industry. 
                  Our journey began with a simple mission: to deliver high-quality printed circuit boards 
                  that exceed customer expectations.
                </p>
                <p className="text-animate-delay-2">
                  Over the years, we have invested in state-of-the-art technology and built a team of 
                  skilled professionals who share our commitment to excellence. From single-layer prototypes 
                  to complex multi-layer production runs, we handle every project with the same level of 
                  dedication and precision.
                </p>
                <p className="text-animate-delay-2">
                  Today, we proudly serve customers across various industries, from consumer electronics 
                  to industrial automation, providing them with reliable PCB solutions that power their innovations.
                </p>
              </div>
            </div>
            <div className="relative animate-in-right">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group">
                <Image
                  src="/img/hero.jpg"
                  alt="PCB Manufacturing Process"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Circuit overlay effect */}
                <div className="absolute inset-0 pcb-circuit-bg opacity-5 group-hover:opacity-15 transition-opacity duration-500"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#5068a4] rounded-3xl opacity-20 animate-pulse"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#00a86b] rounded-full opacity-30 animate-pulse electric-pulse"></div>
              {/* Floating circuit elements */}
              <div className="absolute top-10 right-10 w-6 h-1 bg-[#5068a4] opacity-60 animate-pulse float-element"></div>
              <div className="absolute bottom-10 left-10 w-4 h-4 bg-[#5068a4] rounded-full opacity-40 animate-pulse electric-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 pcb-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-in">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5068a4] mb-6 text-glow">
              Mission & Vision
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#5068a4] to-[#00a86b] mx-auto animate-scale"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-xl transition-all duration-500 border border-gray-100 group relative overflow-hidden animate-scale" style={{animationDelay: '0.2s'}}>
              {/* Circuit background effect */}
              <div className="absolute top-0 right-0 w-20 h-20 pcb-circuit-bg opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="w-20 h-20 bg-gradient-to-br from-[#5068a4] to-[#3d5998] rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white text-3xl font-bold text-glow">M</span>
              </div>
              <h3 className="text-3xl font-bold text-[#5068a4] mb-6 group-hover:text-glow transition-all duration-300">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                To provide exceptional PCB manufacturing services that enable our clients to bring 
                their electronic innovations to life. We are committed to delivering superior quality, 
                competitive pricing, and outstanding customer service while maintaining the highest 
                standards of environmental responsibility.
              </p>
              
              {/* Animated bottom border */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#5068a4] to-[#00a86b] group-hover:w-full transition-all duration-500"></div>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-xl transition-all duration-500 border border-gray-100 group relative overflow-hidden animate-scale" style={{animationDelay: '0.4s'}}>
              {/* Circuit background effect */}
              <div className="absolute top-0 right-0 w-20 h-20 pcb-circuit-bg opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="w-20 h-20 bg-gradient-to-br from-[#00a86b] to-[#5068a4] rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white text-3xl font-bold text-glow">V</span>
              </div>
              <h3 className="text-3xl font-bold text-[#5068a4] mb-6 group-hover:text-glow transition-all duration-300">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                To be the most trusted and preferred PCB manufacturing partner globally, recognized 
                for our innovation, quality, and reliability. We envision a future where our advanced 
                manufacturing capabilities contribute to breakthrough technologies that shape the world.
              </p>
              
              {/* Animated bottom border */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#00a86b] to-[#5068a4] group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#FAF9EE] relative">
        <div className="absolute inset-0 pcb-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-in">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5068a4] mb-6 text-glow">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover what sets us apart in the competitive PCB manufacturing landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Fast Turnaround",
                description: "Quick delivery times without compromising on quality, ensuring your projects stay on schedule."
              },
              {
                icon: "🛠️",
                title: "Expert Team",
                description: "Skilled professionals with years of experience in PCB design and manufacturing."
              },
              {
                icon: "🤝",
                title: "Customer Support",
                description: "Dedicated support team providing technical assistance and project guidance."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden animate-scale pcb-trace" style={{animationDelay: `${index * 0.1 + 0.2}s`}}>
                {/* Circuit background effect */}
                <div className="absolute top-0 right-0 w-16 h-16 pcb-circuit-bg opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#5068a4] mb-4 group-hover:text-glow transition-all duration-300">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{feature.description}</p>
                
                {/* Animated bottom border */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#5068a4] to-[#00a86b] group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAF9EE] relative">
        <div className="absolute inset-0 pcb-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-in">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5068a4] mb-6 text-glow">
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Meet the experienced professionals driving our success in PCB innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Prathmesh Shah",
                position: "Founder & CEO",
                description: "Visionary leader with 15+ years in electronics manufacturing",
                initials: "PS"
              },
              {
                name: "Dr. Rajesh Kumar",
                position: "Chief Technology Officer",
                description: "Expert in advanced PCB technologies and process optimization",
                initials: "RK"
              },
              {
                name: "Priya Mehta",
                position: "Quality Assurance Director",
                description: "Ensuring the highest standards in every product we deliver",
                initials: "PM"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-3xl p-10 text-center shadow-2xl hover:shadow-xl transition-all duration-500 group relative overflow-hidden animate-scale" style={{animationDelay: `${index * 0.2 + 0.2}s`}}>
                {/* Circuit background effect */}
                <div className="absolute top-0 right-0 w-20 h-20 pcb-circuit-bg opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                <div className="w-28 h-28 bg-gradient-to-br from-[#5068a4] to-[#3d5998] rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg relative">
                  <span className="text-white text-2xl font-bold text-glow">{member.initials}</span>
                  {/* Pulse ring effect */}
                  <div className="absolute inset-0 bg-[#5068a4] rounded-full animate-pulse opacity-20 group-hover:opacity-30"></div>
                </div>
                <h3 className="text-2xl font-bold text-[#5068a4] mb-3 group-hover:text-glow transition-all duration-300">{member.name}</h3>
                <p className="text-gray-600 font-semibold mb-4 text-lg">{member.position}</p>
                <p className="text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{member.description}</p>
                
                {/* Animated bottom border */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#5068a4] to-[#00a86b] group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-[#5068a4] to-[#3d5998] relative overflow-hidden">
        {/* Circuit background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-1 bg-white opacity-10 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-1 bg-white opacity-15 animate-pulse float-delay-1"></div>
          <div className="absolute bottom-10 left-20 w-24 h-1 bg-white opacity-10 animate-pulse float-delay-2"></div>
          <div className="absolute bottom-20 right-10 w-18 h-1 bg-white opacity-15 animate-pulse"></div>
          
          {/* Circuit nodes */}
          <div className="absolute top-16 left-32 w-3 h-3 bg-white rounded-full opacity-20 animate-pulse electric-pulse"></div>
          <div className="absolute bottom-16 right-32 w-4 h-4 bg-white rounded-full opacity-15 animate-pulse electric-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="animate-in">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 text-glow">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed text-animate-delay">
              Let's discuss how we can help bring your electronic innovations to life with our 
              professional PCB manufacturing services and cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-animate-delay-2">
              <a
                href="/contact"
                className="border-2 border-white text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-white hover:text-[#5068a4] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 animate-scale"
                style={{animationDelay: '0.8s'}}
              >
                Contact Us Today
              </a>
              <a
                href="/shop"
                className="bg-white text-[#5068a4] px-10 py-5 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105 animate-scale"
                style={{animationDelay: '1s'}}
              >
                View Our Products
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
