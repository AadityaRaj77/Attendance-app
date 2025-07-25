import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function UserDashb() {
  const navigate = useNavigate();
  const ref = useRef();
  const [tdyStatus, setTdyStatus] = useState(null);
  //-------------------------------------
  const [history, setHistory] = useState([]);

  const daysPresent = history.filter((r) => r.status === "present").length;
  const totalDays = history.length;
  const getToken = () => localStorage.getItem("token");
  //-----------------------------------
  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/attendance/me`,
          {
            headers: { Authorization: "Bearer " + getToken() },
          }
        );
        if (res.status === 401) return navigate("/");

        const data = await res.json();
        setHistory(data);
        const today = new Date().toISOString().slice(0, 10);
        const todayRec = data.find((r) => r.date.slice(0, 10) === today);
        setTdyStatus(todayRec ? todayRec.status : null);
      } catch (err) {
        console.error(err);
      }
    };
    loadAttendance();
  }, [navigate]);
  useEffect(() => {
    if (tdyStatus === "present") {
      ref.current.innerText = "Marked";
      ref.current.classList.remove("bg-blue-400");
      ref.current.classList.add("bg-green-400");
      ref.current.classList.remove("hover:bg-blue-500");
      ref.current.classList.add("hover:none");
      ref.current.classList.remove("cursor-pointer");
    }
  }, []);
  //----------------------------------------------
  const handlePresent = async () => {
    console.log("Button clicked");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
          body: JSON.stringify({ status: "present" }),
        }
      );
      const result = await res.json();
      if (!res.ok) return alert(result.msg);
      setTdyStatus("present");
      ref.current.innerText = "Marked";
      ref.current.classList.remove("bg-blue-400");
      ref.current.classList.add("bg-green-400");
      ref.current.classList.remove("hover:bg-blue-500");
      ref.current.classList.add("hover:none");
      ref.current.classList.remove("cursor-pointer");
      setHistory((prev) => [...prev, result.record]);
    } catch (err) {
      console.log(err);
      alert("Network error");
    }
  };
  //---------------------------------------------------------
  const downloadCSV = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/attendance/export/me`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!res.ok) throw new Error("Download failed: " + (await res.text()));
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my_attendance.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message);
    }
  };
  //-----------------------------------------------
  return (
    <>
      <div className="relative h-screen justify-items-center">
        <div
          className="relative z-0 flex-col justify-items-center mt-12 m-4 w-full md:w-1/2 space-y-4 overflow-auto"
          /*style={{ height: "100vh", paddingBottom: "100px" }}*/
        >
          <div className=" bg-blue-100 border border-blue-50 justify-items-center space-y-10 p-6 rounded-xl w-full">
            <h1 className="text-2xl text-blue-950">
              Today's Attendance, {new Date().toLocaleDateString()}
            </h1>
            <div>
              <button
                className="bg-blue-500 text-blue-100 text-xl p-2 rounded-lg cursor-pointer hover:bg-blue-600 justify-self-center"
                ref={ref}
                onClick={handlePresent}
              >
                Mark Attendance
              </button>
            </div>
          </div>
          <div className="flex gap-x-4 w-full">
            <div className="justify-items-center w-1/2 bg-blue-100 border border-blue-50 space-y-6 p-4 rounded-lg">
              <h1 className="text-xl text-blue-950">Your Attendance</h1>
              <p className="text-2xl text-blue-950 font-medium">
                {daysPresent}
              </p>
            </div>
            <div className="justify-items-center w-1/2 bg-blue-100 border border-blue-50 space-y-6 p-4 rounded-lg">
              <h1 className="text-xl text-blue-950">Total Lectures</h1>
              <p className="text-2xl text-blue-950 font-medium">{totalDays}</p>
            </div>
          </div>
          <div className="justify-items-center space-y-4 text-blue-100 w-full">
            <div>
              <button
                onClick={downloadCSV}
                className="mt-4 bg-blue-950 text-blue-100 px-4 py-2 rounded cursor-pointer hover:bg-blue-800"
              >
                Download My Attendace Record
              </button>
            </div>

            <div className="bg-blue-100 border border-blue-50 p-4 rounded-xl w-full mb-12">
              <h2 className="text-2xl mb-4 justify-self-center text-blue-950">
                Attendance Record
              </h2>
              <table className="w-full table-auto border rounded-xl">
                <thead>
                  <tr>
                    <th className="border p-2 text-blue-950">Date</th>
                    <th className="border p-2 text-blue-950">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((rec, idx) => (
                    <tr key={idx} className="text-blue-950">
                      <td className="border p-2">
                        {new Date(rec.date).toLocaleDateString()}
                      </td>
                      <td className="border p-2">{rec.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="wave-section pointer-events-none relative -z-100">
          <div className="air air1"></div>
          <div className="air air2"></div>
          <div className="air air3"></div>
          <div className="air air4"></div>
        </div>
      </div>
    </>
  );
}

export default UserDashb;
