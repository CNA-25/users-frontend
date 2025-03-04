import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { setToken, setAuthenticated } = useAuthStore();
	const { state } = useLocation();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleLogin();
	};

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				"https://user-service-api-user-service.2.rahtiapp.fi/login",
				{ ...formData }
			);
			toast.success("Login successful!", {
				className: "bg-zinc-900 text-white",
			});
			setToken(response.data.access_token);
			setAuthenticated(true);
			navigate(state?.path || "/orders");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "An unexpected error occurred"
			);
			console.error("Login error:", error);
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
						Login
					</h1>
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
						to="/reset"
						className="w-auto text-orange-500 md:text-md hover:text-orange-800"
					>
						Forgot password?
					</Link>
					<button
						type="submit"
						className="p-2 text-white bg-orange-500 rounded hover:bg-orange-800"
					>
						Login
					</button>
					<Link
						to="/register"
						className="w-auto text-center text-orange-500 md:text-md hover:text-orange-800"
					>
						No account? Register here!
					</Link>
				</form>
			</div>
		</>
	);
};

export default LoginPage;
