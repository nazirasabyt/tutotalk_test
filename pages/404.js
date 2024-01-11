import Layout from "@/components/Shared/Layout";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <Layout>
      <div className='bg-[#EBF5F8] h-screen flex flex-col  items-center pt-10'>
        <Image
          src='/assets/notfound.png'
          width={232}
          height={111}
          alt='Not found'
          className='sm:w-[675px] sm:h-[426]'
        />
        <h2 className='text-[30px] font-bold py-1'>Error!</h2>
        <p>Page not found.</p>
        <Link
          href='/platform'
          className='bg-[#3F7EA5] py-2 px-5 text-white rounded-xl mt-4'>
          Go home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
