import Layout from "@/components/Shared/Layout";
import React, { useState } from "react";
import UseAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { currencyFormatter } from "@/utils/helper";
import { useIntl } from "react-intl";
import { message } from "antd";

const PaymentLink = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const intl = useIntl();

  const payment_disclaimer = intl.formatMessage({ id: "payment.disclaimer" });
  const instructions = intl.formatMessage({ id: "instructions" });
  const instructions_desc = intl.formatMessage({ id: "instructions.desc" });

  const { auth } = UseAuthContext();

  const handlePayment = async () => {
    try {
      setLoading(true);
      if (!auth.jwt) router.push("/login");

      message.info("This payment type is currently unavailable.");

      // router.push("/payments/success");
    } catch (err) {
      console.log(err);
    }
  };

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <Layout>
      {" "}
      <h1 className='text-center mt-1'>
        {id === "self-study" && "Self Study"}
        {id === "group" && "Group Lessons"}
        {id === "individual" && "One on One"}
      </h1>
      <h2 className='text-center py-2 text-xl'>
        Pay{" "}
        {id === "self-study" &&
          currencyFormatter({
            amount: 29,
            currency: "usd",
          })}
        {id === "group" &&
          currencyFormatter({
            amount: 59,
            currency: "usd",
          })}
        {id === "individual" &&
          currencyFormatter({
            amount: 99,
            currency: "usd",
          })}
      </h2>
      <div className='flex flex-col  mt-8 gap-4'>
        {" "}
        <button
          className='bg-[#00df9a] w-[200px] rounded-md font-medium mx-auto px-6 py-3 '
          onClick={handlePayment}>
          Pay with card
        </button>
        <button
          onClick={handlePayment}
          className='bg-bluePrimary text-white w-[200px] rounded-md font-medium mx-auto px-6 py-3 '>
          Paypal
        </button>
        <button
          className='bg-orangePrimary w-[200px] rounded-md font-medium mx-auto px-6 py-3'
          onClick={handleModal}>
          Money transfer
        </button>
      </div>
      {open && (
        <div className='text-bluePrimary flex flex-col mt-10 text-center max-w-[400px] mx-auto'>
          <h2 className='text-lg pb-4'>{instructions}</h2>
          <p className='text-xs'>{instructions_desc}</p>
        </div>
      )}
      <p className='absolute bottom-5 mt-10 text-xs'>{payment_disclaimer}</p>
    </Layout>
  );
};

export default PaymentLink;
