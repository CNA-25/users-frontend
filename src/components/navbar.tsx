import { useAuthStore } from "@/stores/auth";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
	const { authenticated, setAuthenticated, setToken } = useAuthStore();

	const handleLogout = () => {
		setAuthenticated(false);
		setToken(undefined);
	};

	return (
		<div className="w-full bg-black">
			<div className="flex flex-col max-w-screen-xl p-2 mx-auto md:p-4 md:flex-row">
				<div className="flex flex-row items-center justify-between flex-1">
					<h1 className="text-3xl font-bold text-orange-500">BeerCraft</h1>
				</div>
				<div className="flex flex-col justify-end flex-1 md:flex-row">
					{authenticated ? (
						<>
							<Link
								to="/edit"
								className="mx-4 text-2xl text-orange-500 md:text-md hover:text-orange-800"
							>
								Profile
							</Link>
							<button
								className="mx-4 text-2xl text-orange-500 md:text-md hover:text-orange-800"
								onClick={handleLogout}
							>
								Logout
							</button>
						</>
					) : (
						<>
							<Link
								to="/"
								className="mx-4 text-2xl text-orange-500 md:text-md hover:text-orange-800"
							>
								Login
							</Link>
							<Link
								to="/register"
								className="mx-4 text-2xl text-orange-500 md:text-md hover:text-orange-800"
							>
								Register
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
