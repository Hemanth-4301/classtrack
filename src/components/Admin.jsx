import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminModal from "./AdminModal";
import ClassroomModal from "./ClassroomModal";
import ContactModal from "./ContactModal";
import "../styles/HomeContent.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import admin from "../images/admin.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Admin() {
  const [loader, setLoader] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [admins, setAdmins] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isClassroomModalOpen, setIsClassroomModalOpen] = useState(false);
  const [currentClassroom, setCurrentClassroom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins();
    fetchClassrooms();
  }, [navigate]);

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
    }, 60000 * 60 * 24);

    return () => clearInterval(interval);
  }, [navigate]);

  const fetchAdmins = async () => {
    try {
      setLoader(true);
      const result = await axios.get(
        "https://classtrack-api.onrender.com/admins/get"
      );
      setAdmins(result.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const fetchClassrooms = async () => {
    try {
      setLoader(true);
      const result = await axios.get(
        "https://classtrack-api.onrender.com/classrooms/get"
      );
      setClassrooms(result.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddAdmin = async (adminData) => {
    try {
      const result = await axios.post(
        "https://classtrack-api.onrender.com/admins/add",
        adminData
      );
      alert(result.data.message);
      setAdmins((prevAdmins) => [...prevAdmins, result.data]);
      setIsAdminModalOpen(false);
      fetchAdmins();
    } catch (err) {
      console.log(err);
      alert("Failed to add admin");
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      const result = await axios.delete(
        `https://classtrack-api.onrender.com/admins/delete/${adminId}`
      );
      alert(result.data.message);
      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin._id !== adminId)
      );
    } catch (err) {
      console.log(err);
      alert("Failed to delete admin");
    }
  };

  const handleAddClassroom = async (classroomData) => {
    try {
      const result = await axios.post(
        "https://classtrack-api.onrender.com/classrooms/add",
        classroomData
      );
      setClassrooms((prevClassrooms) => [...prevClassrooms, result.data]);
      setIsClassroomModalOpen(false);
      fetchClassrooms();
    } catch (err) {
      console.log(err);
      alert("Failed to add classroom");
    }
  };

  const handleUpdateClassroom = async (classroomData) => {
    try {
      const result = await axios.put(
        `https://classtrack-api.onrender.com/classrooms/update/${currentClassroom._id}`,
        classroomData
      );
      setClassrooms((prevClassrooms) =>
        prevClassrooms.map((classroom) =>
          classroom._id === currentClassroom._id ? result.data : classroom
        )
      );
      setIsClassroomModalOpen(false);
      setCurrentClassroom(null);
      fetchClassrooms();
    } catch (err) {
      console.log(err);
      alert("Failed to update classroom");
    }
  };

  const handleEditClassroom = (classroom) => {
    setCurrentClassroom(classroom);
    setIsClassroomModalOpen(true);
  };

  const handleDeleteClassroom = async (classroomId) => {
    try {
      const result = await axios.delete(
        `https://classtrack-api.onrender.com/classrooms/delete/${classroomId}`
      );
      alert(result.data.message);
      setClassrooms((prevClassrooms) =>
        prevClassrooms.filter((classroom) => classroom._id !== classroomId)
      );
      fetchClassrooms();
    } catch (err) {
      console.log(err);
      alert("Failed to delete classroom");
    }
  };

  const sortedClassrooms = classrooms.sort((a, b) => {
    const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
  });

  const handleinsertAll = async () => {
    let isConfirmed = window.confirm(
      "You are going to set all the classrooms as vacant and old data will be over written as true"
    );
    if (isConfirmed) {
      try {
        setLoader(true);
        const result = await axios.post(
          "https://classtrack-api.onrender.com/classrooms/insertAll",
          {}
        );
        alert(result.data.message);
        window.location.reload();
        setLoader(false);
      } catch (error) {
        alert("Error while inserting all classRooms");
      }
    }
  };

  const handledeleteAll = async () => {
    let isConfirmed = window.confirm(
      "Are you sure you want to delete all classrooms?"
    );
    if (isConfirmed) {
      try {
        setLoader(true);
        const result = await axios.post(
          "https://classtrack-api.onrender.com/classrooms/deleteAll",
          {}
        );
        alert(result.data.message);
        window.location.reload();
        setLoader(false);
      } catch (error) {
        alert("Error while deleting all classrooms");
      }
    }
  };

  return (
    <>
      <Navbar onContactClick={openModal} />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />

      <motion.h1
        initial={{ y: 7 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl md:text-4xl text-center p-5 bg-yellow-50"
        style={{
          fontFamily: "Roboto Slab, serif",
          color: "#333",
          letterSpacing: "1px",
        }}
      >
        Welcome to Admin Workspace
      </motion.h1>

      <div className=" p-5 text-lg md:text-2xl  flex flex-wrap justify-around items-center bg-gray-100">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
          className="rounded-lg mb-5 md:mb-0"
          src={admin}
          height={400}
          width={400}
          alt="Admin workspace tag"
        />
        {loader && (
          <div className="flex justify-center items-center m-5">
            <div className="loader"></div>
          </div>
        )}
        <div className="w-full md:w-1/2 mt-5 md:mt-0">
          <div className="overflow-x-auto">
            <table
              border={2}
              style={{
                borderCollapse: "collapse",
                textAlign: "center ",
                fontFamily: "Roboto Slab, serif",
                width: "100%",
              }}
              className="shadow-lg w-full max-w-full"
            >
              <thead>
                <tr>
                  <th
                    colSpan={3}
                    className="p-3 bg-gray-200 text-lg font-semibold border border-gray-400"
                  >
                    List of Admins &nbsp;&nbsp;
                    <button
                      onClick={() => setIsAdminModalOpen(true)}
                      className="bg-green-600 text-white px-4 py-2 text-sm border-2 border-green-600 hover:bg-transparent hover:text-black rounded-lg"
                    >
                      Add Admin
                    </button>
                  </th>
                </tr>
                <tr>
                  <th className="p-3 bg-gray-300 border border-gray-400">
                    Name
                  </th>
                  <th className="p-3 bg-gray-300 border border-gray-400">
                    Email
                  </th>
                  <th className="p-3 bg-gray-300 border border-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id}>
                    <td className="p-3 border border-gray-400">{admin.name}</td>
                    <td className="p-3 border border-gray-400">
                      {admin.email}
                    </td>
                    <td className="p-3 border border-gray-400">
                      <button
                        onClick={() => handleDeleteAdmin(admin._id)}
                        className="bg-red-600 text-white px-4 py-2 text-sm border-2 border-red-600 hover:bg-transparent hover:text-black rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-5 bg-[#e0e0e0] gap-5">
        <button
          onClick={handleinsertAll}
          type="button"
          className="px-2 py-3 bg-green-600  rounded-xl  border-2 text-white border-green-600 hover:bg-transparent hover:text-black"
        >
          Add all classrooms
        </button>
        <button
          onClick={handledeleteAll}
          type="button"
          className="px-2 py-3 bg-red-600  rounded-xl border-2 text-white border-red-600 hover:bg-transparent hover:text-black"
        >
          Delete all classrooms
        </button>
      </div>

      {/* Classroom details section */}
      <div className="p-5 text-lg md:text-2xl  flex flex-wrap justify-around items-center bg-gray-100 py-10 md:py-10 md:pb-20">
        <div className="w-full mt-5 md:mt-0">
          <div className="overflow-x-auto">
            {loader && (
              <div className="flex justify-center items-center m-5">
                <div className="loader"></div>
              </div>
            )}
            <table
              border={2}
              style={{
                borderCollapse: "collapse",
                textAlign: "center",
                fontFamily: "Roboto Slab, serif",
                width: "100%",
              }}
              className="shadow-lg w-full max-w-full"
            >
              <thead>
                <tr>
                  <th
                    colSpan={5}
                    className="p-3 bg-gray-200 text-lg font-semibold border border-gray-400"
                  >
                    List of Classrooms &nbsp;&nbsp;
                    <button
                      onClick={() => setIsClassroomModalOpen(true)}
                      className="bg-green-600 text-white px-4 py-2 text-sm border-2 border-green-600 hover:bg-transparent hover:text-black rounded-lg"
                    >
                      Add Classroom
                    </button>
                  </th>
                </tr>
                <tr>
                  <th className="p-3 bg-gray-300 border border-gray-400">
                    Day
                  </th>
                  <th className="p-3 bg-gray-300 border border-gray-400">
                    Duration
                  </th>
                  <th className="p-3 bg-gray-300 border border-gray-400">
                    Room Number
                  </th>
                  <th className="p-3 bg-gray-300 border border-gray-400">
                    Vacant
                  </th>
                  <th className="p-3 bg-gray-300 border border-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedClassrooms.map((classroom) => (
                  <tr key={classroom._id}>
                    <td className="p-3 border border-gray-400">
                      {classroom.day}
                    </td>
                    <td className="p-3 border border-gray-400">
                      {classroom.duration}
                    </td>
                    <td className="p-3 border border-gray-400">
                      {classroom.roomNumber}
                    </td>
                    <td className="p-3 border border-gray-400">
                      {classroom.vacant ? "Yes" : "No"}
                    </td>
                    <td className="p-3 border border-gray-400 ">
                      <div className="flex flex-wrap gap-2 justify-center items-center">
                        <button
                          onClick={() => handleEditClassroom(classroom)}
                          className="bg-blue-600 text-white px-4 py-2 text-sm border-2 border-blue-600 hover:bg-transparent hover:text-black rounded-lg mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClassroom(classroom._id)}
                          className="bg-red-600 text-white px-4 py-2 text-sm border-2 border-red-600 hover:bg-transparent hover:text-black rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isAdminModalOpen && (
        <AdminModal
          onClose={() => setIsAdminModalOpen(false)}
          onAddAdmin={handleAddAdmin}
        />
      )}
      {isClassroomModalOpen && (
        <ClassroomModal
          classroom={currentClassroom}
          onClose={() => setIsClassroomModalOpen(false)}
          onAddClassroom={handleAddClassroom}
          onUpdateClassroom={handleUpdateClassroom}
        />
      )}

      <Footer />
    </>
  );
}

export default Admin;
