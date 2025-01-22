import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="w-full p-4 mb-8 bg-black">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-orange-500">BeerCraft</h1>
        <div className="flex space-x-8">
          <Link to="/" className="text-orange-500 text-m hover:text-orange-800">
            Home
          </Link>
          <Link
            to="/login"
            className="text-orange-500 text-m hover:text-orange-800"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-orange-500 text-m hover:text-orange-800"
          >
            Register
          </Link>
          <Link
            to="/orders"
            className="text-orange-500 text-m hover:text-orange-800"
          >
            Orders
          </Link>
          <Link
            to="/resetpassword"
            className="text-orange-500 text-m hover:text-orange-800"
          >
            Reset password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
