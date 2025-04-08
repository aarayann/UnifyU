
import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#244855] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-white">Stay Connected with Us!</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4">
                <MapPin className="mr-2" size={20} />
                <h3 className="font-semibold text-lg text-white">Location</h3>
              </div>
              <p className="text-sm text-gray-200 mb-3 text-center md:text-left">
                Plot Nos 8-11, TechZone II, Greater Noida, UP – 201310
              </p>
              <a 
                href="https://maps.app.goo.gl/xCS9uphBEyH8TTjc8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-[#FBE9D0] hover:underline mt-2"
              >
                Get Directions
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4">
                <Mail className="mr-2" size={20} />
                <h3 className="font-semibold text-lg text-white">Email Us</h3>
              </div>
              <a href="mailto:admissions@bennett.edu.in" className="text-sm text-gray-200 hover:text-[#FBE9D0] mb-2">
                admissions@bennett.edu.in
              </a>
              <a href="mailto:info@bennett.edu.in" className="text-sm text-gray-200 hover:text-[#FBE9D0]">
                info@bennett.edu.in
              </a>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4">
                <Phone className="mr-2" size={20} />
                <h3 className="font-semibold text-lg text-white">Call Us</h3>
              </div>
              <div className="text-sm text-gray-200 mb-2">
                <span className="block font-medium">Admission Queries:</span>
                <a href="tel:18001038484" className="hover:text-[#FBE9D0]">1800-103-8484 (Toll-Free)</a>
              </div>
              <div className="text-sm text-gray-200">
                <span className="block font-medium">General Queries:</span>
                <a href="tel:01207199300" className="hover:text-[#FBE9D0]">0120-7199300</a>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center col-span-full justify-self-center w-full md:w-auto">
            <p className="text-[#FBE9D0] font-medium">Your future starts here—let's connect!</p>
            <p className="mt-6 text-sm text-gray-300">© {new Date().getFullYear()} UnifyU. All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
