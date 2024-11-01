import React, { useState } from "react";
import "../styles/AdminModal.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const AdminModal = ({ isOpen, onClose, onAddAdmin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAdmin({ name, email, password });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay flex items-center justify-center">
      <div className="modal-content rounded-lg shadow-lg bg-white p-6 md:w-1/3 w-11/12 transform transition-all duration-300 ease-in-out border-1 border-slate-200">
        <h2 className="text-center text-2xl font-semibold text-black mb-4">
          Admin Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-black">Name:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </label>
          <label className="block">
            <span className="text-black">Email:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </label>
          <label className="block relative">
            <span className="text-black">Password:</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2  border border-gray-300 rounded-md focus:ring focus:ring-green-300 focus:border-green-500"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-4 top-9 cursor-pointer text-gray-900 "
            >
              {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
            </span>
          </label>
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-transparent hover:text-black border-2 border-green-600 transition duration-200"
            >
              Add Admin
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-transparent hover:text-black border-2 border-red-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
