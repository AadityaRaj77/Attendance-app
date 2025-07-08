import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const ref = useRef();
  const admin = useRef();
  const user = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isHidden = localStorage.getItem("hidden");
    if (isHidden === "true" && ref.current) {
      ref.current.style.display = "none";
      admin.current.classList.remove("bg-blue-400");
      admin.current.classList.add("bg-blue-600");
      admin.current.classList.add("font-medium");
    } else if (ref.current) {
      ref.current.style.display = "block";
      user.current.classList.remove("bg-blue-400");
      user.current.classList.add("bg-blue-600");
      user.current.classList.add("font-medium");
      admin.current.classList.remove("bg-blue-600");
      admin.current.classList.remove("font-medium");
    }
  }, []);
  const loginAdmin = () => {
    if (ref.current) {
      ref.current.style.display = "none";
      user.current.classList.remove("bg-blue-600");
      user.current.classList.remove("font-medium");
      admin.current.classList.remove("bg-blue-400");
      admin.current.classList.add("bg-blue-600");
      admin.current.classList.add("font-medium");
      localStorage.setItem("hidden", "true");
    }
  };
  const loginuser = () => {
    if (ref.current) {
      ref.current.style.display = "block";
      admin.current.classList.remove("bg-blue-600");
      admin.current.classList.remove("font-medium");
      user.current.classList.remove("bg-blue-400");
      user.current.classList.add("bg-blue-600");
      user.current.classList.add("font-medium");
      localStorage.setItem("hidden", "false");
    }
  };

  const handleLogin = async (e) => {
    const isAdmin = localStorage.getItem("hidden") === "true";
    e.preventDefault();
    setError("");
    try {
      const body = isAdmin
        ? JSON.stringify({ username, password: "admin123" })
        : JSON.stringify({ username, password });
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Login failed");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <section className="wave-section relative flex flex-col gap-24 md:gap-18 items-center p-4">
        <div className="air air1"></div>
        <div className="air air2"></div>
        <div className="air air3"></div>
        <div className="air air4"></div>

        <h1 className="text-3xl md:text-4xl text-center text-blue-100 mt-12 md:mt-10 font-medium wrap-normal text-shadow-2xs text-shadow-blue-100 w-3/4 md:w-1/2">
          Welcome to the Attendance Portal!
        </h1>
        <div className="justify-items-center rounded-b-xl w-3/4 md:w-1/2 shadow-lg shadow-blue-600">
          <div className="flex w-full">
            <button
              className="bg-blue-400 cursor-pointer p-2 text-white rounded-tl-xl w-1/2 border border-blue-200"
              onClick={loginuser}
              ref={user}
            >
              User
            </button>
            <button
              className="bg-blue-400 cursor-pointer p-2 text-white rounded-tr-xl w-1/2 border border-blue-200"
              ref={admin}
              onClick={loginAdmin}
            >
              Admin
            </button>
          </div>
          <div className="justify-self-center justify-items-center bg-blue-100 border border-blue-200 p-8 px-12 space-y-4 rounded-b-xl w-full">
            <div className="space-y-2 w-full">
              <p>Username</p>
              <input
                type="text"
                placeholder="Enter username"
                className="border-2 border-blue-400 p-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-blue-500 w-full"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="space-y-2 w-full" ref={ref}>
              <p>Password</p>
              <input
                type="text"
                placeholder="Enter password"
                className="p-2 border-2 border-blue-400 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-blue-500 w-full"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="w-full">
              <button
                className="bg-blue-400 cursor-pointer p-2 text-white rounded-xl mt-4 w-full hover:bg-blue-600 font-medium"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
