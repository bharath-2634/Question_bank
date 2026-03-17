import React from "react";
import "../styles/style.css";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white">
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-3 w-full ">
        <div className="w-full">
            <Outlet/>
        </div>
        
      </div>
    </div>
  );
};

export default AuthLayout;
