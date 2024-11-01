// ContactModal.js
import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // Import icons from react-icons
import "../styles/ContactModal.css";

function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-center  text-xl">Contact Us</h2>
        <h3 className="text-center">
          For any queries you can call or mail to the below phone number and
          email
        </h3>
        <div className="flex gap-3">
          <FaPhoneAlt size={25} />
          <span>+91 7829664332</span>
        </div>

        <div className="flex gap-3">
          <FaEnvelope size={25} />
          <span>2022cs_ganesham_b@nie.ac.in</span>
        </div>

        <button
          className="border-2 border-black bg-black rounded-lg px-2 py-2 text-white hover:bg-transparent hover:text-black"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ContactModal;
