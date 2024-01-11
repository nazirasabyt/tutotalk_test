import Layout from "@/components/Shared/Layout";
import React from "react";

const CancelPage = () => {
  return (
    <Layout>
      <div className='flex flex-col justify-center items-center mt-10'>
        {" "}
        <p className='text-red-500'>Payment failed. Try again.</p>
      </div>
    </Layout>
  );
};

export default CancelPage;
