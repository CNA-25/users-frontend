import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/navbar";

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Uppdaterar state när användaren skriver i ett inmatningsfält
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Hanterar formulärinlämning
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Skickar användardata till API:n, urln är en placeholder
    try {
      await axios.post("http://localhost:5000/api/users/register", formData);
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col p-4 my-48">
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-1/4 space-y-4"
          >
            <h1 className="my-8 text-6xl font-bold text-center text-orange-500">
              Register
            </h1>
            {error && <p className="text-center text-red-500">{error}</p>}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 text-orange-200 bg-black border border-black rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 text-orange-200 bg-black border border-black rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 text-orange-200 bg-black border border-black rounded"
              required
            />
            <button
              type="submit"
              className="p-2 text-white bg-orange-500 rounded hover:bg-orange-800"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <Link
              to="/"
              className="w-auto text-center text-orange-500 md:text-md hover:text-orange-800"
            >
              Already have an account? Login here!
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
