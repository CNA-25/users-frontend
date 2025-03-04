import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { toast } from "react-toastify";

const RegistrationPage: React.FC = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		dob: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Uppdaterar state när användaren skriver i ett inmatningsfält
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	//Hanterar formulärinlämning
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// Skickar användardata till API:n, urln är en placeholder
		try {
			await axios.post(
				"https://user-service-api-user-service.2.rahtiapp.fi/users",
				formData
			);
			toast.success("Register successful! Now Login", {
				className: "bg-zinc-900 text-white",
				onClick: () => {
					navigate("/");
				},
			});
		} catch (error) {
			console.log(error);
			toast.error("Failed to register successfully! Try again", {
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
						Register
					</h1>
					<input
						type="text"
						name="name"
						placeholder="Name"
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
						pattern="[0-9]{10}"
						placeholder="Phone"
						value={formData.phone}
						onChange={handleChange}
						className="p-2 text-orange-200 bg-black border border-black rounded"
						required
					/>
					<div className="flex flex-col">
						<p className="pl-2 text-orange-200/50 text-md">Date of Birth</p>
						<input
							type="date"
							name="dob"
							value={formData.dob}
							onChange={handleChange}
							className="p-2 text-orange-200 bg-black border border-black rounded"
							required
						/>
					</div>
					<input
						type="password"
						name="password"
						placeholder="Password"
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
						{loading ? "Registering..." : "Register"}
					</button>
					<Link
						to="/"
						className="w-auto text-center text-orange-500 md:text-md hover:text-orange-800"
					>
						Already have an account? Login here!
					</Link>
				</form>
			</div>
		</>
	);
};

export default RegistrationPage;
