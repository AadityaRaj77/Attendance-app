import React from "react";
import { useRef } from "react";

function UserDashb() {
  const ref = useRef();
  const handlePresent = () => {
    ref.current.innerText = "Marked";
    ref.current.classList.remove("bg-blue-400");
    ref.current.classList.add("bg-green-400");
    ref.current.classList.remove("hover:bg-blue-500");
    ref.current.classList.add("hover:none");
    ref.current.classList.remove("cursor-pointer");
  };
  return (
    <>
      <div className="flex-col justify-items-center mt-16 m-2 space-y-8">
        <div className=" bg-amber-100 justify-items-center space-y-8 p-4 rounded-lg">
          <h1 className="text-2xl">Today's Attendance, 5 July 2025</h1>
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
              <tr>
                <td>The Sliding Mr. Bones</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>1975</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserDashb;
