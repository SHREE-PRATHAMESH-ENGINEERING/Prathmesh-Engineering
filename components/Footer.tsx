"use client";
import { navigation } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PolicyModal from "./PolicyModal";

const Footer = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"privacy" | "return" | "terms" | null>(null);

  const handleQuickLinkClick = (linkName: string, href: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (linkName === "Home") {
      window.location.reload();
    } else if (linkName === "Products") {
      router.push("/shop");
    } else {
      if (href !== "#") {
        router.push(href);
      }
    }
  };

  const handlePolicyClick = (linkName: string, href: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (linkName === "Privacy policy") {
      setModalType("privacy");
      setModalOpen(true);
    } else if (linkName === "Return policy") {
      setModalType("return");
      setModalOpen(true);
    } else if (linkName === "Terms & conditions") {
      setModalType("terms");
      setModalOpen(true);
    } else if (linkName === "About us") {
      router.push("/about");
    } else {
      if (href !== "#") {
        router.push(href);
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  return (
    <>
      <footer className="bg-white border-t-2 border-[#5068a4] relative overflow-hidden" aria-labelledby="footer-heading">
        
        <div className="relative z-10">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mx-auto max-w-screen px-6 lg:px-8 pt-20 pb-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="group relative flex justify-center md:justify-start">
                <Image
                  src="/logo v1.png"
                  alt="Shree Prathmesh Engineering - Professional PCB Manufacturing"
                  width={250}
                  height={250}
                  className="h-auto w-auto"
                />
                
                <div className="absolute inset-0 -m-4 border border-[#5068a4] rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>
              
              <div className="footer-section group text-center md:text-left">
                <h3 className="text-lg font-bold leading-6 text-[#5068a4] relative">
                  Quick Links
                </h3>
                <ul role="list" className="mt-6 space-y-3">
                  {navigation.quicklinks.map((item, index) => (
                    <li key={item.name} className="footer-link" style={{animationDelay: `${index * 0.1}s`}}>
                      <a
                        href={item.href}
                        onClick={(e) => handleQuickLinkClick(item.name, item.href, e)}
                        className="text-sm leading-6 text-black hover:text-[#5068a4] transition-colors duration-300 relative group inline-block cursor-pointer"
                      >
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-300"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-section group text-center md:text-left">
                <h3 className="text-lg font-bold leading-6 text-[#5068a4] relative">
                  Our Company
                </h3>
                <ul role="list" className="mt-6 space-y-3">
                  {navigation.ourcompany.map((item, index) => (
                    <li key={item.name} className="footer-link" style={{animationDelay: `${index * 0.1}s`}}>
                      <a
                        href={item.href}
                        onClick={(e) => handlePolicyClick(item.name, item.href, e)}
                        className="text-sm leading-6 text-black hover:text-[#5068a4] transition-colors duration-300 relative group inline-block cursor-pointer"
                      >
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-300"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <PolicyModal
        isOpen={modalOpen}
        onClose={closeModal}
        type={modalType}
      />
    </>
  );
};

export default Footer;
