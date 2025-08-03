"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";

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
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Information We Collect</h3>
                <p className="text-gray-700 leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, or contact us. This may include your name, email address, phone number, 
                  shipping address, and payment information.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">How We Use Your Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and account</li>
                  <li>Provide customer support</li>
                  <li>Send you promotional communications (with your consent)</li>
                  <li>Improve our services and website functionality</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Information Sharing</h3>
                <p className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy. We may share information with 
                  trusted service providers who assist us in operating our website and conducting business.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Data Security</h3>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of 
                  transmission over the internet is 100% secure.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Contact Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at 
                  privacy@shreeprathameshengineering.com or through our contact page.
                </p>
              </div>
            </div>
          )
        };

      case "return":
        return {
          title: "Return Policy",
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Return Eligibility</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We accept returns for most items within 30 days of delivery. To be eligible for a return, 
                  items must be:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>In original condition and packaging</li>
                  <li>Unused and undamaged</li>
                  <li>Include all original accessories and documentation</li>
                  <li>Have the original receipt or proof of purchase</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Custom PCB Orders</h3>
                <p className="text-gray-700 leading-relaxed">
                  Custom PCB orders and specialized electronic components may not be eligible for return 
                  unless there is a manufacturing defect or error on our part. Please contact us within 
                  48 hours of delivery to report any issues.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Return Process</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Contact our customer service team to initiate a return</li>
                  <li>Receive a Return Merchandise Authorization (RMA) number</li>
                  <li>Package the item securely with the RMA number clearly marked</li>
                  <li>Ship the item to our returns center using a trackable shipping method</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Refund Processing</h3>
                <p className="text-gray-700 leading-relaxed">
                  Once we receive and inspect your return, we will process your refund within 5-7 business days. 
                  Refunds will be issued to the original payment method. Shipping costs are non-refundable 
                  unless the return is due to our error.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Contact Us</h3>
                <p className="text-gray-700 leading-relaxed">
                  For return inquiries, please contact us at returns@shreeprathameshengineering.com 
                  or call our customer service line.
                </p>
              </div>
            </div>
          )
        };

      case "terms":
        return {
          title: "Terms & Conditions",
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Acceptance of Terms</h3>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using this website, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Use License</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Permission is granted to temporarily download one copy of the materials on 
                  Shree Prathamesh Engineering's website for personal, non-commercial transitory viewing only.
                </p>
                <p className="text-gray-700 leading-relaxed">This license shall automatically terminate if you violate any of these restrictions.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Product Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  We strive to provide accurate product descriptions and specifications. However, 
                  we do not warrant that product descriptions or other content is accurate, complete, 
                  reliable, current, or error-free. Colors and specifications may vary from actual products.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Pricing and Payment</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>All prices are listed in Indian Rupees (INR)</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Payment must be received before order processing</li>
                  <li>We accept major credit cards and secure online payments</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Shipping and Delivery</h3>
                <p className="text-gray-700 leading-relaxed">
                  Shipping times are estimates and not guaranteed. We are not responsible for delays 
                  caused by shipping carriers, customs, or other factors beyond our control. 
                  Risk of loss transfers to you upon delivery to the carrier.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Limitation of Liability</h3>
                <p className="text-gray-700 leading-relaxed">
                  In no event shall Shree Prathamesh Engineering or its suppliers be liable for any 
                  damages (including, without limitation, damages for loss of data or profit, or due to 
                  business interruption) arising out of the use or inability to use the materials on 
                  our website, even if we have been notified orally or in writing of the possibility of such damage.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#5068a4] mb-3">Governing Law</h3>
                <p className="text-gray-700 leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of India, 
                  and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                </p>
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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity policy-modal-backdrop"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden policy-modal-content">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#5068a4] to-[#3d5998] px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
            <div className="prose prose-gray max-w-none">
              {content}
            </div>
          </div>
          
          {/* Footer */}
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
