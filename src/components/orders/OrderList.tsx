import React from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/utils/orders/api";
import { Order } from "@/utils/orders/order";
import OrderItem from "./OrderItem";

function OrderList() {
	const { data, isLoading, isError, error } = useQuery({
		queryFn: () => loadOrders(101),
		queryKey: ["orders"],
	});

	if (isLoading) {
		return (
			<div>
				<h1>Loading your orders</h1>
			</div>
		);
	}

	if (isError) {
		return (
			<div>
				<h1>
					Error loading your orders:{" "}
					{error instanceof Error ? error.message : "Unknown error"}
				</h1>
			</div>
		);
	}

	return (
		<div>
			{Array.isArray(data) && data.length > 0 ? (
				<table className="table-auto border-collapse w-full">
					<thead className="bg-gray-500">
						<tr className="">
							<th className="text-left text-lg font-semibold border-black border-2 p-2">
								Order ID
							</th>
							<th className="text-left text-lg font-semibold border-black border-2 p-2">
								User ID
							</th>
							<th className="text-left text-lg font-semibold border-black border-2 p-2">
								Order Price
							</th>
							<th className="text-left text-lg font-semibold border-black border-2 p-2">
								Order Timestamp
							</th>
						</tr>
					</thead>
					<tbody className="p-0 m-0">
						{data.map((order, idx) => {
							return <OrderItem key={idx} order={order} />;
						})}
					</tbody>
				</table>
			) : (
				<div>No orders</div>
			)}
		</div>
	);
}

const loadOrders = async (id: number) => {
	try {
		const response = await API.get<Order[]>(`/orders/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export default OrderList;
