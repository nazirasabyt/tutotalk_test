import Link from "next/link";
import { sprint, flashcard } from "@/public/assets";
import Image from "next/image";
const Lessons = () => {
  return (
    <div className='dashboard_card h-[265px] flex flex-col sm:flex-row gap-6'>
      <div className=' bg-white sm:w-[240px] sm:h-[265px] rounded-3xl py-[25px] px-[30px] relative'>
        <h2 className='text-[18px] font-medium mb-5'>Sprint Game</h2>
        <Link href='/games/sprint'>
          <Image
            src={sprint}
            width={240}
            height={278}
            alt='Sprint'
            className='bottom-0 absolute right-0 hidden sm:block'
          />
          <Image
            src={sprint}
            width={120}
            height={178}
            alt='Sprint'
            className='bottom-0 absolute right-0 block sm:hidden'
          />
        </Link>
      </div>
      <div className='bg-white sm:w-[240px] sm:h-[265px] rounded-3xl py-[25px] px-[30px] relative '>
        <h2 className='text-[18px] font-medium mb-6 sm:mb-[52px]'>
          Flashcards
        </h2>
        <Link href='/games/flashcards'>
          <Image
            src={flashcard}
            width={110}
            height={155}
            alt='Flashcard'
            className='bottom-0 absolute right-0 block sm:hidden '
          />
          <Image
            src={flashcard}
            width={210}
            height={255}
            alt='Flashcard'
            className='bottom-0 absolute right-0 hidden sm:block'
          />
        </Link>
      </div>
    </div>
  );
};

export default Lessons;
