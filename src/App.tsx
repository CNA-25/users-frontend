import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyOrdersPage from "./pages/MyOrdersPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegistrationPage";
import EditUserInfo from "./pages/EditUserInfo";
import ProtectedPage from "./components/ProtectedPage";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
	return (
		<Router>
			<ToastContainer theme="dark" autoClose={3000} closeOnClick={true} />
			<main className="flex flex-col w-screen h-screen p-0 mx-0 bg-zinc-950">
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route
						path="/edit"
						element={
							<ProtectedPage>
								<EditUserInfo />
							</ProtectedPage>
						}
					/>
					<Route
						path="/orders"
						element={
							<ProtectedPage>
								<MyOrdersPage />
							</ProtectedPage>
						}
					/>
				</Routes>
			</main>
		</Router>
	);
};

export default App;
