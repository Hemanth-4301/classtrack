import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/HomeContent.css";

const SearchByTimeAndDay = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const timings = [
    "9-10",
    "10-11",
    "11:30-12:30",
    "12:30-1:30",
    "1:30-2:30",
    "2:30-3:30",
    "3:30-4:30",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (selectedDay === "Saturday" || selectedDay === "Sunday") {
      setError("All classrooms are free on Saturday and Sunday.");
      return;
    }
    setError("");
    setClassrooms([]);
    setLoader(true);

    try {
      setTimeout(async () => {
        try {
          const response = await axios.get(
            `https://classtrack-api.onrender.com/classrooms/searchByTimeAndDay`,
            {
              params: { duration: selectedTime, day: selectedDay },
            }
          );
          if (response.data.length === 0) {
            setError("No classrooms available for the selected time and day.");
          } else {
            setClassrooms(response.data);
          }
        } catch (err) {
          setError("An error occurred while fetching data.");
        } finally {
          setLoader(false);
        }
      }, 1500);
    } catch (err) {
      setLoader(false);
      setError("An error occurred while searching.");
    }
  };

  return (
    <div className="search-classroom mb-8 md:mb-15 bg-[#e0e0e0] text-black">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center bg-slate-300 text-xl md:text-2xl lg:text-3xl py-[14px] my-12 md:my-14"
      >
        <b>Search by Time Slot and Day</b>
      </motion.h1>
      <form
        onSubmit={handleSearch}
        className="mb-8 flex flex-wrap items-center justify-center gap-3 md:gap-4 mx-8"
      >
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="border-2 border-slate-600 bg-slate-100 p-2 rounded-lg w-full md:w-auto text-center focus:border-black"
        >
          <option value="">-- Select Day --</option>
          {days.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>

        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="border-2 border-slate-600 bg-slate-100 p-2 rounded-lg w-full md:w-auto text-center focus:border-black"
        >
          <option value="">-- Select Time Slot --</option>
          {timings.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-black text-white p-2 rounded-lg hover:bg-transparent hover:text-black border-2 border-black transition"
        >
          Search
        </button>
      </form>

      {loader && (
        <div className="flex justify-center items-center m-5">
          <div className="loader"></div>
        </div>
      )}

      {!loader && error && (
        <p
          className={
            selectedDay === "Sunday" || "Saturday"
              ? "text-green-600 text-center"
              : "text-red-500 text-center"
          }
        >
          {error}
        </p>
      )}

      {!loader && classrooms.length > 0 && (
        <div className="classroom-results max-w-4xl mx-auto mt-8">
          <div className="overflow-x-auto max-h-[350px] mx-5 md:mx-20 lg:mx-40">
            <table className="w-full border-collapse border border-slate-600">
              <thead>
                <tr className="bg-slate-300 text-white">
                  <th className="border text-center border-black px-4 py-2 text-black font-semibold">
                    Room Number
                  </th>
                  <th className="border text-center border-black px-4 py-2 text-black font-semibold">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {classrooms.map((room, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-300 hover:text-black transition"
                  >
                    <td className="border border-slate-600 p-2 text-center">
                      {room.roomNumber}
                    </td>
                    <td className="border border-slate-600 p-2 text-center">
                      {room.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchByTimeAndDay;
