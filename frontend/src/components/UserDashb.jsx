import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserDashb() {
  const navigate = useNavigate();
  const ref = useRef();
  const [tdyStatus, setTdyStatus] = useState(null);
  const [history, setHistory] = useState([]);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/attendance/me", {
          headers: { Authorization: "Bearer " + getToken() },
        });
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

  const handlePresent = async () => {
    console.log("Button clicked");
    try {
      const res = await fetch("http://localhost:3000/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify({ status: "present" }),
      });
      const result = await res.json();
      console.log(69);
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
  return (
    <>
      <div className="flex-col justify-items-center mt-16 m-2 space-y-8">
        <div className=" bg-amber-100 justify-items-center space-y-8 p-4 rounded-lg">
          <h1 className="text-2xl">
            Today's Attendance, {new Date().toLocaleDateString()}
          </h1>
          <button
            className="bg-blue-400 text-white text-xl p-2 rounded-lg cursor-pointer hover:bg-blue-500"
            ref={ref}
            onClick={handlePresent}
          >
            Mark Attendance
          </button>
        </div>
        <div className="flex gap-x-4">
          <div className="justify-items-center bg-amber-100 space-y-6 p-4 rounded-lg">
            <h1 className="text-xl">Your Attendance</h1>
            <p className="text-2xl">69</p>
          </div>
          <div className="justify-items-center bg-amber-100 space-y-6 p-4 rounded-lg">
            <h1 className="text-xl">Total Lectures</h1>
            <p className="text-2xl">70</p>
          </div>
        </div>
        <div className="justify-items-center space-y-4">
          <h1 className="text-2xl">Attendance History</h1>
          <table className="table-auto m-4">
            <tbody>
              {history.map((rec, idx) => (
                <tr key={idx}>
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
    </>
  );
}

export default UserDashb;
