import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashb() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ present: 0, absent: 0, total: 0 });
  const [records, setRecords] = useState([]);
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const getToken = () => localStorage.getItem("token");
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        console.log("Fetching summary for:", filterDate);
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/attendance/summary?date=${filterDate}`,
          { headers: { Authorization: "Bearer " + getToken() } }
        );
        if (res.status === 401) return navigate("/");

        const data = await res.json();
        console.log("Summary data received:", data);
        setSummary({
          present: data.present ?? 0,
          absent: data.absent ?? 0,
          total: data.total ?? 0,
        });
      } catch (err) {
        console.error("Error fetching summary:", err);
      }
    };
    fetchSummary();
  }, [filterDate, navigate]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/attendance?date=${filterDate}`,
          { headers: { Authorization: "Bearer " + getToken() } }
        );
        if (res.status === 401) return navigate("/");
        const data = await res.json();
        setRecords(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecords();
  }, [filterDate, navigate]);

  const downloadCSVad = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/attendance/export/all`,
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
      a.download = "all_attendance.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="relative h-screen justify-item-center">
      <div className="wave-section pointer-events-none relative -z-100">
        <div className="air air1"></div>
        <div className="air air2"></div>
        <div className="air air3"></div>
        <div className="air air4"></div>
      </div>

      <div className="w-full lg:w-1/2 mt-12 mx-auto space-y-8 text-blue-950 relative z-0 overflow-auto">
        <div className="flex gap-4">
          <div className="flex-1 bg-blue-100 border border-blue-50 p-4 rounded-xl text-center">
            <h2 className="text-xl">Present Today</h2>
            <p className="text-3xl font-semibold">{summary.present}</p>
          </div>
          <div className="flex-1 bg-blue-100 border border-blue-50 p-4 rounded-xl text-center">
            <h2 className="text-xl">Total Users</h2>
            <p className="text-3xl font-semibold">{summary.total}</p>
          </div>
        </div>
        <div className="bg-blue-100 border border-blue-50 p-4 rounded-xl flex items-center justify-between mb-20">
          <div className="flex items-center gap-4">
            <label className="font-medium text-blue-950">Select Date:</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border p-2 rounded text-blue-950 cursor-pointer"
            />
          </div>

          <button
            onClick={downloadCSVad}
            className="bg-blue-500 hover:bg-blue-600 text-blue-50 font-medium px-4 py-2 cursor-pointer rounded-full sm:rounded-xl"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/9131/9131795.png"
              className="w-6 rounded-full sm:hidden invert"
            ></img>
            <p className="hidden sm:block">Download Attendance Record</p>
          </button>
        </div>
        <div className="bg-blue-100 border border-blue-50 p-4 rounded-xl">
          <h2 className="text-2xl mb-4 justify-self-center">
            Attendance Record
          </h2>
          <table className="w-full table-auto border rounded-xl">
            <thead>
              <tr>
                <th className="border p-2">Username</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, i) => (
                <tr key={i}>
                  <td className="border p-2">{rec.user.username}</td>
                  <td className="border p-2 capitalize">{rec.status}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center p-4">
                    No records for this date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
