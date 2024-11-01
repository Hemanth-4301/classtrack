import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="bg-slate-800 text-white flex flex-col gap-5 pt-5 justify-center text-center "
      style={{
        fontFamily: "Roboto Slab, serif",
      }}
    >
      <h1>The National Institute of Engineering</h1>

      <p className="px-10">North campus: Koorgalli, Mysuru-570018 Karnataka</p>

      <div className="flex justify-center gap-5">
        <a
          href="https://www.instagram.com/niemysuru?igsh=MWI2bXFrMjB5aWJ5Mw=="
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition-colors duration-300"
        >
          <FaInstagram className="text-3xl" />
        </a>
        <a
          href="https://www.linkedin.com/school/the-national-institute-of-engineering/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors duration-300"
        >
          <FaLinkedin className="text-3xl" />
        </a>
      </div>
      <p className="bg-black py-5 tracking-wider">
        2024 NIE &nbsp;&nbsp;|&nbsp;&nbsp; all rights reserved
      </p>
    </footer>
  );
}

export default Footer;
