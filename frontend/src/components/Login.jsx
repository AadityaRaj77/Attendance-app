import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const ref = useRef(null);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isHidden = localStorage.getItem("hidden");
    if (isHidden === "true" && ref.current) {
      ref.current.style.display = "none";
    } else if (ref.current) {
      ref.current.style.display = "block";
    }
  }, []);
  const loginAdmin = () => {
    if (ref.current) {
      ref.current.style.display = "none";
      localStorage.setItem("hidden", "true");
    }
  };
  const loginuser = () => {
    if (ref.current) {
      ref.current.style.display = "block";
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
      <h1 className="text-4xl text-center mb-50">Attendance Portal</h1>
      <div className="flex justify-self-center gap-4">
        <button
          className="bg-blue-400 cursor-pointer p-2 text-white rounded-2xl"
          onClick={loginuser}
        >
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
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="space-y-2" ref={ref}>
          <p>Password</p>
          <input
            type="text"
            placeholder="Enter password"
            className="p-2 w-75 border border-blue-600"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          className="bg-blue-400 cursor-pointer p-2 text-white rounded-2xl"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </>
  );
}

export default Login;
