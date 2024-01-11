import React, { useState } from "react";
import axios from "axios";
import { useIntl } from "react-intl";
import { message } from "antd";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const intl = useIntl();

  const forgotPas = intl.formatMessage({ id: "forgotPas" });
  const resetSent = intl.formatMessage({ id: "resetSent" });
  const resetPas = intl.formatMessage({ id: "resetPas" });
  const wrongMes = intl.formatMessage({ id: "wrongMes" });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e) => {
    console.log(email);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`,

        {
          email,
        }
      );
      if (response.status === 200) {
        setIsEmailSent(true);
      }
    } catch (error) {
      console.log(error);
      message.error(wrongMes);
    }
  };
  return (
    <div className='w-[300px]  sm:w-60 mx-auto mt-20'>
      <h2 className='text-xl text-bluePrimary font-semibold py-4'>
        {forgotPas}
      </h2>
      {isEmailSent ? (
        <p className='sm:text-lg py-4'>{resetSent}</p>
      ) : (
        <form
          onSubmit={handleResetPassword}
          className='flex flex-col gap-5 relative w-full'>
          <input
            type='email'
            id='email'
            value={email}
            placeholder='Email'
            className='border rounded-md h-10 w-full px-3  focus:outline-none  '
            onChange={handleEmailChange}
            required
          />

          <button
            type='submit'
            className='text-[16px] bg-bluePrimary text-white h-10 rounded-sm'>
            {resetPas}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
