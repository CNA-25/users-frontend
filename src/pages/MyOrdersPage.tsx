import React from "react";
import Navbar from "../components/navbar";
import OrderList from "@/components/orders/OrderList";

const MyOrdersPage: React.FC = () => {
	return (
		<>
			<Navbar />
			<div className="px-4">
				<h1 className="text-4xl font-bold">Your orders:</h1>
				<OrderList />
			</div>
		</>
	);
};

export default MyOrdersPage;
