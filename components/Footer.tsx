"use client";
import { navigation, socialMediaIcons } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPhone, FaWhatsapp, FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const router = useRouter();

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      FaPhone,
      FaWhatsapp,
      FaLinkedin,
      FaInstagram,
      FaTwitter,
      FaFacebook,
      FaEnvelope
    };
    return iconMap[iconName];
  };

  const handleQuickLinkClick = (linkName: string, href: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (linkName === "Home") {
      window.location.reload();
    } else if (linkName === "Products") {
      router.push("/shop");
    } else if (linkName === "Check order") {
      router.push("/orders");
    } else {
      if (href !== "#") {
        router.push(href);
      }
    }
  };

  return (
    <>
      <footer className="relative overflow-hidden bg-gradient-to-br bg-[#5068a4] border-t-0 shadow-2xl pt-16 pb-0" aria-labelledby="footer-heading">
        <div className="mx-auto max-w-screen-xl px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 items-start pb-12">
            <div className="flex flex-col items-center md:items-start gap-y-4">
              <Image
                src="/logo v1 svg.svg"
                alt="Shree Prathmesh Engineering - Professional PCB Manufacturing"
                width={200}
                height={200}
                className=" drop-shadow-xl rounded-2xl bg-white/80 p-0.5"
              />
              <span className="text-white text-md font-normal mt-2">We bring intelligent computing everywhere</span>
            </div>
            <div className="footer-section text-center md:text-left">
              <h3 className="text-base font-bold leading-6 text-white mb-4 tracking-wide uppercase">Quick Links</h3>
              <ul role="list" className="space-y-2">
                {navigation.quicklinks.map((item, index) => (
                  <li key={item.name} className="footer-link">
                    <a
                      href={item.href}
                      onClick={(e) => handleQuickLinkClick(item.name, item.href, e)}
                      className="text-sm leading-6 text-white transition-colors duration-300 px-2 py-1 rounded-lg hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-section text-center md:text-left">
              <h3 className="text-base font-bold leading-6 text-white mb-4 tracking-wide uppercase">Our Company</h3>
              <ul role="list" className="space-y-2">
                {navigation.ourcompany.map((item, index) => (
                  <li key={item.name} className="footer-link">
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-white transition-colors duration-300 px-2 py-1 rounded-lg hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-[#162040] border-t border-blue-900/40 py-8 mt-0">
          <div className="mx-auto max-w-screen-xl px-8 flex flex-col md:flex-row items-center justify-between gap-y-6">
            <div className="flex items-center gap-x-2">
              {socialMediaIcons.map((social, index) => {
                const IconComponent = getIconComponent(social.icon);
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    {...(social.external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="flex items-center justify-center w-10 h-10 hover:bg-[#5068a4] rounded-lg hover:scale-110 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                    title={social.title}
                  >
                    {IconComponent && <IconComponent className="text-white text-lg relative z-10 group-hover:scale-110 transition-transform duration-300" />}
                  </a>
                );
              })}
            </div>
            <div className="flex flex-col items-center md:items-end">
              <span className="text-center md:text-right text-white text-sm">
                Copyright © {new Date().getFullYear()} Prathmesh Engineering. All rights reserved.
              </span>
              <span className="text-xs text-blue-300 mt-2 pl-0 md:pl-20 text-center md:text-right max-w-5xl">
                This website and its content, including text, images, code, and design, are the property of Prathmesh Engineering and are protected by copyright laws. Unauthorized use, reproduction, or distribution is strictly prohibited.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
