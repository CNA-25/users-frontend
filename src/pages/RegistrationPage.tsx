import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/auth";
import { useTranslation } from "react-i18next";

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    address: {
      street: "",
      city: "",
      zip: "",
      country: "",
    },
  });

  const { setToken, setAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();

  // Handles input changes, including address fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      // Extract field name (e.g., "street" from "address.street")
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else if (name === "dob") {
      // Convert date to ISO format
      const isoDate = new Date(value).toISOString();
      setFormData((prev) => ({ ...prev, [name]: isoDate }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://user-service-api-user-service.2.rahtiapp.fi/users",
        formData
      );

      toast.success(t("registerSuccess"), {
        className: "bg-zinc-900 text-white",
      });

      setToken(response.data.access_token);
      setAuthenticated(true);
      navigate(state?.path || "/orders");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(t("registerFailed"), {
        className: "bg-zinc-900 text-white",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center flex-1 items-top">
        <form
          className="flex flex-col w-full gap-1 px-4 xl:w-1/4 md:w-1/3 sm:w-1/2 sm:px-0"
          onSubmit={handleSubmit}
        >
          <h1 className="mt-2 mb-8 text-3xl font-bold text-center text-orange-500 md:text-6xl sm:mt-60">
            {t("register")}
          </h1>

          <input
            type="text"
            name="name"
            placeholder={t("name")}
            value={formData.name}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder={t("email")}
            value={formData.email}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
            required
          />

          <input
            type="tel"
            name="phone"
            pattern="[0-9]{10}"
            placeholder={t("phone")}
            value={formData.phone}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
            required
          />

          <div className="flex flex-col">
            <p className="pl-2 text-orange-200/50 text-md">{t("dob")}</p>
            <input
              type="date"
              name="dob"
              value={formData.dob ? formData.dob.split("T")[0] : ""}
              onChange={handleChange}
              className="p-2 text-orange-200 bg-black border border-black rounded"
              required
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder={t("password")}
            value={formData.password}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
            required
          />

          <input
            type="text"
            name="address.street"
            placeholder={t("street")}
            value={formData.address.street}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
            required
          />

          <input
            type="text"
            name="address.city"
            placeholder={t("city")}
            value={formData.address.city}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
            required
          />

          <input
            type="text"
            name="address.zip"
            placeholder={t("zip")}
            value={formData.address.zip}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
            required
          />

          <input
            type="text"
            name="address.country"
            placeholder={t("country")}
            value={formData.address.country}
            onChange={handleChange}
            className="p-2 text-orange-200 bg-black border border-black rounded"
            required
          />

          <button
            type="submit"
            className="p-2 text-white bg-orange-500 rounded hover:bg-orange-800"
            disabled={loading}
          >
            {t("register")}
          </button>

          <Link
            to="/"
            className="w-auto text-center text-orange-500 md:text-md hover:text-orange-800"
          >
            {t("alreadyAccount")}
          </Link>
        </form>
      </div>
    </>
  );
};

export default RegistrationPage;
