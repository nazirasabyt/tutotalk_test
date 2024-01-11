import { phone } from "@/public/assets";
import Image from "next/image";
import { useIntl } from "react-intl";

const Steps = () => {
  const intl = useIntl();

  const stepsSection = intl.formatMessage({ id: "steps.title.start" });
  const titleStart = intl.formatMessage({ id: "steps.desc" });
  const stepOne = intl.formatMessage({ id: "stepOne" });
  const stepTwo = intl.formatMessage({ id: "stepTwo" });
  const stepThree = intl.formatMessage({ id: "stepThree" });
  const stepFour = intl.formatMessage({ id: "stepFour" });

  return (
    <div
      id='steps'
      className='flex flex-col md:flex-row justify-center items-center md:my-10'>
      <div className='flex justify-end items-end'>
        {" "}
        <Image
          src={phone}
          alt='Steps'
          width={329}
          height={409}
          className='rounded-xl  hidden lg:block'
        />
      </div>

      <div className='flex justify-center items-center flex-col mb-6 '>
        <h2 className='text-2xl text-text font-medium leading-9 text-center'>
          {titleStart}
        </h2>
        <div className='flex items-center  mt-6 gap-4  text-[16px]  ss:text-lg sm:text-[24px]  '>
          <p className='bg-primary rounded-xl text-white w-[50px] h-[46px] flex justify-center items-center'>
            1.
          </p>
          <p className='w-[252px] ss:w-[644px] md:w-full'>{stepOne}</p>
        </div>
        <div className='flex items-center  mt-6 gap-4  text-[16px]  ss:text-lg sm:text-[24px] md:ml-[40px]'>
          <p className='bg-primary rounded-xl text-white w-[50px] h-[46px] flex justify-center items-center'>
            2.
          </p>
          <p className='w-[252px] ss:w-[644px]'>{stepTwo}</p>
        </div>
        <div className='flex items-center  mt-6 gap-4  text-[16px]  ss:text-lg sm:text-[24px] md:ml-[180px]'>
          <p className='bg-primary rounded-xl text-white w-[50px] h-[46px] flex justify-center items-center'>
            3.
          </p>
          <p className='w-[252px] ss:w-[644px]'>{stepThree}</p>
        </div>
        <div className='flex items-center  mt-6 gap-4  text-[16px]  ss:text-lg sm:text-[24px] md:ml-[300px]'>
          <p className='bg-primary rounded-xl text-white w-[50px] h-[46px] flex justify-center items-center'>
            4.
          </p>
          <p className='w-[252px] ss:w-[644px]'>{stepFour}</p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
