import { useState } from "react";
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
      <tr
        className="[&>*:nth-child(odd)]:bg-orange-300 [&>*:nth-child(even)]:bg-orange-200 cursor-pointer hover:bg-slate-500 "
        onClick={toggleOpen}
      >
        <td className="text-left text-md md:text-3xl font-normal border-black border-2 px-2 py-1">
          # {order.orderId}
        </td>
        <td className="text-left text-md md:text-3xl font-normal border-black border-2 px-2 py-1">
          {order.userId}
        </td>
        <td className="text-left text-md md:text-3xl font-normal border-black border-2 px-2 py-1">
          {new Date(order.timestamp).toLocaleString()}
        </td>
        <td className="text-left text-md md:text-3xl font-normal border-black border-2 px-2 py-1">
          {order.orderPrice} €
        </td>
      </tr>
      {open && (
        <tr className="border-2 border-black">
          <td colSpan={4} className="p-2">
            <table className="w-full table-auto border-collapse">
              <thead className="border-none bg-yellow-500">
                <tr>
                  <th className="text-white text-left text-md md:text-3xl font-bold border-black border-2 px-2 py-1">
                    Product Id
                  </th>
                  <th className="text-white text-left text-md md:text-3xl font-bold border-black border-2 px-2 py-1">
                    Product Name
                  </th>
                  <th className="text-white text-left text-md md:text-3xl font-bold border-black border-2 px-2 py-1">
                    Quantity
                  </th>
                  <th className="text-white text-left text-md md:text-3xl font-bold border-black border-2 px-2 py-1">
                    Price
                  </th>
                  <th className="text-white text-left text-md md:text-3xl font-bold border-black border-2 px-2 py-1">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody className="border-none">
                {order.orderItems?.map((item, idx) => (
                  <tr
                    key={idx}
                    className="[&>*:nth-child(odd)]:bg-yellow-200 [&>*:nth-child(even)]:bg-yellow-300"
                  >
                    <td className="text-left text-md md:text-2xl font-normal border-black border-2 px-2 py-1">
                      # {item.product_id}
                    </td>
                    <td className="text-left text-md md:text-2xl font-normal border-black border-2 px-2 py-1">
                      {item.product_name}
                    </td>
                    <td className="text-left text-md md:text-2xl font-normal border-black border-2 px-2 py-1">
                      {item.amount} items
                    </td>
                    <td className="text-left text-md md:text-2xl font-normal border-black border-2 px-2 py-1">
                      {item.product_price} € / item
                    </td>
                    <td className="text-left text-md md:text-2xl font-normal border-black border-2 px-2 py-1">
                      {parseInt(item.product_price) * item.amount} €
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
