import React from "react";
import { FaCode, FaMicrochip, FaCogs, FaProjectDiagram } from "react-icons/fa";

const features = [
  {
    icon: <FaCode className="text-6xl text-white mb-3" />,
    title: "Software Development",
  },
  {
    icon: <FaProjectDiagram className="text-6xl text-white mb-3" />,
    title: "Electronic Card Design",
  },
  {
    icon: <FaCogs className="text-6xl text-white mb-3" />,
    title: "Electronic Parts Procurement",
  },
  {
    icon: <FaMicrochip className="text-6xl text-white mb-3" />,
    title: "PCBs",
  },
];

const DeveloperEcosystemSection = () => {
  return (
      <section className="relative bg-[#5068a4] py-32 px-4 md:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-y-12 gap-x-8">
        <div className="flex-1 text-left md:pr-16">
          <h2 className="text-white text-3xl md:text-4xl mb-6 leading-tight">
            Explore our developer ecosystem.
          </h2>
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-20 justify-items-center">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              {feature.icon}
              <span className="text-white text-xs mt-2">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperEcosystemSection;
