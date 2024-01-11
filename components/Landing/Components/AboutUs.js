import { dashboard, robot, robot_transp } from "@/public/assets";
import Image from "next/image";
import { useIntl } from "react-intl";

const AboutUs = () => {
  const intl = useIntl();

  const section = intl.formatMessage({ id: "us.section" });
  const desc = intl.formatMessage({ id: "us.desc" });
  const desc2 = intl.formatMessage({ id: "us.desc2" });
  const span = intl.formatMessage({ id: "us.span" });
  const one = intl.formatMessage({ id: "us.title.start" });
  const two = intl.formatMessage({ id: "us.title.end" });
  return (
    <div className='flex flex-col justify-center items-center gap-10 relative mb-10 md:my-10'>
      <div className='flex flex-col md:flex-row justify-center items-center gap-10'>
        <div className='flex flex-col justify-center items-center gap-2'>
          {" "}
          <p className='bg-accent2 py-2 px-5 text-primary rounded-xl mb-3 uppercase'>
            {section}
          </p>
          <h2 className='text-2xl text-center leading-9 font-medium mb-8 text-[#08151E] md:w-[500px]'>
            {one}
          </h2>
          <p className='text-center text-xl md:text-2xl mb-6 text-[#08151E] md:w-[600px]'>
            {" "}
            {two}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
