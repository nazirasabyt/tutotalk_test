import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className='flex h-screen bg-white overflow-hidden'>
      <div className='flex flex-col mt-40 w-[95%] sm:w-[50%] md:w-[30%] mx-auto'>
        <div className='text-start w-[96%] mx-auto'> {children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
