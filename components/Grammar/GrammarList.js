import Link from "next/link";
import { grammar } from "../../utils/constants";
import Image from "next/image";

const GrammarList = () => {
  const card =
    "w-[337px] h-full bg-white rounded-[18px] py-[25px] px-[30px] border";
  const example = "bg-accent  py-2 px-4 rounded-[10px] ";

  return (
    <div className='flex h-screen rounded-[20px] py-10 px-6 sm:px-[50px]  overflow-y-scroll'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10'>
        {" "}
        {grammar.map((item) => (
          <Link href={`/grammar/${item.id}`} key={item.id} className={card}>
            {/* <div>
              <Image
                src='/assets/alphabet.jpg'
                width={330}
                height={40}
                alt='Grammar Topic'
              />
            </div> */}
            <h4 className='text-blue-500 font-semibold text-lg text-start'>
              {item.title}
            </h4>
            <p className='mt-2 mb-[10px]'>{item.text}</p>
            <button className={example}>Start Learning</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GrammarList;
