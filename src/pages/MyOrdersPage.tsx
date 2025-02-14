import React from "react";
import Navbar from "../components/navbar";
import OrderList from "@/components/orders/OrderList";
import { Link } from "react-router-dom";

const MyOrdersPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg px-4 py-8 mx-auto">
        <Link
          to="/editUserInfo"
          className="p-2 my-8 text-2xl text-orange-500 md:text-md hover:text-orange-800 bg-zinc-900 rounded-xl"
        >
          EDIT USER INFO
        </Link>
        <h1 className="my-4 text-4xl font-bold text-white">Your orders:</h1>
        <OrderList />
      </div>
    </>
  );
};

export default MyOrdersPage;
