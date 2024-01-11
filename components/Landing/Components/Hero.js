import React from "react";
import { useIntl } from "react-intl";
import Image from "next/image";
import { hero } from "@/public/assets";
import Link from "next/link";

const Stats = () => {
  const intl = useIntl();
  const stats = intl.messages["stats"];
  return (
    <div className='gap-8 ss:gap-16 lg:gap-24 flex justify-evenly  w-full mx-auto items-center'>
      {stats.map((stat) => (
        <div
          key={stat.id}
          className='flex flex-col justify-center items-center sm:gap-3 text-xl ss:text-[32px]  xs:h-[72px]'>
          <h4 className='flex flex-col justify-center items-center sm:gap-3 text-xl  xs:h-[72px] ss:text-[32px]'>
            {stat.value}
          </h4>
          <p className='text-sm ss:text-lg sm:text-[24px] text-secondary items-stretch font-normal'>
            {stat.title}
          </p>
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  const intl = useIntl();

  const title = intl.formatMessage({ id: "hero.title" });
  const desc = intl.formatMessage({ id: "hero.desc" });
  const tryFree = intl.formatMessage({ id: "hero.button" });
  return (
    <div className='mt-4 md:mb-10 md:mt-10 grid grid-cols-1 md:grid-cols-2 md:gap-20'>
      <div className='flex flex-col items-center md:items-start justify-center gap-6 ss:gap-8'>
        <h1 className='text-center md:text-start text-[#08151E] text-[48px] font-medium  ss:text-[70px] md:text-[60px] lg:text-[70px] md:w-[644px] mt-10'>
          {title}
        </h1>
        <p className='text-center md:text-start text-xl sm:text-[26px] leading-9'>
          {desc}
        </p>
        <Link
          href='/trial'
          className='text-center py-3 px-6  rounded-xl bg-accent text-white text-[16px] leading-6  w-full ss:w-[136px] md:w-[180px] button md:text-2xl'>
          {tryFree}
        </Link>
      </div>
      <div className='md:ml-10'>
        {" "}
        <Image
          src={hero}
          width={544}
          height={439}
          alt='Hero'
          className='py-12 lg:py-4 xs:w-full md:w-[544] md:h-[439] lg:w-[644px] lg:h-[539px]'
        />
      </div>
    </div>
  );
};

export default Hero;
