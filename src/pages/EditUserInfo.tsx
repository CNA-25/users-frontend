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
    address: {
      street: "",
      city: "",
      zip: "",
      country: "",
    },
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
        if (!token) {
          toast.error(t("unauthorized"));
          setAuthenticated(false);
          navigate("/", { state: { path: "/edit" } });
          return;
        }

        const userId = decodeJWT(token)?.sub;
        if (!userId) {
          toast.error(t("userIdError"));
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
          toast.error(t("userFetchError"));
          return;
        }

        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          dob: userData.dob ? userData.dob.split("T")[0] : "",
          password: "",
          confirmPassword: "",
          address: userData.address
            ? {
                street: userData.address.street || "",
                city: userData.address.city || "",
                zip: userData.address.zip || "",
                country: userData.address.country || "",
              }
            : { street: "", city: "", zip: "", country: "" },
          data: userData.data ? JSON.stringify(userData.data) : "",
        });
      } catch (error) {
        toast.error(t("userFetchError"));
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, navigate, setAuthenticated, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error(t("unauthorized"));
      setAuthenticated(false);
      navigate("/", { state: { path: "/edit" } });
      return;
    }

    const userId = decodeJWT(token)?.sub;
    if (!userId) {
      toast.error(t("userIdError"));
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error(t("passwordMismatch"));
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      password: formData.password,
      address: formData.address,
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
      toast.success(t("userUpdateSuccess"));
    } catch (error) {
      toast.error(t("userUpdateError"));
      console.error("Update error:", error);
    }
  };

  const handleDelete = async () => {
    if (!token) {
      toast.error(t("unauthorized"));
      setAuthenticated(false);
      navigate("/", { state: { path: "/edit" } });
      return;
    }

    const userId = decodeJWT(token)?.sub;
    if (!userId) {
      toast.error(t("userIdError"));
      return;
    }

    if (!window.confirm(t("deleteConfirm"))) {
      return;
    }

    try {
      await axios.delete(
        `https://user-service-api-user-service.2.rahtiapp.fi/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(t("userDeleteSuccess"));
      setAuthenticated(false);
      navigate("/");
    } catch (error) {
      toast.error(t("userDeleteError"));
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
          <h1 className="mb-8 text-3xl font-bold text-center text-orange-500 md:text-6xl">
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
            type="text"
            name="address.street"
            placeholder={t("street")}
            value={formData.address.street}
            onChange={handleChange}
            required
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <input
            type="text"
            name="address.city"
            placeholder={t("city")}
            value={formData.address.city}
            onChange={handleChange}
            required
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <input
            type="text"
            name="address.zip"
            placeholder={t("zip")}
            value={formData.address.zip}
            onChange={handleChange}
            required
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <input
            type="text"
            name="address.country"
            placeholder={t("country")}
            value={formData.address.country}
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
            required
            className="p-2 text-orange-200 bg-black border border-black rounded"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder={t("retypePassword")}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
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
