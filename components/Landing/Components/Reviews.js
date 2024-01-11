import { anna, arman } from "@/public/assets";
import Image from "next/image";
import { useIntl } from "react-intl";

const Reviews = () => {
  const intl = useIntl();

  const reviewsSec = intl.formatMessage({ id: "reviews.section" });
  const reviewTitle = intl.formatMessage({ id: "reviews.title" });
  const comment1 = intl.messages["reviews.comments1"];
  const comment2 = intl.messages["reviews.comments2"];
  return (
    <div
      id='reviews'
      className='flex flex-col  justify-center items-center my-14'>
      <h2 className='text-2xl font-medium'>{reviewTitle}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='p-4 flex flex-col border border-accent2 rounded-xl gap-6 mt-6 bg-white'>
          <p className=' mt-2 ss:text-xl'>{comment1}</p>
          <div className='mt-8 flex gap-2 items-center'>
            <Image
              src={anna}
              alt='User Image'
              width={48}
              height={48}
              className='rounded-full'
            />
            <h2 className='text-xl font-semibold text-primary'>Anna</h2>
          </div>
        </div>
        <div className='p-4 flex flex-col border border-accent2 rounded-xl gap-6 mt-6 bg-white'>
          <p className='sm:text-xl mt-2'>{comment2}</p>
          <div className='mt-4 flex gap-2 items-center'>
            <Image
              src={arman}
              alt='User Image'
              width={48}
              height={48}
              className='rounded-full object-fill'
            />
            <h2 className='text-xl font-semibold text-primary'>Arman</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
