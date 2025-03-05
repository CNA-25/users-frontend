import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import decodeJWT from "@/components/JWT/jwtDecoder";
import { useAuthStore } from "@/stores/auth";
import Navbar from "@/components/navbar";
import axios from "axios";

const EditUserInfo: React.FC = () => {
  const navigate = useNavigate();
  const { token, setAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        toast.error("Unauthorized. Please log in.");
        setAuthenticated(false);
        navigate("/");
        return;
      }

      const decodedToken = decodeJWT(token);
      const userId = decodedToken?.sub;

      if (!userId) {
        toast.error("Failed to retrieve user ID.");
        return;
      }

      try {
        const response = await axios.get(
          `https://user-service-api-user-service.2.rahtiapp.fi/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = response.data.user_data;

        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          dob: userData.dob ? userData.dob.split("T")[0] : "", // Convert to YYYY-MM-DD
          password: "",
          confirmPassword: "",
        });

        setLoading(false);
      } catch (error) {
        toast.error("Error fetching user data");
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, navigate, setAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "dob") {
      const isoDate = new Date(value).toISOString();
      setFormData({ ...formData, [name]: isoDate });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Unauthorized. Please log in first.");
      return;
    }

    const decodedToken = decodeJWT(token);
    const userId = decodedToken?.sub;

    if (!userId) {
      toast.error("Failed to retrieve user ID.");
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: Record<string, any> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob ? new Date(formData.dob).toISOString() : null,
    };

    if (formData.password) updateData.password = formData.password;

    try {
      await axios.patch(
        `https://user-service-api-user-service.2.rahtiapp.fi/users/${userId}`,
        { ...updateData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      console.error("Update error:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-orange-500">Loading user data...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center flex-1 items-top">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-4 px-4 xl:w-1/4 md:w-1/3 sm:w-1/2 sm:px-0"
        >
          <h1 className="mb-8 text-6xl font-bold text-center text-orange-500">
            Update your information
          </h1>
          <input
            type="text"
            name="name"
            placeholder="Full name"
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
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
            required
          />
          <input
            type="date"
            name="birthday"
            placeholder="Birthday"
            value={formData.dob}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="New password (optional)"
            value={formData.password}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Retype password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
            required
          />
          <button
            type="submit"
            className="p-2 text-white bg-orange-500 rounded hover:bg-orange-800"
          >
            Update information
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUserInfo;
