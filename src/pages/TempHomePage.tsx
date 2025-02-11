import React from "react";
import Navbar from "../components/navbar";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 text-center">
        <h1 className="text-4xl font-bold text-white">
          Temporary HomePage for development
        </h1>
      </div>
    </>
  );
};

export default HomePage;
