import React from "react";
import Navbar from "../components/navbar";
import OrderList from "@/components/orders/OrderList";

const MyOrdersPage: React.FC = () => {
	return (
		<>
			<Navbar />
			<div className="flex flex-col max-w-screen-lg px-4 py-8 mx-auto overflow-y-auto">
				<h1 className="my-4 text-4xl font-bold text-white">Your orders:</h1>
				<OrderList />
			</div>
		</>
	);
};

export default MyOrdersPage;
