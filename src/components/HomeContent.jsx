import React, { useState, useEffect } from "react";
import "../styles/HomeContent.css";
import { motion } from "framer-motion";
import tech from "../images/tech.png";
import SearchClassroom from "./SearchClassroom";

function HomeContent() {
  const today = new Date();
  const dayNumber = today.getDay();
  const [loader, setLoader] = useState(false);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayName = daysOfWeek[dayNumber];

  const [selectedDay, setSelectedDay] = useState(dayName);
  const [vacantClassrooms, setVacantClassrooms] = useState([]);

  const handleChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const fetchVacantClassrooms = async (day) => {
    try {
      const response = await fetch(
        `https://classtrack-api.onrender.com/classrooms/vacant/${day}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      const timingOrder = [
        "9-10",
        "10-11",
        "11:30-12:30",
        "12:30-1:30",
        "1:30-2:30",
        "2:30-3:30",
        "3:30-4:30",
      ];

      const sortedData = data.sort((a, b) => {
        return (
          timingOrder.indexOf(a.duration) - timingOrder.indexOf(b.duration)
        );
      });

      setVacantClassrooms(sortedData);
    } catch (error) {
      console.log("Error fetching vacant classrooms:" + error);
    }
  };

  // useEffect(() => {
  //   fetchVacantClassrooms(selectedDay);
  // }, [selectedDay]);

  useEffect(() => {
    fetchVacantClassrooms(dayName);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchVacantClassrooms(selectedDay);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  };

  return (
    <section
      id="intro"
      style={{
        fontFamily: "Roboto Slab, serif",
        backgroundColor: "#e0e0e0",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center p-4 bg-slate-300 text-xl md:text-2xl lg:text-3xl py-[14px] mt-10"
      >
        <b>Search by Day</b>
      </motion.h1>
      <div
        className="flex justify-center flex-col gap-5 items-center bg-[#e0e0e0] py-10"
        style={{
          fontFamily: "Roboto Slab, serif",
        }}
      >
        <div className="flex flex-warp justify-center items-center">
          <motion.form
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center flex-wrap  items-center gap-3 md:gap-10 text-md md:text-xl  px-3"
            onSubmit={handleSubmit}
          >
            <label>Select a Day</label>
            <select
              onChange={handleChange}
              value={selectedDay}
              className="border-2 bg-slate-100 h-10 rounded-lg outline-none border-slate-200  focus:border-black"
            >
              {daysOfWeek.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="border-2 border-black bg-black hover:text-black text-white px-4 py-2 rounded-lg hover:bg-transparent transition"
            >
              Submit
            </button>
          </motion.form>
        </div>

        <div className="mt-4 w-full overflow-x-auto">
          {loader && (
            <div className="flex justify-center items-center m-5">
              <div className="loader"></div>
            </div>
          )}

          <div className="flex flex-wrap mx-5 md:mx-20 lg:mx-40 justify-center max-h-[400px] overflow-y-scroll">
            {!loader && (
              <motion.table
                initial={{ opacity: 0, rotateY: 30 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.7 }}
                className="min-w-full border-collapse border border-black"
              >
                <thead>
                  <tr>
                    <th colSpan={3}>
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="font-bold text-center p-5 text-xl md:text-3xl lg:text-4xl"
                      >
                        Vacant Classrooms
                      </motion.h2>
                    </th>
                  </tr>
                  <tr className="bg-slate-300">
                    <th className="border text-center border-black px-4 py-2  font-semibold">
                      Timings
                    </th>
                    <th className="border text-center border-black px-4 py-2  font-semibold">
                      Room Number
                    </th>
                    <th className="border text-center border-black px-4 py-2  font-semibold">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto max-h-[400px]">
                  {vacantClassrooms.length > 0 ? (
                    vacantClassrooms.map((classroom, index) => (
                      <tr
                        key={classroom.roomNumber}
                        className={`hover:bg-gray-100 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-200"
                        }`}
                      >
                        <td className="border border-black px-4 py-2 text-center">
                          {classroom.duration}
                        </td>
                        <td className="border border-black px-4 py-2 text-center">
                          {classroom.roomNumber}
                        </td>
                        <td className="border border-black px-4 py-2 text-center">
                          {classroom.location}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      {selectedDay == "Saturday" || selectedDay == "Sunday" ? (
                        <td
                          colSpan="3"
                          className="border border-black px-4 py-2 text-center text-green-600"
                        >
                          All classrooms are free
                        </td>
                      ) : (
                        <td
                          colSpan="3"
                          className="border border-black px-4 py-2 text-center text-red-500"
                        >
                          No vacant classrooms available.
                        </td>
                      )}
                    </tr>
                  )}
                </tbody>
              </motion.table>
            )}
          </div>
        </div>
      </div>

      <div>
        <SearchClassroom />
      </div>

      <div className="bg-[#e0e0e0] pb-4 pt-5 lg:pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center p-4 bg-slate-300 text-xl md:text-2xl lg:text-3xl"
        >
          <b> Missions of this Project</b>
        </motion.h1>
        <div className="mission-container bg-[#e0e0e0] mx-2 md:mx-6 lg:mx-20 my-6 ">
          <motion.div
            initial={{ opacity: 0.8, rotateY: 180, scale: 0.8 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ translateY: -5 }}
            className="mission"
          >
            <h1>
              <b>Improve Classroom Management</b>
            </h1>
            <h2>
              Help teachers and administrators find and book available
              classrooms quickly.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.8, rotateY: 180, scale: 0.8 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ translateY: -5 }}
            className="mission"
          >
            <h1>
              <b>Make Information Accessible</b>
            </h1>

            <h2>
              Ensure that students and staff can access classroom information
              anytime and from any device.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.8, rotateY: 180, scale: 0.8 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ translateY: -5 }}
            className="mission"
          >
            <h1>
              <b>Optimize Resource Use</b>
            </h1>
            <h2>
              Reduce waste by tracking classroom usage and ensuring efficient
              use of space.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.8, rotateY: 180, scale: 0.8 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ translateY: -5 }}
            className="mission"
          >
            <h1>
              <b>Foster Collaboration</b>
            </h1>
            <h2>
              Facilitate sharing of classrooms and resources among different
              departments.
            </h2>
          </motion.div>
        </div>

        <div className="bg-[#e0e0e0] mt-10 lg:mt-20 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center p-4 bg-slate-300 text-xl md:text-2xl lg:text-3xl "
          >
            <b>Tech stack</b>
          </motion.h1>

          <div className="flex flex-wrap  justify-evenly items-center py-10 lg:my-10 ">
            <div className="tech flex flex-col mx-2">
              <motion.h1
                whileHover={{ scale: 0.8 }}
                initial={{
                  opacity: 0.7,
                  x: -90,
                }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white"
              >
                Tailwind css
              </motion.h1>
              <motion.h1
                whileHover={{ scale: 0.8 }}
                initial={{
                  opacity: 0.7,
                  x: 90,
                }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white"
              >
                Reactjs
              </motion.h1>
              <motion.h1
                whileHover={{ scale: 0.8 }}
                initial={{
                  opacity: 0.7,
                  x: -90,
                }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white"
              >
                Expressjs
              </motion.h1>
              <motion.h1
                whileHover={{ scale: 0.8 }}
                initial={{
                  opacity: 0.7,
                  x: 90,
                }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white"
              >
                Nodejs
              </motion.h1>
              <motion.h1
                whileHover={{ scale: 0.8 }}
                initial={{
                  opacity: 0.7,
                  x: -90,
                }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white"
              >
                MongoDb
              </motion.h1>
            </div>

            <div className="max-w-xl  md:text-left p-4 lg:p-5">
              <motion.p
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="p-5 text-left text-lg"
                style={{
                  lineHeight: "1.6rem",
                }}
              >
                This project uses a powerful mix of tools to build a responsive
                and secure web app. The frontend is made with <b>React.js</b>{" "}
                for flexible components and styled with <b>Tailwind CSS</b> for
                a clean, responsive design. On the backend,<b> Node.js</b> and
                Express.js work together to handle data efficiently, while
                <b> MongoDB</b> stores our data securely and scales well. For
                security, JWT is used for safe, token-based login sessions,
                keeping user data protected.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeContent;
