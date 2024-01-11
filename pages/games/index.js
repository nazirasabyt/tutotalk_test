import Layout from "@/components/Shared/Layout";
import Link from "next/link";
import { sprint, flashcard, robot_transp } from "@/public/assets";
import Image from "next/image";

const index = () => {
  return (
    <Layout>
      <div className='flex flex-col items-center gap-5 mt-20 h-screen'>
        {/* <Link href='/games/talk' className='games_cards'>
          <h2 className='text-[18px] font-medium mb-6 sm:mb-[52px]'>
            Talk to AI
          </h2>
          <Image
            src={robot_transp}
            width={90}
            height={50}
            alt='Flashcard'
            className='bottom-0 absolute right-0'
          />
        </Link> */}

        <Link href='/games/sprint' className='games_cards'>
          <h2 className='text-[18px] font-medium mb-5'>Sprint Game</h2>

          <Image
            src={sprint}
            width={120}
            height={178}
            alt='Sprint'
            className='bottom-0 absolute right-0'
          />
        </Link>

        <Link href='/games/flashcards' className='games_cards'>
          <h2 className='text-[18px] font-medium mb-6 sm:mb-[52px]'>
            Flashcards
          </h2>

          <Image
            src={flashcard}
            width={110}
            height={155}
            alt='Flashcard'
            className='bottom-0 absolute right-0'
          />
        </Link>
      </div>
    </Layout>
  );
};

export default index;
