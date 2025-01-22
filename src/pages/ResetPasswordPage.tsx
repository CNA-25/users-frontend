import React from "react";
import Navbar from "../components/navbar";

const ResetPasswordPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 text-center">
        <h1 className="text-4xl font-bold">
          Welcome to the reset password Page
        </h1>
      </div>
    </>
  );
};

export default ResetPasswordPage;
