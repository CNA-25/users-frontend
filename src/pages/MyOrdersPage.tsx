import React from "react";
import Navbar from "../components/navbar";
import OrderList from "@/components/orders/OrderList";

const MyOrdersPage: React.FC = () => {
	return (
		<>
			<Navbar />
			<div className="flex justify-center flex-1 px-4 overflow-hidden">
				<div className="flex flex-col flex-1 w-full max-w-screen-lg mb-10 overflow-hidden">
					<h1 className="my-4 text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
						Your orders:
					</h1>
					<OrderList />
				</div>
			</div>
		</>
	);
};

export default MyOrdersPage;
