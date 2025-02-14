import Navbar from "@/components/navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated User Info:", formData);
    // API CALL AND LOGIC GOES HERE
    navigate("/orders");
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
