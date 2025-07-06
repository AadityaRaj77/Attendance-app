import React from "react";

function AdminDashb() {
  return (
    <>
      <div className="flex-col justify-items-center mt-16 m-2 space-y-8">
        <div className=" bg-amber-100 justify-items-center space-y-8 p-4 rounded-lg">
          <h1 className="text-2xl">Today's Attendance</h1>
          <p className="text-3xl font-semibold">69/120</p>
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
        <div className=" bg-amber-100 justify-items-center space-y-8 p-4 rounded-lg">
          <h1 className="text-2xl">Today's Attendance</h1>
          <p className="text-3xl font-semibold">69/120</p>
        </div>
        <div className="justify-items-center space-y-4">
          <h1 className="text-2xl">Attendance Record</h1>
          <div className="flex justify-items-center">
            <input type="date"></input>
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
              type="button"
            >
              Dropdown hover{" "}
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdownHover"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <table className="table-auto m-4">
            <tbody>
              <tr>
                <td>Present</td>
                <td>6 July 2025</td>
              </tr>
              <tr>
                <td>Absent</td>
                <td>5 July 2025</td>
              </tr>
              <tr>
                <td>Absent</td>
                <td>4 July 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashb;
