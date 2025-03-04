export type Order = {
	order_id: number;
	user_id: number;
	timestamp: Date;
	order_price: string;
	shipping_address: string;
	order_items?: OrderItem[];
};

export type OrderItem = {
	order_item_id: number;
	order_id: number;
	product_id: string;
	quantity: number;
	product_name: string;
	product_price: string;
	total_price: string;
	product_description: string;
	product_image: string;
	product_country: string;
	product_category: string;
};
