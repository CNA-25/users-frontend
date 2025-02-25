import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState<string | null>(null);
	const { setToken, setAuthenticated } = useAuthStore();
	const { state } = useLocation();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(""); // Reset error state before attempting login
		await handleLogin();
	};

	const handleLogin = async () => {
		setAuthenticated(true);
		setToken(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMzMiLCJuYW1lIjoiVGVzdCBBZG1pbiIsImVtYWlsIjoidGVzdC5hZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM5NDU5NzcyLCJleHAiOjE3NDIwNTE3NzJ9.yzZAMRfFsD-PNgGERAlV0IwHbRNf31PfXEih1YwLc9E"
		);
		try {
			const response = await fetch("{{apiURL}}/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || "Login failed");
			}

			toast.success("Login successful!", {
				className: "bg-zinc-900 text-white",
			});
			console.log("Login successful", data);
			setToken(data.access_token);
			setAuthenticated(true);
			navigate(state?.path || "/orders");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "An unexpected error occurred",
				{ className: "bg-zinc-900 text-white" }
			);
			console.error("Login error:", error);
		}
	};

	return (
		<>
			<Navbar />
			<ToastContainer />
			<div className="flex justify-center flex-1 items-top">
				<form
					className="flex flex-col w-full gap-4 px-4 xl:w-1/4 md:w-1/3 sm:w-1/2 sm:px-0"
					onSubmit={handleSubmit}
				>
					<h1 className="mt-2 mb-8 text-6xl font-bold text-center text-orange-700 sm:mt-60">
						Login
					</h1>
					{error && <p className="text-center text-red-500">{error}</p>}
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
						className="w-auto text-orange-600 md:text-md hover:text-orange-800"
					>
						Forgot password?
					</Link>
					<button
						type="submit"
						className="p-2 text-white bg-orange-600 rounded hover:bg-orange-800"
					>
						Login
					</button>
					<Link
						to="/register"
						className="w-auto text-center text-orange-600 md:text-md hover:text-orange-800"
					>
						No account? Register here!
					</Link>
				</form>
			</div>
		</>
	);
};

export default LoginPage;
