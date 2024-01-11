import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  MdOutlineDashboardCustomize,
  MdOutlinePayment,
  MdOutlineMenuBook,
  MdOutlineModelTraining,
} from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { CgLogOut } from "react-icons/cg";
import { AiFillSchedule } from "react-icons/ai";
import UseAuthContext from "@/hooks/useAuthContext";
import { destroyCookie } from "nookies";
import { useIntl } from "react-intl";

export const NavLinks = () => {
  const router = useRouter();

  const { pathname } = router;

  const { dispatch } = UseAuthContext();
  const intl = useIntl();

  const dashboard = intl.formatMessage({ id: "dashboard" });
  const lessons = intl.formatMessage({ id: "lessons" });
  const progress = intl.formatMessage({ id: "progress" });
  const payments = intl.formatMessage({ id: "payments" });
  const grammar = intl.formatMessage({ id: "grammar" });
  const homework = intl.formatMessage({ id: "homework" });
  const logout = intl.formatMessage({ id: "logout" });
  const schedule = intl.formatMessage({ id: "schedule.h1" });

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    destroyCookie(null, "jwt");
    localStorage.removeItem("user");
    router.push("/");
  };

  const inactiveLink =
    "flex gap-1  px-2 items-center  text-md text-[#71797E] hover:text-secondary";
  const activeLink =
    " flex gap-1 bg-secondary w-[200px] h-[34px] items-center text-white rounded-xl px-2 text-md shadow-sm";
  return (
    <nav className='flex flex-col gap-4 text-lg font-light mt-[30px]'>
      <Link
        href='/platform'
        className={pathname === "/platform" ? activeLink : inactiveLink}>
        <MdOutlineDashboardCustomize size={26} />
        {dashboard}
      </Link>

      <Link
        href='/lessons'
        className={pathname.includes("/lessons") ? activeLink : inactiveLink}>
        <HiOutlineAcademicCap size={26} />
        {lessons}
      </Link>
      <Link
        href='/homework'
        className={pathname.includes("/homework") ? activeLink : inactiveLink}>
        {" "}
        <FaRegEdit size={24} />
        {homework}
      </Link>
      <Link
        href='/games'
        className={pathname.includes("/games") ? activeLink : inactiveLink}>
        {" "}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 15 15'
          fill='none'>
          <path
            d='M10.625 6.875C10.8375 6.875 11.0437 6.89375 11.25 6.925V2.5C11.25 1.8125 10.6875 1.25 10 1.25H2.5C1.8125 1.25 1.25 1.8125 1.25 2.5V12.5C1.25 13.1875 1.8125 13.75 2.5 13.75H7.0375C6.57969 13.0944 6.31044 12.3259 6.25903 11.5279C6.20763 10.73 6.37604 9.93324 6.74595 9.22435C7.11586 8.51547 7.6731 7.9216 8.35703 7.50738C9.04097 7.09315 9.82541 6.87443 10.625 6.875ZM3.75 6.875V2.5H6.875V6.875L5.3125 5.9375L3.75 6.875Z'
            fill={`${pathname.includes("/games") ? "#fff" : "#71797E"}`}
          />
          <path
            d='M10.625 8.125C8.9 8.125 7.5 9.525 7.5 11.25C7.5 12.975 8.9 14.375 10.625 14.375C12.35 14.375 13.75 12.975 13.75 11.25C13.75 9.525 12.35 8.125 10.625 8.125ZM9.84375 12.8125V9.6875L12.3438 11.25L9.84375 12.8125Z'
            fill={`${pathname.includes("/games") ? "#fff" : "#71797E"}`}
          />
        </svg>
        Practice
      </Link>
      <Link
        href='/schedule'
        className={pathname.includes("/schedule") ? activeLink : inactiveLink}>
        <AiFillSchedule size={24} />
        {schedule}
      </Link>
      <Link
        href='/progress'
        className={pathname.includes("/progress") ? activeLink : inactiveLink}>
        <GiProgression size={24} />
        {progress}
      </Link>
      {/* <Link
        href='/payments'
        className={pathname.includes("/payments") ? activeLink : inactiveLink}>
        <MdOutlinePayment size={26} />
        {payments}
      </Link> */}
      <Link
        href='/grammar'
        className={pathname.includes("/grammar") ? activeLink : inactiveLink}>
        <MdOutlineMenuBook size={26} />
        {grammar}
      </Link>
      <Link
        href='/'
        className='flex gap-1 p-2 absolute bottom-5 hover:text-orangePrimary'
        onClick={() => logOut()}>
        <CgLogOut size={26} />
        {logout}
      </Link>
    </nav>
  );
};
