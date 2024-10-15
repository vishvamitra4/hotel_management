import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="flex footer-distributed bg-[#1f2937] text-white py-14 px-10">
            
            <div className="footer-left md:w-2/5 w-full mb-10 md:mb-0">
                <h3 className="text-3xl font-semibold">
                    Air<span className="text-[#ff385c]">BNB</span>
                </h3>
                <p className="footer-links my-5">
                    <a href="#" className="link-1 text-white hover:text-teal-400">Home</a>
                    <span className="mx-2">|</span>
                    <a href="#" className="text-white hover:text-teal-400">Blog</a>
                    <span className="mx-2">|</span>
                    <a href="#" className="text-white hover:text-teal-400">Pricing</a>
                    <span className="mx-2">|</span>
                    <a href="#" className="text-white hover:text-teal-400">About</a>
                    <span className="mx-2">|</span>
                    <a href="#" className="text-white hover:text-teal-400">Faq</a>
                    <span className="mx-2">|</span>
                    <a href="#" className="text-white hover:text-teal-400">Contact</a>
                </p>
                <p className="text-gray-300">Company Name © 2024</p>
            </div>


            <div className="footer-center md:w-1/3 w-full mb-10 md:mb-0">
                <div className="flex items-center my-4">
                    <FaMapMarkerAlt className="text-4xl bg-gray-700 p-2 rounded-full" />
                    <p className="ml-4">
                        <span>444 S. Cedros Ave</span> Solana Beach, California
                    </p>
                </div>
                <div className="flex items-center my-4">
                    <FaPhone className="text-4xl bg-gray-700 p-2 rounded-full" />
                    <p className="ml-4">+1.555.555.5555</p>
                </div>
                <div className="flex items-center my-4">
                    <FaEnvelope className="text-4xl bg-gray-700 p-2 rounded-full" />
                    <p className="ml-4">
                        <a href="mailto:support@company.com" className="text-[#ff385c]">support@company.com</a>
                    </p>
                </div>
            </div>

            
            <div className="footer-right md:w-1/5 w-full">
                <p className="footer-company-about text-gray-300 mb-5">
                    <span className="text-white font-bold">About the company</span>
                    AirBNB , Inspiration for future getaways
                </p>
                <div className="footer-icons flex space-x-3">
                    <a href="#" className="bg-gray-700 p-2 rounded"><FaFacebook className="text-xl" /></a>
                    <a href="#" className="bg-gray-700 p-2 rounded"><FaTwitter className="text-xl" /></a>
                    <a href="#" className="bg-gray-700 p-2 rounded"><FaLinkedin className="text-xl" /></a>
                    <a href="#" className="bg-gray-700 p-2 rounded"><FaGithub className="text-xl" /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
