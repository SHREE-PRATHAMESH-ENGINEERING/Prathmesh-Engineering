"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { privacyPolicyContent, returnPolicyContent, termsConditionsContent } from "@/lib/utils";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "privacy" | "return" | "terms" | null;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen || !type) return null;

  const getPolicyContent = () => {
    switch (type) {
      case "privacy":
        return {
          title: "Privacy Policy",
          content: (
            <div className="space-y-4">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {privacyPolicyContent}
              </div>
            </div>
          )
        };

      case "return":
        return {
          title: "Return Policy",
          content: (
            <div className="space-y-4">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {returnPolicyContent}
              </div>
            </div>
          )
        };

      case "terms":
        return {
          title: "Terms & Conditions",
          content: (
            <div className="space-y-4">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {termsConditionsContent}
              </div>
            </div>
          )
        };

      default:
        return { title: "", content: null };
    }
  };

  const { title, content } = getPolicyContent();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity policy-modal-backdrop"
        onClick={onClose}
      ></div>
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden policy-modal-content">
          <div className="sticky top-0 bg-gradient-to-r from-[#5068a4] to-[#3d5998] px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(90vh-160px)] p-6">
            <div className="prose prose-gray max-w-none">
              {content}
            </div>
          </div>
          
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Last updated: January 2025
              </p>
              <button
                onClick={onClose}
                className="btn-pcb-hero px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
