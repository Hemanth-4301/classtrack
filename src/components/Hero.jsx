import React from "react";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link"; // Import HashLink
import "../styles/Hero.css";
import clg1 from "../images/clg1.png";
import search from "../images/search.png";

function Hero() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#e0e0e0",
        }}
        className="flex justify-evenly bg-green-50 flex-wrap sm:gap-30 md:gap-10 gap-10 py-10 px-5"
      >
        <div className="relative">
          <motion.img
            src={clg1}
            height={600}
            width={600}
            className="flex flex-wrap clg"
            style={{
              borderRadius: "15px",
            }}
            initial={{ opacity: 0, scale: 0.8, borderRadius: 100 }}
            whileInView={{ opacity: 1, scale: 1, borderRadius: 10 }}
            whileTap={{ rotateX: 90, scale: 0.9 }}
            transition={{ duration: 1 }}
          />
          <motion.img
            src={search}
            height={100}
            width={100}
            className="absolute z-100 left-60 top-40 bug"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          />
        </div>

        <div className="flex flex-col justify-center items-start">
          <motion.h1
            className="text-[2.1rem] md:text-5xl"
            style={{
              fontFamily: "Roboto Slab, serif",
              letterSpacing: "3px",
              lineHeight: "3.5rem",
              textAlign: "left",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Lecture Hall
            <br />
            <span
              style={{
                fontFamily: "Londrina Sketch, sans-serif",
                color: "black",
              }}
            >
              Availability Tracker
            </span>
          </motion.h1>
          <motion.p
            className="mt-2 md:mt-5 mx-1 text-base sm:text-lg leading-relaxed"
            style={{
              maxWidth: "500px",
              textAlign: "justify",
              fontFamily: "Roboto Slab, serif",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span
              style={{
                fontWeight: "600",
                letterSpacing: "2px",
                fontStyle: "italic",
              }}
            >
              Instantly
            </span>{" "}
            check which classrooms are available right now, making it easier to
            find a free space for your next lecture or study session.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <HashLink smooth to="#intro" className="Download-button mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                width="32"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.371 29.529c0 0 0.335-2.012-1.731-4.469 2.011-5.641 2.29-10.778 2.29-10.778s4.133 0.95 4.133 5.026c-0.001 6.981-4.692 10.221-4.692 10.221zM11.979 27.078c0 0-2.768-8.883-2.768-12.568 0-1.658 0.187-3.133 0.478-4.472h12.61c0.293 1.34 0.481 2.816 0.481 4.473 0 3.629-2.76 12.567-2.76 12.567h-8.041zM15.99 12.069c-1.418 0-2.568 1.15-2.568 2.569 0 1.418 1.15 2.569 2.568 2.569s2.569-1.15 2.569-2.569c0.001-1.419-1.15-2.569-2.569-2.569zM15.438 0.596v-3.498h1v3.409c1.143 0.832 4.236 3.478 5.635 8.575h-12.16c1.352-4.957 4.296-7.574 5.525-8.486zM8.629 29.529c0 0-4.691-3.24-4.691-10.221 0-4.076 4.133-5.026 4.133-5.026s0.279 5.137 2.289 10.778c-2.067 2.458-1.731 4.469-1.731 4.469zM17.691 30.045l-0.838-0.838-0.893 2.793-1.062-2.793-0.726 1.451-1.062-2.625h5.752l-1.171 2.012z"
                  fill="white"
                ></path>
              </svg>
              <span>Get Started</span>
            </HashLink>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Hero;
