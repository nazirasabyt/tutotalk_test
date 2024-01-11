import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "./NavLinks";

const Navigation = () => {
  return (
    <>
      <aside className='hidden px-5 md:block fixed right-0 md:left-0 top-0 h-full w-[240px] bg-white  overflow-y-auto shadow-lg'>
        <Link
          href='/platform'
          className='hidden sm:flex gap-1  my-[38px] mx-3 pr-6'>
          <Image
            src='/assets/logo.png'
            alt='Tutotalk logo'
            width={158}
            height={24}
          />
        </Link>
        <div className='border-b border-[#3F7EA5] bg-opacity-60 w-[200]'></div>
        <NavLinks />
      </aside>
    </>
  );
};

export default Navigation;
