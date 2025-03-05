import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import decodeJWT from "@/components/JWT/jwtDecoder";
import { useAuthStore } from "@/stores/auth";
import Navbar from "@/components/navbar";

const EditUserInfo: React.FC = () => {
  const navigate = useNavigate();
  const { token, setAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
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
        const response = await fetch(
          `https://user-service-api-user-service.2.rahtiapp.fi/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();

        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          birthday: userData.dob ? userData.dob.split("T")[0] : "", // Convert to YYYY-MM-DD
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      dob: formData.birthday ? new Date(formData.birthday).toISOString() : null,
    };

    if (formData.password) updateData.password = formData.password;

    try {
      const response = await fetch(
        `https://user-service-api-user-service.2.rahtiapp.fi/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

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
          <h4 className="text-xl text-white">
            A * above a field means it is required
          </h4>
          <h2 className="text-2xl font-bold text-orange-500">*</h2>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <h2 className="text-2xl font-bold text-orange-500">*</h2>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <h2 className="text-2xl font-bold text-orange-500">*</h2>
          <input
            type="date"
            name="birthday"
            placeholder="Birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="New password (optional)"
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
