import React from "react";
import Navbar from "../components/navbar";

const ResetPasswordPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col p-4 my-72">
        <div className="flex items-center justify-center">
          <form className="flex flex-col w-1/4 space-y-4">
            <h1 className="text-3xl font-bold text-center ">Reset Password</h1>
            <input
              type="text"
              placeholder="E-mail"
              className="p-2 border rounded"
            />
              <input
              type="text"
              placeholder="Username"
              className="p-2 border rounded"
            />
            <input
              type="password"
              placeholder="New Password"
              className="p-2 border rounded"
            />
            <button
              type="submit"
              className="p-2 text-white bg-blue-500 rounded"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
