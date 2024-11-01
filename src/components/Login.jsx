import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import lb1 from "../images/lb2.jpg";
import ContactModal from "./ContactModal";

function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const closeDisclaimer = () => setShowDisclaimer(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://classroom-tracker-api.vercel.app/admins/find", { email, password })
      .then((result) => {
        if (result.data.status) {
          localStorage.setItem("authToken", result.data.token);
          alert("Logged in successfully");
          navigate("/admin");
        } else {
          alert(result.data.message);
        }
      })
      .catch(() => alert("An error occurred. Please try again."));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("authToken");
          alert("Session has expired. Please log in again.");
          navigate("/login");
        }
      }
    }, 600000 * 24);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <Navbar onContactClick={openModal} />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />

      {showDisclaimer && (
        <motion.div className="flex justify-center items-center bg-yellow-100 w-full">
          <motion.p
            initial={{ opacity: 0.7, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-black text-center p-5"
            style={{ letterSpacing: "1px" }}
          >
            <span className="text-red-500">Disclaimer</span>: Only admins have
            access to login and modify settings.
            <button
              className="text-black font-bold text-lg"
              onClick={closeDisclaimer}
            >
              &nbsp;&#10005;
            </button>
          </motion.p>
        </motion.div>
      )}

      <div
        style={{
          backgroundImage: `url(${lb1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex justify-center items-center min-h-screen flex-wrap bg-slate-50 relative"
      >
        <motion.form
          initial={{ opacity: 0.8, scale: 0.9, borderRadius: 20 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, scale: 1, borderRadius: 10 }}
          className="flex flex-col mx-5 w-full max-w-md md:max-w-lg lg:max-w-md border-2 border-white p-5 rounded-lg gap-4 relative"
          style={{
            fontFamily: "Roboto Slab, serif",
            backdropFilter: "blur(10px)",
          }}
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="email"
            className="text-white text-base md:text-lg lg:text-xl"
          >
            Email
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-black p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm md:text-base lg:text-lg"
          />
          <label
            htmlFor="password"
            className="text-white text-base md:text-lg lg:text-xl"
          >
            Password
          </label>
          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-black p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm md:text-base lg:text-lg"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-slate-800 text-2xl"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 border-2 border-white rounded-md bg-black text-white hover:bg-transparent  text-sm md:text-base lg:text-lg transition-all duration-300 ease-in-out"
          >
            Login
          </button>
        </motion.form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
