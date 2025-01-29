import { useQuery } from "@tanstack/react-query";
import { API } from "@/utils/orders/api";
import { Order } from "@/utils/orders/order";
import OrderItem from "./OrderItem";

function OrderList() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => loadOrders(101),
    queryKey: ["orders"],
    refetchOnMount: true,
  });

  if (isLoading) {
    return (
      <tr className="border-black border-2">
        <td colSpan={4} className="p-2 text-md md:text-3xl">
          Loading your orders...
        </td>
      </tr>
    );
  }

  if (isError) {
    return (
      <tr className="border-black border-2">
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
    <tr className="border-black border-2">
      <td colSpan={4} className="p-2 text-md md:text-3xl">
        You have no orders
      </td>
    </tr>
  );
}

const loadOrders = async (id: number) => {
  try {
    const response = await API.get<Order[]>(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

function OrderListLayout() {
  return (
    <table className="table-auto border-collapse w-full">
      <thead className="bg-orange-500">
        <tr className="">
          <th className="text-white text-left text-md md:text-3xl font-semibold border-black border-2 p-2">
            Order ID
          </th>
          <th className="text-white text-left text-md md:text-4xl font-semibold border-black border-2 p-2">
            User ID
          </th>
          <th className="text-white text-left text-md md:text-4xl font-semibold border-black border-2 p-2">
            Order Time
          </th>
          <th className="text-white text-left text-md md:text-4xl font-semibold border-black border-2 p-2">
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
