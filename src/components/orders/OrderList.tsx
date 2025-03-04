import { useQuery } from "@tanstack/react-query";
import { API } from "@/utils/orders/api";
import { Order } from "@/utils/orders/order";
import OrderItem from "./OrderItem";

function OrderList() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["orders"],
		queryFn: loadOrders,
		refetchOnMount: true,
	});

	if (isLoading) {
		return (
			<tr className="border-b-2 border-white">
				<td
					colSpan={4}
					className="p-2 text-zinc-400 font-extralight text-md md:text-2xl"
				>
					Loading your orders...
				</td>
			</tr>
		);
	}

	if (isError) {
		return (
			<tr className="border-b-2 border-white">
				<td
					colSpan={4}
					className="p-2 text-zinc-400 font-extralight text-md md:text-2xl"
				>
					Error loading your orders:{" "}
					{error instanceof Error ? error.message : "Unknown error"}
				</td>
			</tr>
		);
	}

	return Array.isArray(data) && data.length > 0 ? (
		<>
			{data.map((order, idx) => {
				return <OrderItem key={idx} order={order} />;
			})}
		</>
	) : (
		<tr className="border-b-2 border-white">
			<td
				colSpan={4}
				className="p-2 text-zinc-400 font-extralight text-md md:text-2xl"
			>
				You have no orders
			</td>
		</tr>
	);
}

const loadOrders = async () => {
	try {
		const response = await API.get<Order[]>(`/orders`, {});
		return response.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

function OrderListLayout() {
	return (
		<div className="w-full overflow-y-auto scrollbar-custom">
			<table className="w-full border-collapse table-auto">
				<thead className="">
					<tr className="">
						<th className="p-2 font-semibold text-left text-white border-b-2 border-r-2 border-white text-md md:text-3xl">
							Order ID
						</th>
						<th className="p-2 font-semibold text-left text-white border-b-2 border-r-2 border-white text-md md:text-3xl">
							User ID
						</th>
						<th className="p-2 font-semibold text-left text-white border-b-2 border-r-2 border-white text-md md:text-3xl">
							Order Time
						</th>
						<th className="p-2 font-semibold text-left text-white border-b-2 border-white text-md md:text-2xl">
							Order Price
						</th>
					</tr>
				</thead>
				<tbody className="border-collapse table-auto">
					<OrderList />
				</tbody>
			</table>
		</div>
	);
}

export default OrderListLayout;
