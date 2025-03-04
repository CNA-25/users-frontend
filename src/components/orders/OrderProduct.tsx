import { OrderItem } from "@/utils/orders/order";

export interface OrderProductProps {
	product: OrderItem;
}

function OrderProduct(props: OrderProductProps) {
	const { product } = props;

	return (
		<tr className="w-full border-collapse h-max">
			<td className="px-2 py-1 text-center border-b-2 border-r-2 border-white text-zinc-500 font-extralight text-md md:text-xl">
				# {product.product_id}
			</td>
			<td className="px-2 py-1 mx-auto border-b-2 border-r-2 border-white">
				<img
					loading="lazy"
					src={
						"https://product-service-cna-product-service.2.rahtiapp.fi" +
						product.product_image
					}
					alt="Product image"
					height={180}
					className="object-cover mx-auto my-2 rounded-lg max-h-48"
				/>
			</td>
			<td
				style={{ maxWidth: 350 }}
				className="px-2 py-1 text-center border-b-2 border-r-2 border-white text-zinc-500 font-extralight text-md md:text-xl"
			>
				<table className="w-full h-full overflow-hidden border-collapse table-auto">
					{/* Row for product name */}
					<tr className="">
						<th className="pr-2 text-left align-top ">Name:</th>
						<td className="text-left align-top">{product.product_name}</td>
					</tr>
					{/* Row for product country */}
					<tr className="">
						<th className="pr-2 text-left align-top">Country:</th>
						<td className="text-left align-top">{product.product_country}</td>
					</tr>
					{/* Row for product category */}
					<tr className="">
						<th className="pr-2 text-left align-top">Category:</th>
						<td className="text-left align-top ">{product.product_category}</td>
					</tr>
					{/* Row for product description */}
					<tr className="">
						<th className="pr-2 text-left align-top">Description:</th>
						<td className="overflow-x-auto text-left align-top">
							{product.product_description}
						</td>
					</tr>
				</table>
			</td>
			<td className="px-2 py-1 text-center border-b-2 border-r-2 border-white text-zinc-500 font-extralight text-md md:text-xl">
				{product.quantity} x
			</td>
			<td className="px-2 py-1 text-center border-b-2 border-r-2 border-white text-zinc-500 font-extralight text-md md:text-xl">
				{product.product_price} € / item
			</td>
			<td className="px-2 py-1 text-center border-b-2 border-white text-zinc-500 font-extralight text-md md:text-xl">
				{product.total_price} €
			</td>
		</tr>
	);
}

export default OrderProduct;
