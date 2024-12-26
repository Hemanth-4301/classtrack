import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/HomeContent.css";

const SearchClassroom = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);
    setLoader(true);

    try {
      const normalizedRoomNumber = roomNumber.trim().toLowerCase();
      setTimeout(async () => {
        try {
          const response = await axios.get(
            `https://classtrack-api.onrender.com/classrooms/search?roomNumber=${normalizedRoomNumber}`
          );

          // Filter results to include only vacant slots
          const vacantResults = response.data.data.filter(
            (slot) => slot.vacant
          );

          if (vacantResults.length === 0) {
            setError("No vacant slots found for this room");
          } else {
            setResults(vacantResults);
          }
        } catch (err) {
          if (err.response && err.response.status === 404) {
            setError("No vacant slots found for this room");
          } else {
            setError("An error occurred while searching");
          }
        } finally {
          setLoader(false);
        }
      }, 1500);
    } catch (err) {
      setLoader(false);
      setError("An error occurred while searching");
    }
  };

  return (
    <div className="search-classroom mb-8 md:mb-15 bg-[#e0e0e0] text-black">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center bg-slate-300 text-xl md:text-2xl lg:text-3xl py-[14px] my-6 md:my-10"
      >
        <b>Search by Room Number</b>
      </motion.h1>
      <div className="flex justify-center">
        <p className="border-2 border-black p-3 text-center rounded-lg m-3 mb-5 md:mb-10 mx-5">
          For labs enter in this format: <b>labName-lab labNumber</b> <br />
          Ex: <b>AIML-lab 4</b>
        </p>
      </div>
      <form
        onSubmit={handleSearch}
        className="mb-8 flex items-center justify-center gap-1 md:gap-4 mx-8"
      >
        <input
          type="text"
          placeholder="Enter Classroom Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="border-2 outline-none border-slate-200  bg-white p-2 rounded-lg w-full md:w-auto focus:border-black"
        />
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

      {!loader && error && <p className="text-red-500 text-center">{error}</p>}

      {!loader && results.length > 0 && (
        <div className="classroom-results max-w-4xl mx-auto mt-8">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold">
              Room: {results[0].roomNumber}
            </h2>
            <p className="text-lg">Location: {results[0].location}</p>
          </div>
          <div className="overflow-x-auto max-h-[350px] mx-5 md:mx-20 lg:mx-40">
            <table className="w-full border-collapse border border-slate-600">
              <thead>
                <tr className="bg-slate-300 text-white">
                  <th className="border text-center border-black px-4 py-2 text-black font-semibold">
                    Day
                  </th>
                  <th className="border text-center border-black px-4 py-2 text-black font-semibold">
                    Timings
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((slot, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-300 hover:text-black transition"
                  >
                    <td className="border border-slate-600 p-2 text-center">
                      {slot.day}
                    </td>
                    <td className="border border-slate-600 p-2 text-center">
                      {slot.duration}
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

export default SearchClassroom;
