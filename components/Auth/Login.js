import Link from "next/link";
import React, { useState } from "react";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";
import UseAuthContext from "@/hooks/useAuthContext";
import { useIntl } from "react-intl";
import { message } from "antd";
import { setCookie } from "nookies";
import { validateEmail, validatePassword } from "@/utils/helper";

const LoginComponent = () => {
  const [show, setShow] = useState(false);
  const { dispatch } = UseAuthContext();

  const [userData, setUserData] = useState({
    identifier: "",
    password: "",
    rememberPassword: false,
  });

  const intl = useIntl();

  const title = intl.formatMessage({ id: "login.title" });
  const text = intl.formatMessage({ id: "login.text" });
  const email = intl.formatMessage({ id: "login.email" });
  const password = intl.formatMessage({ id: "login.password" });
  const forgot = intl.formatMessage({ id: "login.forgot" });
  const question = intl.formatMessage({ id: "login.question" });
  const button = intl.formatMessage({ id: "login.button" });
  const signup = intl.formatMessage({ id: "login.signup" });
  const loginSuccess = intl.formatMessage({ id: "loginSuccess" });

  const router = useRouter();
  const handleUser = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(userData.identifier)) {
      message.error("Invalid email format");
      return;
    }

    if (!validatePassword(userData.password)) {
      message.error(
        "Password must be at least 8 characters and contain both letters and numbers"
      );
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local?populate=*`,
        userData
      );
      console.log(data);

      if (data) {
        setCookie(null, "jwt", data.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setCookie(null, "selectedLesson", data.user?.level, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        dispatch({
          type: "LOGIN",
          payload: data.user,
        });

        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/platform");
        message.success(loginSuccess);
      } else {
        message.error("Login failed. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        // Handle specific API error response here
        message.error(err.response.data.message);
      } else if (err.message) {
        // Handle other errors (e.g., network issues)
        message.error(`An error occurred: ${err.message}`);
      } else {
        // Handle unexpected errors
        message.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className='w-full mx-auto flex flex-col sm:px-10 text-bluePrimary'>
      <h1 className='text-4xl font-semibold mb-4'>{title}</h1>
      <p className='text-sm'>{text}</p>
      <div className='mt-10'>
        <form
          className='flex flex-col gap-5 relative w-full'
          onSubmit={handleSubmit}>
          <div>
            <input
              placeholder={email}
              className='border rounded-md h-14 w-full px-3 focus:outline-none'
              name='identifier'
              type='text'
              onChange={(e) => handleUser(e)}
              required
            />
          </div>
          <div className='relative'>
            <input
              placeholder={password}
              className='border rounded-md h-14 w-full px-3 focus:outline-none'
              type={show ? "text" : "password"}
              name='password'
              onChange={(e) => handleUser(e)}
              required
            />
            <span className='flex'>
              {show ? (
                <BsEyeFill
                  size={21}
                  className='absolute top-[32%] sm:top-[30%] right-[3.12%] cursor-pointer'
                  onClick={() => setShow(!show)}
                />
              ) : (
                <BsEyeSlashFill
                  size={21}
                  className='absolute top-[32%] sm:top-[30%] right-[3.12%] cursor-pointer'
                  onClick={() => setShow(!show)}
                />
              )}
            </span>
          </div>
          <div className='flex justify-between mb-4'>
            <Link
              href='/forgot-password'
              className='flex-end text-xs text-salmon-clr cursor-pointer'>
              {forgot}
            </Link>
          </div>
          <div className='flex flex-col gap-3'>
            <button
              type='submit'
              className='bg-bluePrimary text-white h-12 sm:h-14 rounded-md w-full button'>
              {button}
            </button>
            <p className='text-center text-xs'>
              {question}
              <Link href='/register' className='text-orangePrimary'>
                {" "}
                {signup}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
