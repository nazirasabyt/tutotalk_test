import { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useRouter } from "next/router";

function Title({ setMessages }) {
  const [isResetting, setIsResetting] = useState(false);
  const router = useRouter();

  // Reset conversation

  const resetConversation = async () => {
    setIsResetting(true);

    setMessages([]);
    router.reload();

    setIsResetting(false);
  };

  return (
    <div className='flex justify-between items-center w-full p-6 bg-dimWhite text-bluePrimary font-bold shadow'>
      <Link href='/homework'>
        <IoIosArrowDropleftCircle size={30} style={{ color: "#134462" }} />
      </Link>
      <h1 className='text-2xl'>Let's talk!</h1>
      <button
        onClick={resetConversation}
        className={
          "transition-all duration-300 text-bluePrimary hover:text-orangePrimary " +
          (isResetting && "animate-pulse")
        }>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
          />
        </svg>
      </button>
    </div>
  );
}

export default Title;
