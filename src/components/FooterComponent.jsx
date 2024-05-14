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
    <Footer className="relative z-50 bg-primary">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4 ">

          <div>
            <h4 className="text-white">Help Center</h4>
            <div className="grid">
              <a className="text-white" href="">Discord Server</a>
              <a className="text-white" href="">Twitter</a>
              <a className="text-white" href="">Facebook</a>
              <a className="text-white" href="">Contact Us</a>
            </div>
          </div>
          <div>
          <h4 className="text-white">Legal</h4>
            <div className="grid">
              <a className="text-white" href="">Privacy Policy</a>
              <a className="text-white" href="">Licensing</a>
              <a className="text-white" href="">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between ">
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent