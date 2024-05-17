import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const FooterComponent = () => {
  return (
    <Footer className="relative z-50 bg-gradient-to-r from-green-600 to-blue-600 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">Help Center</h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Discord Server
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Twitter
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Facebook
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Licensing
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">Company</h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Press
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">Follow Us</h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Facebook
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Instagram
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Twitter
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200 transition-colors text-gray-300" href="#">
                  Dribbble
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-500 pt-6 flex flex-col sm:flex-row sm:justify-between items-center">
          <p className="text-sm text-gray-300 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} EcoPlace. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Footer.Icon href="#" icon={BsFacebook} className="text-gray-300 hover:text-white transition-colors" />
            <Footer.Icon href="#" icon={BsInstagram} className="text-gray-300 hover:text-white transition-colors" />
            <Footer.Icon href="#" icon={BsTwitter} className="text-gray-300 hover:text-white transition-colors" />
            <Footer.Icon href="#" icon={BsGithub} className="text-gray-300 hover:text-white transition-colors" />
            <Footer.Icon href="#" icon={BsDribbble} className="text-gray-300 hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
