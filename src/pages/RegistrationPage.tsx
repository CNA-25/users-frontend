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
  });
  const { setToken, setAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();

  // Uppdaterar state när användaren skriver i ett inmatningsfält
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "dob") {
      const isoDate = new Date(value).toISOString();
      setFormData({ ...formData, [name]: isoDate });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  //Hanterar formulärinlämning
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Skickar användardata till API:n, urln är en placeholder
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
      console.log(error);
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
          className="flex flex-col w-full gap-4 px-4 xl:w-1/4 md:w-1/3 sm:w-1/2 sm:px-0"
          onSubmit={handleSubmit}
        >
          <h1 className="mt-2 mb-8 text-6xl font-bold text-center text-orange-500 sm:mt-60">
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
