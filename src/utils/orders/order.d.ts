export type Order = {
	orderId: number;
	userId: number;
	timestamp: Date;
	orderPrice: string;
	orderItems?: OrderItem[];
};

export type OrderItem = {
	order_item_id: number;
	order_id: number;
	product_id: number;
	amount: number;
	product_price: string;
	product_name: string;
};
