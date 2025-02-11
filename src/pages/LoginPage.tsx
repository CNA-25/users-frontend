import React from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
const LoginPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col p-4 my-48">
        <div className="flex items-center justify-center">
          <form className="flex flex-col w-1/4 space-y-4">
            <h1 className="my-8 text-6xl font-bold text-center text-orange-700">
              Login
            </h1>
            <input
              type="text"
              placeholder="Username"
              className="p-2 text-orange-200 bg-black border border-black rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 text-orange-200 bg-black border border-black rounded"
            />
            <Link
              to="/resetpassword"
              className="w-auto text-orange-600 md:text-md hover:text-orange-800"
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              className="p-2 text-white bg-orange-600 rounded hover:bg-orange-800"
            >
              Login
            </button>
            <Link
              to="/register"
              className="w-auto text-center text-orange-600 md:text-md hover:text-orange-800"
            >
              No account? Register here!
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
