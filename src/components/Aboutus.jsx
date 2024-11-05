import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import ContactModal from "./ContactModal";
import Footer from "./Footer";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import karthi from "../images/karthi.jpg";
import ganu from "../images/ganu.jpg";
import hem from "../images/hem.jpg";
import mam from "../images/jayasriMam.jpg";
import { motion } from "framer-motion";

function Aboutus() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar onContactClick={openModal} />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      <div
        style={{ fontFamily: "Roboto Slab, serif", fontWeight: "400" }}
        className="bg-[#e0e0e0]"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center text-3xl md:text:2xl lg:text-3xl p-7 bg-[#e0e0e0]"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="px-5 pb-5 lg:px-10 text-md lg:text-lg bg-[#e0e0e0]"
          style={{ lineHeight: "1.8rem", fontFamily: "Roboto Slab, serif" }}
        >
          We are a team of Computer Science students from <b>CSE-B</b> -{" "}
          <b>Karthikeya S</b>, <b>Ganesha M</b>, and <b>Hemanth Kumar R</b> -
          dedicated to applying technology to solve real-world challenges. Under
          the guidance of our mentor, <b>Jayasri Mam</b>, we developed this
          project as our <b>minor project</b> to simplify the classroom
          availability tracking problem for students and teachers at{" "}
          <b>The National Institute of Engineering (North Campus)</b>. Our aim
          is to create clear, effective tools that support the educational
          community.
        </motion.p>
      </div>

      <div
        style={{ fontFamily: "Roboto Slab, serif", fontWeight: "500" }}
        className="bg-[#e0e0e0]"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-2xl md:text-3xl lg:text-3xl p-4 bg-slate-300 "
        >
          Team Members
        </motion.h1>
      </div>

      <div
        className="flex flex-wrap justify-center gap-8 p-5 bg-[#e0e0e0] pb-10"
        style={{
          fontFamily: "Roboto Slab, serif",
        }}
      >
        {/* Karthikeya S Card */}
        <motion.div
          initial={{ opacity: 0.6, rotateY: 180 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8 }}
          className="w-64 bg-orange-50 rounded-xl  overflow-hidden flex flex-col items-center p-5"
        >
          <img
            src={karthi}
            alt="Karthikeya S"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-lg font-semibold mb-2">Karthikeya S</h2>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/karthikeyas1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-black text-2xl hover:text-blue-700" />
            </a>
            <a
              href="https://www.instagram.com/karthi__2__1__6?igsh=MTNvc3BsZXl2MGJldQ=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-black text-2xl hover:text-pink-700" />
            </a>
          </div>
        </motion.div>

        {/* Ganesha M Card */}
        <motion.div
          initial={{ opacity: 0.6, rotateY: 180 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "Roboto Slab, serif",
          }}
          className="w-64 bg-orange-50 rounded-lg  overflow-hidden flex flex-col items-center p-5"
        >
          <img
            src={ganu}
            alt="Ganesha M"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-lg font-semibold mb-2">Ganesha M</h2>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/ganesha-mohan-aa9615244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-black text-2xl hover:text-blue-700" />
            </a>
            <a
              href="https://www.instagram.com/iamganeshamohan?igsh=MTlmeWQyZ2JmMmdycA=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-black text-2xl hover:text-pink-700" />
            </a>
          </div>
        </motion.div>

        {/* Hemanth Kumar R Card */}
        <motion.div
          initial={{ opacity: 0.6, rotateY: 180 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "Roboto Slab, serif",
          }}
          className="w-64 bg-orange-50 rounded-lg  overflow-hidden flex flex-col items-center p-5"
        >
          <img
            src={hem}
            alt="Hemanth Kumar R"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-lg font-semibold mb-2">Hemanth Kumar R</h2>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/hemanth-kumar-74b939215?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-black text-2xl hover:text-blue-700" />
            </a>
            <a
              href="https://www.instagram.com/hem_4301/profilecard/?igsh=M2VmaTBsa2RodzUy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-black text-2xl hover:text-pink-700" />
            </a>
          </div>
        </motion.div>
      </div>
      {/* Mentor Card */}
      <div className="bg-[#e0e0e0]">
        <motion.h1
          style={{
            fontFamily: "Roboto SLab,serif",
            fontWeight: "500",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-2xl md:text-3xl lg:text-3xl p-4 bg-slate-300 "
        >
          Our Mentor
        </motion.h1>
        <motion.div
          initial={{ opacity: 0.6, rotateY: 180 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center flex-col items-center py-10 bg-[#e0e0e0]"
        >
          <div
            style={{
              fontFamily: "Roboto Slab, serif",
            }}
            className="w-64 bg-orange-50 rounded-lg  overflow-hidden flex flex-col items-center p-5"
          >
            <img
              src={mam}
              alt="Jayashree Mam"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h2 className="text-lg font-semibold mb-1">Dr.Jayasri B S</h2>
            <h2 className="text-sm font-semibold ">Professer</h2>
            <h2 className="text-sm font-semibold mb-2">CSE Department</h2>

            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/dr-jayasri-b-s-360b9a176?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-black text-2xl hover:text-blue-700" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}

export default Aboutus;
