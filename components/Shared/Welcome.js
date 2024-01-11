import { BsFillBellFill } from "react-icons/bs";
import UseAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { logo, menu } from "@/public/assets";
import { LiaTimesSolid } from "react-icons/lia";
import { NavLinks } from "./NavLinks";

const Links = ({ toggle, setToggle }) => {
  return (
    <>
      <div
        className={`${
          !toggle ? "hidden" : "flex"
        } absolute left-0 top-0 z-90 w-[40%] h-screen bg-[#08151E4D] bg-opacity-5 sidebar`}></div>
      <div
        className={`${
          !toggle ? "hidden" : "flex"
        } p-4 bg-white z-10 absolute -top-2 -right-4 mx-4 my-2 w-[60%] sm:text-lg h-screen sidebar shadow-lg`}>
        {toggle ? (
          <button
            onClick={() => setToggle(!toggle)}
            className={`w-[24px] h-[24px] object-contain ${
              toggle ? "absolute z-20 top-4 right-4" : "flex"
            }`}>
            {" "}
            <LiaTimesSolid size={26} />
          </button>
        ) : (
          <Image
            src={menu}
            alt='menu'
            className={`w-[24px] h-[24px] object-contain ${
              toggle ? "absolute z-20 top-4 right-4" : "flex"
            }`}
            onClick={() => setToggle(!toggle)}
          />
        )}
        <div className='flex flex-col items-end'>
          {" "}
          <NavLinks />
        </div>
      </div>
    </>
  );
};

const Welcome = (props) => {
  const { state } = UseAuthContext();
  const router = useRouter();
  const currentRoute = router.pathname;
  const isGrammarRoute = currentRoute.startsWith("/grammar/");
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div className='w-full h-full sm:h-[101px] bg-white text-black py-[18px] px-5 sm:px-[50px] flex justify-between gap-4 relative'>
      <div className='hidden sm:block'>
        <h1 className='text-lg md:text-[22px] font-semibold'>
          {currentRoute == "/platform"
            ? props.title + state?.user?.username + "!"
            : props.title}
        </h1>
        <p className='text-lg md:text-[18px] font-light'>{props.text}</p>
        {isGrammarRoute && (
          <>
            <h1 className='text-xl md:text-2xl font-semibold'>Grammar</h1>
            <p className='text-lg md:text-[18px] font-light'>
              Fluency begins with effort.
            </p>
          </>
        )}
      </div>
      <Link href='/platform' className='block sm:hidden'>
        <Image
          src='/assets/logo.png'
          alt='Tutotalk logo'
          width={158}
          height={24}
        />
      </Link>
      <div className='flex gap-3 justify-center items-center'>
        {" "}
        <button className='relative' onClick={() => setShow(!show)}>
          <span className='absolute -top-3 -right-3 text-accent bg-accent bg-opacity-20 rounded-full px-2 text-center'>
            {state.notifications &&
              state.notifications.length > 0 &&
              state.notifications.length}
          </span>
          <BsFillBellFill
            size={24}
            style={{ color: "#134462", cursor: "pointer" }}
          />
        </button>
        <Link
          href='/account'
          className='w-[48px] h-[48px]  rounded-full cursor-pointer hidden md:flex items-center'>
          {" "}
          <Image
            src={state.user?.image ? state.user?.image : "/assets/profile.svg"}
            width={30}
            height={30}
            alt='Avatar'
            className='rounded-full'
          />
        </Link>
        <Image
          src={menu}
          alt='menu'
          onClick={() => setToggle(!toggle)}
          className='md:hidden'
        />
      </div>
      {show && (
        <div className='w-[287px] h-[287px] bg-white rounded-xl absolute top-[70px] right-[10px] sm:top-[80px] sm:right-[100px] shadow-lg z-50'>
          <h2 className='text-center py-4 text-[18px]'>Notifications</h2>
          <p className='border-b border-[#3A7092]'></p>
          <ul className='px-5 mx-1 py-4 overflow-y-scroll'>
            {state.notifications &&
              state.notifications.length > 0 &&
              state.notifications.map((item, index) => (
                <Link href='/payments' key={index}>
                  {item}
                </Link>
              ))}
            <p className='border-b border-[#EBF5F8] py-2'></p>
          </ul>
        </div>
      )}
      <Links setToggle={setToggle} toggle={toggle} />
    </div>
  );
};

export default Welcome;
