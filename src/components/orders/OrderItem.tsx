import { useState } from "react";
import { Order } from "@/utils/orders/order";
import OrderProduct from "./OrderProduct";

export interface OrderItemProps {
	order: Order;
}

export default function OrderItem(props: OrderItemProps) {
	const { order } = props;
	const [open, setOpen] = useState(false);

	const toggleOpen = () => setOpen(!open);

	return (
		<>
			<tr
				className="[&>*:nth-child(odd)]:bg-orange-300 [&>*:nth-child(even)]:bg-orange-200 cursor-pointer hover:bg-slate-500 "
				onClick={toggleOpen}
			>
				<td className="px-2 py-1 font-normal text-left border-2 border-black text-md md:text-3xl">
					# {order.order_id}
				</td>
				<td className="px-2 py-1 font-normal text-left border-2 border-black text-md md:text-3xl">
					{order.user_id}
				</td>
				<td className="px-2 py-1 font-normal text-left border-2 border-black text-md md:text-3xl">
					{new Date(order.timestamp).toLocaleString()}
				</td>
				<td className="px-2 py-1 font-normal text-left border-2 border-black text-md md:text-3xl">
					{order.order_price} €
				</td>
			</tr>
			{open && (
				<tr className="border-2 border-black">
					<td colSpan={4} className="p-2">
						<table className="w-full border-collapse table-auto">
							<thead className="bg-yellow-500 border-none">
								<tr>
									<th className="px-2 py-1 font-bold text-left text-white border-2 border-black text-md md:text-3xl">
										Product Id
									</th>
									<th className="px-2 py-1 font-bold text-left text-white border-2 border-black text-md md:text-3xl">
										Product Image
									</th>
									<th className="px-2 py-1 font-bold text-left text-white border-2 border-black text-md md:text-3xl">
										Product Name
									</th>
									<th className="px-2 py-1 font-bold text-left text-white border-2 border-black text-md md:text-3xl">
										Quantity
									</th>
									<th className="px-2 py-1 font-bold text-left text-white border-2 border-black text-md md:text-3xl">
										Price
									</th>
									<th className="px-2 py-1 font-bold text-left text-white border-2 border-black text-md md:text-3xl">
										Total Price
									</th>
								</tr>
							</thead>
							<tbody className="border-none">
								{order.order_items?.map((item, idx) => (
									<OrderProduct key={idx} product={item} />
								))}
							</tbody>
						</table>
					</td>
				</tr>
			)}
		</>
	);
}
