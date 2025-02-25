import { OrderItem } from "@/utils/orders/order";
import React from "react";

export interface OrderProductProps {
	product: OrderItem;
}

function OrderProduct(props: OrderProductProps) {
	const { product } = props;

	return (
		<tr className="[&>*:nth-child(odd)]:bg-yellow-200 [&>*:nth-child(even)]:bg-yellow-300">
			<td className="px-2 py-1 font-normal text-left border-2 border-black text-md md:text-2xl">
				# {product.product_id}
			</td>
			<td className="px-2 py-1 mx-auto font-normal text-left border-2 border-black text-md md:text-2xl">
				<img
					src={product.product_image}
					alt="Product image"
					className="mx-auto max-h-48"
				/>
			</td>
			<td className="px-2 py-1 font-normal text-left border-2 border-black text-md md:text-2xl">
				{product.product_name}
			</td>
			<td className="px-2 py-1 font-normal text-left border-2 border-black text-md md:text-2xl">
				{product.quantity} items
			</td>
			<td className="px-2 py-1 font-normal text-left border-2 border-black text-md md:text-2xl">
				{product.product_price} € / item
			</td>
			<td className="px-2 py-1 font-normal text-left border-2 border-black text-md md:text-2xl">
				{product.product_price} €
			</td>
		</tr>
	);
}

export default OrderProduct;
