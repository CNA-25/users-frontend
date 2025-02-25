import { useQuery } from "@tanstack/react-query";
import { API } from "@/utils/orders/api";
import { Order } from "@/utils/orders/order";
import OrderItem from "./OrderItem";
import decodeJWT from "../JWT/jwtDecoder";
import { useAuthStore } from "@/stores/auth";

function OrderList() {
	const { token } = useAuthStore();
	const tokenData = decodeJWT(token || "");

	const { data, isLoading, isError, error } = useQuery({
		queryFn: () => loadOrders(tokenData.sub, token || ""),
		queryKey: ["orders"],
		refetchOnMount: true,
	});

	if (isLoading) {
		return (
			<tr className="border-2 border-black">
				<td colSpan={4} className="p-2 text-md md:text-3xl">
					Loading your orders...
				</td>
			</tr>
		);
	}

	if (isError) {
		return (
			<tr className="border-2 border-black">
				<td colSpan={4} className="p-2 text-md md:text-3xl">
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
		<tr className="border-2 border-gray-500">
			<td colSpan={4} className="p-2 text-white text-md md:text-3xl">
				You have no orders
			</td>
		</tr>
	);
}

const loadOrders = async (id: number, token: string) => {
	try {
		const response = await API.get<Order[]>(`/orders`, {
			headers: { token: `${token}` },
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

function OrderListLayout() {
	return (
		<table className="w-full border-collapse table-auto">
			<thead className="bg-orange-500">
				<tr className="">
					<th className="p-2 font-semibold text-left text-white border-2 border-gray-300 rounded-md text-md md:text-3xl">
						Order ID
					</th>
					<th className="p-2 font-semibold text-left text-white border-2 border-gray-300 text-md md:text-4xl">
						User ID
					</th>
					<th className="p-2 font-semibold text-left text-white border-2 border-gray-300 text-md md:text-4xl">
						Order Time
					</th>
					<th className="p-2 font-semibold text-left text-white border-2 border-gray-300 text-md md:text-4xl">
						Order Price
					</th>
				</tr>
			</thead>
			<tbody className="p-0 m-0">
				<OrderList />
			</tbody>
		</table>
	);
}

export default OrderListLayout;
