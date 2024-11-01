import React, { useState, useEffect } from "react";

const ClassroomModal = ({
  onClose,
  onAddClassroom,
  onUpdateClassroom,
  classroom,
}) => {
  const [day, setDay] = useState("");
  const [duration, setDuration] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [location, setLocation] = useState("");
  const [vacant, setVacant] = useState(true);

  useEffect(() => {
    if (classroom) {
      setDay(classroom.day);
      setDuration(classroom.duration);
      setRoomNumber(classroom.roomNumber);
      setLocation(classroom.location);
      setVacant(classroom.vacant);
    }
  }, [classroom]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (classroom) {
      onUpdateClassroom({ day, duration, roomNumber, location, vacant });
    } else {
      onAddClassroom({ day, duration, roomNumber, location, vacant });
    }
    resetFields();
  };

  const resetFields = () => {
    setDay("");
    setDuration("");
    setRoomNumber("");
    setLocation("");
    setVacant(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-bold">
          {classroom ? "Edit Classroom" : "Add Classroom"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mt-2">Day:</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
              className="border rounded w-full px-2 py-1"
            >
              <option value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div>
            <label className="block mt-2">Duration:</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="border rounded w-full px-2 py-1"
            >
              <option value="">Select duration</option>
              <option value="9-10">9-10</option>
              <option value="10-11">10-11</option>
              <option value="11:30-12:30">11:30-12:30</option>
              <option value="12:30-1:30">12:30-1:30</option>
              <option value="2:30-3:30">2:30-3:30</option>
              <option value="3:30-4:30">3:30-4:30</option>
              <option value="4:30-5:30">4:30-5:30</option>
            </select>
          </div>
          <div>
            <label className="block mt-2">Room Number:</label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
              className="border border-slate-300 rounded w-full px-2 py-1"
            />
          </div>
          <div>
            <label className="block mt-2">Location:</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="border rounded w-full px-2 py-1"
            >
              <option value="Ground floor">Ground floor</option>
              <option value="1st floor">1st floor</option>
              <option value="2nd floor">2nd floor</option>
              <option value="3rd floor">3rd floor</option>
            </select>
          </div>
          <div className="mt-2">
            <label className="block">Vacant:</label>
            <input
              type="radio"
              value="true"
              checked={vacant === true}
              onChange={() => setVacant(true)}
            />
            <label className="mr-4">Yes</label>
            <input
              type="radio"
              value="false"
              checked={vacant === false}
              onChange={() => setVacant(false)}
            />
            <label>No</label>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={resetFields}
              className="bg-red-600 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {classroom ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassroomModal;
