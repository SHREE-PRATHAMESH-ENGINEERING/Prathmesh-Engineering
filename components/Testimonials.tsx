"use client";
import React from 'react';
import { testimonials } from '@/lib/utils';

const Testimonials = () => {

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF9EE] to-white relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-[#5068a4]/5 via-transparent to-[#5068a4]/5"></div>
      
      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-[#5068a4] mb-6 text-glow">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-md">
            Don't just take our word for it. Here's what industry professionals say about our PCB manufacturing services and quality.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-[#5068a4] to-[#00a86b] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5068a4] to-[#3d5998] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                   style={{
                     backgroundImage: `radial-gradient(circle at 25% 25%, #5068a4 2px, transparent 2px), radial-gradient(circle at 75% 75%, #3d5998 1px, transparent 1px)`,
                     backgroundSize: '30px 30px, 20px 20px'
                   }}>
              </div>

              <div className="relative mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-10 h-10 text-[#5068a4] opacity-60 group-hover:opacity-80 group-hover:text-glow transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
                
                <div className="absolute inset-0 rounded-full border-2 border-[#5068a4] opacity-0 group-hover:opacity-20 group-hover:animate-ping w-12 h-12 -m-1"></div>
              </div>

              <p className="text-sm text-gray-700 mb-6 leading-relaxed italic group-hover:text-gray-800 transition-colors duration-300">
                "{testimonial.content}"
              </p>

              <div className="flex items-center mb-6 group-hover:scale-105 transition-transform duration-300">
                {renderStars(testimonial.rating)}
              </div>

              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full bg-[#5068a4] flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-xl">
                  {testimonial.avatar}
                  
                  <div className="absolute inset-0 rounded-full border-2 border-[#00a86b] opacity-0 group-hover:opacity-40 group-hover:animate-pulse"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg group-hover:text-[#5068a4] group-hover:text-glow transition-all duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {testimonial.position}
                  </p>
                  <p className="text-xs text-[#5068a4] font-medium group-hover:font-bold group-hover:text-[#3d5998] transition-all duration-300">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#5068a4] to-transparent opacity-0 group-hover:opacity-60 transform scale-x-0 group-hover:scale-x-100 transition-all duration-700 mt-6 mx-auto"></div>
              
              <div className="absolute top-4 right-4 w-3 h-3 bg-[#5068a4] rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#00a86b] rounded-full opacity-0 group-hover:opacity-30 group-hover:animate-ping transition-opacity duration-700"></div>
              <div className="absolute top-1/2 right-8 w-1 h-8 bg-gradient-to-b from-[#5068a4] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .grid > div {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
