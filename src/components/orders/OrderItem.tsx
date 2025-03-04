import { useState } from "react";
import { Order } from "@/utils/orders/order";
import OrderProduct from "./OrderProduct";

export interface OrderItemProps {
	order: Order;
}

export default function OrderItem(props: OrderItemProps) {
	const { order } = props;
	const [open, setOpen] = useState(false);

	const toggleOpen = () => setOpen((prev) => !prev);

	return (
		<>
			<tr
				className={
					"cursor-pointer hover:bg-zinc-700/50" + open && " bg-zinc-500"
				}
				onClick={toggleOpen}
			>
				<td className="px-2 py-1 font-light text-left border-b-2 border-r-2 border-white text-zinc-400 text-md md:text-2xl">
					# {order.order_id}
				</td>
				<td className="px-2 py-1 font-light text-left border-b-2 border-r-2 border-white text-zinc-400 text-md md:text-2xl">
					{order.user_id}
				</td>
				<td className="px-2 py-1 font-light text-left border-b-2 border-r-2 border-white text-zinc-400 text-md md:text-2xl">
					{new Date(order.timestamp).toLocaleString()}
				</td>
				<td className="px-2 py-1 font-light text-left border-b-2 border-r-2 border-white text-zinc-400 text-md md:text-2xl">
					{order.shipping_address}
				</td>
				<td className="px-2 py-1 font-light text-left border-b-2 border-white text-zinc-400 text-md md:text-2xl">
					{order.order_price} €
				</td>
			</tr>
			{open && (
				<tr className="border-none">
					<td colSpan={4} className="p-0">
						<table className="w-full border-none">
							<thead className="bg-orange-500 border-collapse">
								<tr>
									<th className="px-2 py-1 font-normal text-left text-white border-b-2 border-r-2 border-white text-md md:text-xl">
										Product Id
									</th>
									<th className="px-2 py-1 font-normal text-left text-white border-b-2 border-r-2 border-white text-md md:text-xl">
										Product Image
									</th>
									<th className="px-2 py-1 font-normal text-left text-white border-b-2 border-r-2 border-white text-md md:text-xl">
										Product Info
									</th>
									<th className="px-2 py-1 font-normal text-left text-white border-b-2 border-r-2 border-white text-md md:text-xl">
										Quantity
									</th>
									<th className="px-2 py-1 font-normal text-left text-white border-b-2 border-r-2 border-white text-md md:text-xl">
										Price
									</th>
									<th className="px-2 py-1 font-normal text-left text-white border-b-2 border-white text-md md:text-xl">
										Total Price
									</th>
								</tr>
							</thead>
							<tbody className="p-0 m-0 border-none table-auto">
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
