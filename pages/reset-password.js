import React, { useState } from "react";
import axios from "axios";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const code = router.query.code;

  const intl = useIntl();

  const resetPas = intl.formatMessage({ id: "resetPas" });
  const resetSuccess = intl.formatMessage({ id: "resetSuccess" });
  const newPas = intl.formatMessage({ id: "newPas" });
  const setNewPas = intl.formatMessage({ id: "setNewPas" });
  const wrongMes = intl.formatMessage({ id: "wrongMes" });

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/reset-password`,
        {
          code: code,
          password: newPassword,
          passwordConfirmation: newPassword,
        }
      );

      console.log(response);
      if (response.status === 200) {
        setIsResetSuccessful(true);
      }
    } catch (error) {
      console.log(error);
      setError(wrongMes);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center mt-10 text-bluePrimary'>
      <h2 className='text-xl mb-4'>{resetPas}</h2>
      {isResetSuccessful ? (
        <p>{resetSuccess}</p>
      ) : (
        <div className='w-[300px] sm:w-[50%] mx-auto'>
          <form onSubmit={handleSetNewPassword}>
            <div className='relative'>
              {" "}
              <input
                type={show ? "text" : "password"}
                id='newPassword'
                placeholder={newPas}
                value={newPassword}
                className='border rounded-md h-10 w-full px-3 my-1 focus:outline-none  '
                onChange={handleNewPasswordChange}
                required
              />
              <span className='flex'>
                {show ? (
                  <BsEyeFill
                    size={21}
                    className='absolute top-[34%] right-[3.12%] cursor-pointer'
                    onClick={() => setShow(!show)}
                  />
                ) : (
                  <BsEyeSlashFill
                    size={21}
                    className='absolute top-[34%] right-[3.12%] cursor-pointer'
                    onClick={() => setShow(!show)}
                  />
                )}
              </span>
            </div>
            <button
              className='text-white bg-bluePrimary px-10 py-2 mt-2 rounded-lg'
              type='submit'>
              {setNewPas}
            </button>
          </form>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ResetPasswordPage;
