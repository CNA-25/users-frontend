import Navbar from "@/components/navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import decodeJWT from "@/components/JWT/jwtDecoder";

const EditUserInfo: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Unauthorized. Please log in first.", {
        className: "bg-zinc-900 text-white",
      });
      return;
    }
    const decodedToken = decodeJWT(token);
    const userId = decodedToken?.sub;

    if (!userId) {
      toast.error("Failed to retrieve user ID.");
      return;
    }

    try {
      const response = await fetch(`{{apiURL}}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          dob: formData.birthday,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      toast.success("User updated successfully!", {
        className: "bg-zinc-900 text-white",
      });
      navigate("/orders");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An error occurred",
        {
          className: "bg-zinc-900 text-white",
        }
      );
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col p-4 my-20">
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-1/4 space-y-4"
          >
            <h1 className="my-8 text-6xl font-bold text-center text-orange-700">
              Update your information
            </h1>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 text-orange-200 bg-black border border-black rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 text-orange-200 bg-black border border-black rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 text-orange-200 bg-black border border-black rounded"
            />
            <input
              type="date"
              name="birthday"
              placeholder="Birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="p-2 text-orange-200 bg-black border border-black rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 text-orange-200 bg-black border border-black rounded"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Retype password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="p-2 text-orange-200 bg-black border border-black rounded"
            />
            <button
              type="submit"
              className="p-2 text-white bg-orange-600 rounded hover:bg-orange-800"
            >
              Update information
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUserInfo;
