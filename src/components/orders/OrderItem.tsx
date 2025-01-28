import React, { useState } from "react";
import { Order } from "@/utils/orders/order";

export interface OrderItemProps {
	order: Order;
}

export default function OrderItem(props: OrderItemProps) {
	const { order } = props;
	const [open, setOpen] = useState(false);

	const toggleOpen = () => setOpen(!open);

	return (
		<>
			<tr className="cursor-pointer hover:bg-slate-500" onClick={toggleOpen}>
				<td className="text-left text-md font-normal border-black border-2 px-2 py-1">
					# {order.orderId}
				</td>
				<td className="text-left text-md font-normal border-black border-2 px-2 py-1">
					{order.userId}
				</td>
				<td className="text-left text-md font-normal border-black border-2 px-2 py-1">
					{order.orderPrice} €
				</td>
				<td className="text-left text-md font-normal border-black border-2 px-2 py-1">
					{new Date(order.timestamp).toLocaleString()}
				</td>
			</tr>
			{open && (
				<tr className="border-2 border-black">
					<td colSpan={4} className="p-2">
						<table className="w-full table-auto border-collapse">
							<thead className="border-none bg-gray-400">
								<tr>
									<th className="text-left text-md font-bold border-black border-2 px-2 py-1">
										Product Id
									</th>
									<th className="text-left text-md font-bold border-black border-2 px-2 py-1">
										Product Name
									</th>
									<th className="text-left text-md font-bold border-black border-2 px-2 py-1">
										Quantity
									</th>
									<th className="text-left text-md font-bold border-black border-2 px-2 py-1">
										Price
									</th>
								</tr>
							</thead>
							<tbody className="border-none">
								{order.orderItems?.map((item, idx) => (
									<tr key={idx}>
										<td className="text-left text-md font-normal border-black border-2 px-2 py-1">
											{item.product_id}
										</td>
										<td className="text-left text-md font-normal border-black border-2 px-2 py-1">
											{item.product_name}
										</td>
										<td className="text-left text-md font-normal border-black border-2 px-2 py-1">
											{item.amount}
										</td>
										<td className="text-left text-md font-normal border-black border-2 px-2 py-1">
											{item.product_price} € / item
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</td>
				</tr>
			)}
		</>
	);
}
