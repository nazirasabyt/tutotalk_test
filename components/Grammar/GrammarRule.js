import Link from "next/link";
import IconReturn from "../Homework/IconReturn";

const GrammarRule = ({ data }) => {
  return (
    <div className='w-[95%] sm:w-[94%] mx-auto bg-white mt-10 h-full rounded-xl p-4 sm:p-10'>
      <Link href='/grammar' className='flex gap-2 pb-6 items-center'>
        <IconReturn />
        <p className='text-[14px] font-medium'>Grmmar List</p>
      </Link>
      {data.map((item, index) => (
        <div className='flex flex-col gap-4 sm:text-lg' key={index}>
          <div className='w-[95%] sm:w-[70%] mx-auto h-[200px] sm:h-[300px]  my-10 flex justify-center items-center'>
            {/* <video controls width='600' height='500'>
              <source src={item.link} type='video/mp4' />
              Your browser does not support the video tag.
            </video> */}
            <iframe
              width='600'
              height='400'
              src={`https://www.youtube.com/embed/${item.link}`}
              frameborder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowfullscreen></iframe>
          </div>{" "}
          <h2 className='text-center text-lg sm:text-2xl py-4 text-primary'>
            {item.title}
          </h2>
          <p>{item.text}</p>
          <div className='flex flex-col gap-5 border bg-[#EBF5F8] p-2 sm:p-5 rounded-lg'>
            {item.table.map((el) => (
              <div className='flex  gap-5'>
                {" "}
                <p>{el.key}</p>
                <div className='flex flex-col justify-end items-end'>
                  <p>{el.word} </p>
                  {el.link && (
                    <Link
                      href={`/grammar/${item.id}/${el.link}`}
                      className='text-blue-300 font-light'>
                      узнать больше
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          <h2>Вот несколько примеров:</h2>
          {item.examples.map((ex) => (
            <p>{ex}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GrammarRule;
