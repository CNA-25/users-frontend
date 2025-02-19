import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state before attempting login
    await handleLogin();
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("{{apiURL}}/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success("Login successful!", {
        className: "bg-zinc-900 text-white",
      });
      console.log("Login successful", data);
      localStorage.setItem("access_token", data.access_token);
      navigate("/orders");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
        { className: "bg-zinc-900 text-white" }
      );
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex flex-col p-4 my-48">
        <div className="flex items-center justify-center">
          <form
            className="flex flex-col w-1/4 space-y-4"
            onSubmit={handleSubmit}
          >
            <h1 className="my-8 text-6xl font-bold text-center text-orange-700">
              Login
            </h1>
            {error && <p className="text-center text-red-500">{error}</p>}
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="p-2 text-orange-200 bg-black border border-black rounded"
              required
            />
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="p-2 text-orange-200 bg-black border border-black rounded"
              required
            />
            <Link
              to="/resetpassword"
              className="w-auto text-orange-600 md:text-md hover:text-orange-800"
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              className="p-2 text-white bg-orange-600 rounded hover:bg-orange-800"
            >
              Login
            </button>
            <Link
              to="/register"
              className="w-auto text-center text-orange-600 md:text-md hover:text-orange-800"
            >
              No account? Register here!
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
