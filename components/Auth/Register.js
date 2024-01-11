import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { useRouter } from "next/router";
import axios from "axios";
import { AiOutlineSync } from "react-icons/ai";
import TermsModal from "./TermsModal";
import { useIntl } from "react-intl";
import { message } from "antd";
import UseAuthContext from "@/hooks/useAuthContext";
import { validateEmail, validatePassword } from "@/utils/helper";

const RegisterComponent = () => {
  const [show, setShow] = useState(false);
  const [openTerms, setShowOpenTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const intl = useIntl();

  const title = intl.formatMessage({ id: "register.title" });
  const text = intl.formatMessage({ id: "register.text" });
  const name = intl.formatMessage({ id: "register.name" });
  const lastName = intl.formatMessage({ id: "register.lastName" });
  const password = intl.formatMessage({ id: "register.password" });
  const email = intl.formatMessage({ id: "register.email" });
  const agree = intl.formatMessage({ id: "register.agree" });
  const terms = intl.formatMessage({ id: "register.terms" });
  const question = intl.formatMessage({ id: "register.question" });
  const button = intl.formatMessage({ id: "register.button" });
  const login = intl.formatMessage({ id: "register.login" });
  const wrongMes = intl.formatMessage({ id: "wrongMes" });
  const acceptTerms = intl.formatMessage({ id: "register.accept" });
  const successRegist = intl.formatMessage({ id: "registSuccess" });

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    phone: "",
  });

  const router = useRouter();
  const {
    state: { user },
  } = UseAuthContext();

  // useEffect(() => {
  //   if (user !== null) {
  //     router.push("/login");
  //   }
  // }, [user]);
  const handleUser = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleCheckbox = (e) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleTermsModalOpen = () => {
    setShowOpenTerms(true);
  };

  const handleTermsModalClose = () => {
    setShowOpenTerms(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check email and password validity
    if (!validateEmail(userData.email)) {
      setLoading(false);
      return message.error("Invalid email format");
    }

    if (!validatePassword(userData.password)) {
      setLoading(false);
      return message.error(
        "Password must be at least 8 characters and contain both letters and numbers"
      );
    }

    if (!agreeToTerms) {
      setLoading(false);
      return message.error(acceptTerms);
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
        userData
      );

      if (data.jwt) {
        setLoading(false);
        router.push("/login");
      } else {
        setLoading(false);
        message.error("Registration failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        // Handle server errors
        const { status, data } = err.response;
        if (status === 400) {
          // Handle validation errors
          const errorMessages =
            data.message || "Registration failed. Please try again.";
          message.error(errorMessages);
        } else {
          // Handle other server errors
          message.error("Server error. Please try again later.");
        }
      } else if (err.request) {
        // Network error
        message.error("Network error. Please check your internet connection.");
      } else {
        // Catch-all for unexpected errors
        console.error(err);
        message.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className='w-full h-full mx-auto flex flex-col  text-bluePrimary'>
      <h1 className='text-4xl font-semibold mb-4'>{title}</h1>
      <p className='text-sm text-gray-primary '>{text}</p>
      <div className='mt-10'>
        <form
          className='flex flex-col gap-5 w-full relative'
          onSubmit={handleSubmit}>
          <div className='flex  gap-5'>
            <input
              placeholder={name}
              className='border rounded-md h-14 w-full px-3  focus:outline-none '
              name='username'
              type='text'
              onChange={(e) => handleUser(e)}
              required
            />

            <input
              placeholder={lastName}
              className='border rounded-md h-14 w-full px-3  focus:outline-none '
              name='lastName'
              type='text'
              onChange={(e) => handleUser(e)}
            />
          </div>

          <input
            placeholder={email}
            className='border rounded-md h-14 w-full px-3  focus:outline-none '
            type='email'
            name='email'
            onChange={(e) => handleUser(e)}
          />

          <input
            placeholder={password}
            className='border rounded-md h-14 w-full p-3 focus:outline-none '
            type={show ? "text" : "password"}
            name='password'
            onChange={(e) => handleUser(e)}
            required
          />
          <span className='flex '>
            {show ? (
              <BsEyeFill
                size={21}
                className='absolute top-[44%] right-[3.12%] cursor-pointer'
                onClick={() => setShow(!show)}
              />
            ) : (
              <BsEyeSlashFill
                size={21}
                className='absolute top-[44%] right-[3.12%] cursor-pointer'
                onClick={() => setShow(!show)}
              />
            )}
          </span>

          <div className='flex  mb-4'>
            {" "}
            <input
              type='checkbox'
              id='agreeToTerms'
              name='agreeToTerms'
              checked={agreeToTerms}
              onChange={handleCheckbox}
              className='cursor-pointer mr-1'
            />
            <label htmlFor='agreeToTerms' className='text-xs'>
              {agree}{" "}
              <button
                type='button'
                className='text-blue-500'
                onClick={handleTermsModalOpen}>
                {terms}
              </button>
            </label>
          </div>
          <div className='flex flex-col gap-3'>
            <button
              className='bg-bluePrimary h-14 rounded-md  flex justify-center items-center text-white button'
              type='submit'>
              {loading ? <AiOutlineSync /> : `${button}`}
            </button>

            <p className='text-center text-xs'>
              {question}
              <Link href='/login' className='text-orangePrimary'>
                {" "}
                {login}
              </Link>
            </p>
          </div>
        </form>
        {/* <p className='text-center text-gray-primary text-xs opacity-50 my-8'>
          Or Sign up with
        </p>
        <div className=' flex flex-row gap-4 justify-center'>
          <button className='py-4 px-6 border border-brand-clr lg:w-[160px] h-[56px] flex justify-center '>
            <BsFacebook className='text-blue-600 ' />
          </button>
          <button className='py-4 px-6 border border-brand-clr lg:w-[160px] h-[56px] flex justify-center'>
            <FcGoogle size={21} />
          </button>
          <button className='py-4 px-6 border border-brand-clr lg:w-[160px] h-[56px] flex justify-center'>
            <AiFillApple size={21} />
          </button>
        </div> */}

        {openTerms && <TermsModal close={handleTermsModalClose} />}
      </div>
    </div>
  );
};

export default RegisterComponent;
