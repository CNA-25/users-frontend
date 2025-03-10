import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import decodeJWT from "@/components/JWT/jwtDecoder";
import { useAuthStore } from "@/stores/auth";
import Navbar from "@/components/navbar";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EditUserInfo: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token, setAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
    address: "",
    data: "",
  });

  useEffect(() => {
    if (!token) {
      toast.error("Unauthorized. Please log in.");
      setAuthenticated(false);
      navigate("/");
      return;
    }

    const fetchUserData = async () => {
      try {
        const decodedToken = decodeJWT(token);
        const userId = decodedToken?.sub;
        if (!userId) {
          toast.error("Failed to retrieve user ID.");
          return;
        }

        const response = await axios.get(
          `https://user-service-api-user-service.2.rahtiapp.fi/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const userData = response.data.user_data;
        if (!userData) {
          toast.error("Unexpected response from server.");
          return;
        }

        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          dob: userData.dob ? userData.dob.split("T")[0] : "",
          password: "",
          confirmPassword: "",
          address: userData.address ? JSON.stringify(userData.address) : "",
          data: userData.data ? JSON.stringify(userData.data) : "",
        });
      } catch (error) {
        toast.error("Error fetching user data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, navigate, setAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    const updateData: Record<string, any> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      address: formData.address ? JSON.parse(formData.address) : {},
      data: formData.data ? JSON.parse(formData.data) : {},
    };

    if (formData.password) updateData.password = formData.password;

    try {
      await axios.patch(
        `https://user-service-api-user-service.2.rahtiapp.fi/users/${userId}`,
        updateData,
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

  const handleDelete = async () => {
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

    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    ) {
      return;
    }

    try {
      await axios.delete(
        `https://user-service-api-user-service.2.rahtiapp.fi/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("User deleted successfully!");
      setAuthenticated(false);
      navigate("/");
    } catch (error) {
      toast.error("Error deleting user");
      console.error("Delete error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center flex-1 items-top">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-4 px-4 xl:w-1/4 md:w-1/3 sm:w-1/2 sm:px-0"
        >
          <h1 className="mb-8 text-6xl font-bold text-center text-orange-500">
            {t("updateUser")}
          </h1>
          {loading && (
            <p className="text-center text-orange-500">
              {t("loadingUserData")}
            </p>
          )}
          <input
            type="text"
            name="name"
            placeholder={t("name")}
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <input
            type="email"
            name="email"
            placeholder={t("email")}
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder={t("phone")}
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <input
            type="date"
            name="dob"
            placeholder={t("dob")}
            value={formData.dob}
            onChange={handleChange}
            required
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <input
            type="password"
            name="password"
            placeholder={t("newPassword")}
            value={formData.password}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder={t("retypePassword")}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <button
            type="submit"
            className="p-2 text-white bg-orange-500 rounded hover:bg-orange-800"
          >
            {t("updateUserButton")}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="p-2 mt-4 text-white bg-red-600 rounded hover:bg-red-800"
          >
            {t("deleteUserButton")}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUserInfo;
