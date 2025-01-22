import React from "react";
import Navbar from "../components/navbar";

const MyOrdersPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 text-center">
        <h1 className="text-4xl font-bold">Welcome to the orders Page</h1>
      </div>
    </>
  );
};

export default MyOrdersPage;
