import React, { useEffect } from "react";
import { useRef, useState } from "react";

function Login() {
  const ref = useRef(null);
  useEffect(() => {
    const isHidden = localStorage.getItem("hidden");
    if (isHidden === "true" && ref.current) {
      ref.current.style.display = "hidden";
    }
  }, []);
  const loginAdmin = () => {
    if (ref.current) {
      ref.current.style.display = "none";
      localStorage.setItem("hidden", "true");
    }
  };
  return (
    <>
      <h1 className="text-4xl text-center mb-50">Attendance Portal</h1>
      <div className="flex justify-self-center gap-4">
        <button className="bg-blue-400 cursor-pointer p-2 text-white rounded-2xl">
          User
        </button>
        <button
          className="bg-blue-400 cursor-pointer p-2 text-white rounded-2xl"
          onClick={loginAdmin}
        >
          Admin
        </button>
      </div>
      <div className="justify-self-center w-1/2 justify-items-center bg-blue-100 p-6 space-y-4">
        <div className="space-y-2">
          <p>Username</p>
          <input
            type="text"
            placeholder="Enter username"
            className="w-75 border border-blue-600 p-2"
          ></input>
        </div>
        <div className="space-y-2" ref={ref}>
          <p>Password</p>
          <input
            type="text"
            placeholder="Enter password"
            className="p-2 w-75 border border-blue-600"
          ></input>
        </div>
        <button className="bg-blue-400 cursor-pointer p-2 text-white rounded-2xl">
          Login
        </button>
      </div>
    </>
  );
}

export default Login;
