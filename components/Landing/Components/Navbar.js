import { useState } from "react";
import { logo, menu } from "@/public/assets";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { LiaTimesSolid } from "react-icons/lia";

const Links = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const { locale } = useRouter();
  const changeTo = locale === "en" ? "ru" : "en";

  const intl = useIntl();
  const login = intl.formatMessage({ id: "nav.login" });
  const navlinks = intl.messages["nav.links"];
  const register = intl.formatMessage({ id: "nav.register" });

  return (
    <div className='md:hidden flex flex-1 justify-end items-center text-lg'>
      <div className='w-full'>
        {" "}
        <Image src={menu} alt='menu' onClick={() => setToggle(!toggle)} />
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } absolute left-0 top-0 z-10 w-[40%] h-[100%] bg-[#08151E4D] bg-opacity-5 sidebar`}></div>
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-white  absolute -top-2 -right-4 mx-4 my-2 w-[60%] sm:text-lg h-[100%] sidebar`}>
          {toggle ? (
            <button
              onClick={() => setToggle(!toggle)}
              className={`w-[24px] h-[24px] object-contain ${
                toggle ? "absolute z-20 top-4 right-4" : "flex"
              }`}>
              {" "}
              <LiaTimesSolid />
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
          <div className='flex flex-col'>
            {" "}
            <ul className='list-none flex items-start flex-col mt-3'>
              {navlinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-accent" : "text-text"
                  } ${index === navlinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => setActive(nav.title)}>
                  <Link href={`#${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
            </ul>
            <div className='flex flex-col justify-start gap-2 w-full items-start absolute bottom-[50px] '>
              <Link href='/' locale={changeTo}>
                <button className='font-semibold text-[20px]  text-bluePrimary rounded-lg  pr-3 ss:hidden flex'>
                  <Image
                    src={`${
                      locale === "ru" ? "/assets/ru.png" : "/assets/us.png"
                    }`}
                    width={22}
                    height={22}
                    alt='Flags'
                  />
                </button>
              </Link>
              <Link
                href='/login'
                className='ss:hidden flex justify-center items-center  py-2 px-6 w-[80%] rounded-xl border border-primary text-primary text-sm font-normal hover:text-accent'>
                {login}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [active, setActive] = useState("");
  const { locale } = useRouter();
  const changeTo = locale === "en" ? "ru" : "en";
  const intl = useIntl();
  const login = intl.formatMessage({ id: "nav.login" });
  const navlinks = intl.messages["nav.links"];
  const register = intl.formatMessage({ id: "nav.register" });
  return (
    <nav className='bg-white py-3 px-4 rounded-xl flex justify-between  items-stretch'>
      <Link href='/' className='flex justify-center items-center'>
        <Image
          src={logo}
          alt='tutotalk'
          className='w-[144px] h-[28px] cursor-pointer '
        />
      </Link>

      <div className='flex justify-center items-center gap-[10px]'>
        <ul className=' hidden md:flex justify-center items-center gap-6 text-[16px]'>
          {navlinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === nav.title
                  ? "text-primary"
                  : "text-text md:text-lg hover:text-accent"
              } `}
              onClick={() => setActive(nav.title)}>
              <Link href={`#${nav.id}`}>{nav.title}</Link>
            </li>
          ))}
        </ul>{" "}
        <Link href='/' locale={changeTo}>
          <button className='font-semibold text-[20px]  text-bluePrimary rounded-lg  items-center pr-3 hidden ss:flex'>
            <Image
              src={`${locale === "ru" ? "/assets/ru.png" : "/assets/us.png"}`}
              width={22}
              height={22}
              alt='Flags'
            />
          </button>
        </Link>
        <Link
          href='/login'
          className='hidden ss:flex py-[10px] px-6 rounded-xl border bg-primary text-white text-[16px] font-normal hover:text-accent hover:animate-pulse'>
          {login}
        </Link>
        <Links />
      </div>
    </nav>
  );
};

export default Navbar;
