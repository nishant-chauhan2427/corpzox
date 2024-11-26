import React from "react";

export const AuthLayout = ({ children }) => {
  return (
    <div className="w-full flex flex-row  sm:gap-12   ">
      <div
        className="md:w-1/2 flex justify-center items-center
        bg-[url('/images/auth/auth-main.svg')]   bg-cover rounded-2xl "
      >
        {/* <img src="/images/auth-main.svg" alt="" /> */}
        {/* h-[calc(100% - 24px)] */}
      </div>
      <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-start pt-2 sm:pr-10">
        {children}
      </div>
    </div>
  );
};
