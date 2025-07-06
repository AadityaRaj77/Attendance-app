import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashb() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ present: 0, total: 0 });
  const [records, setRecords] = useState([]); // list of { user, status }
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const getToken = () => localStorage.getItem("token");
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/attendance/summary",
          {
            headers: { Authorization: "Bearer " + getToken() },
          }
        );
        if (res.status === 401) return navigate("/");
        const data = await res.json();
        setSummary(data); // { present: X, total: Y }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSummary();
  }, [navigate]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/attendance?date=${filterDate}`,
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

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div className="flex gap-4">
        <div className="flex-1 bg-amber-100 p-4 rounded-lg text-center">
          <h2 className="text-xl">Present Today</h2>
          <p className="text-3xl font-semibold">{summary.present}</p>
        </div>
        <div className="flex-1 bg-amber-100 p-4 rounded-lg text-center">
          <h2 className="text-xl">Total Users</h2>
          <p className="text-3xl font-semibold">{summary.total}</p>
        </div>
      </div>
      <div className="bg-amber-100 p-4 rounded-lg flex items-center gap-4">
        <label className="font-medium">Select Date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)} // triggers records fetch
          className="border p-2 rounded"
        />
      </div>
      <div className="bg-amber-100 p-4 rounded-lg">
        <h2 className="text-2xl mb-4">Attendance Record</h2>
        <table className="w-full table-auto border">
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
  );
}
