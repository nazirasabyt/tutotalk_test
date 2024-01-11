import Image from "next/image";
import { logo, apple, google1, google2, google3 } from "@/public/assets";
import { useIntl } from "react-intl";
import { socialMedia } from "@/utils/constants";
import Link from "next/link";

const Footer = () => {
  const intl = useIntl();

  const footerLinks = intl.messages["footer.links"];
  const footerMap = intl.messages["footer.map"];
  const copyright = intl.formatMessage({ id: "copyright" });
  const constctsMes = intl.formatMessage({ id: "footer.contacts" });
  return (
    <div
      id='contacts'
      className='py-10 flex flex-col ss:flex-row ss:gap-4 w-full'>
      {" "}
      <div className='lg:w-1/3'>
        <Image src={logo} alt='Logo' width={144} height={28} />
        <p className='text-primary py-6 w-full ss:w-[156px] lg:w-full'>
          {copyright}
        </p>
        <div className='flex ss:flex-col lg:flex-row gap-4'>
          <Image src={apple} alt='Apple store' width={135} height={40} />
          <div className='border border-primary rounded-[5px] w-[135px] h-[40px] relative'>
            <Image
              src={google3}
              alt='Google store'
              width={23}
              height={25}
              className='absolute top-2 left-1'
            />
            <Image
              src={google1}
              alt='Google store'
              width={38}
              height={6}
              className='absolute left-8 top-2'
            />
            <Image
              src={google2}
              alt='Google store'
              width={84}
              height={17}
              className='absolute left-8 bottom-1'
            />
          </div>
        </div>
      </div>
      <div className='my-8 ss:my-0 flex flex-row ss:flex-col lg:flex-row gap-8 text-primary ss:w-1/3'>
        {/* <ul className='flex flex-col gap-4 w-full ss:items-end md:text-lg'>
          <h2 className='text-xl font-semibold'>{footerMap.title}</h2>
          {footerMap.links.map((link, index) => (
            <li key={index} className='cursor-pointer hover:text-accent'>
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
        </ul> */}
        <ul className='flex flex-col gap-4 w-full  ss:items-end md:text-lg'>
          <h2 className='text-xl font-semibold'>{footerLinks.title}</h2>
          {footerLinks.links.map((link, index) => (
            <li key={index} className='cursor-pointer hover:text-accent'>
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className='text-primary flex flex-col ss:items-end ss:w-1/3'>
        <h2 className='text-xl font-semibold'>{constctsMes}</h2>
        <p className='py-4 md:text-lg '>team@tutotalk.com</p>
        <div className='flex gap-6'>
          {socialMedia.map((social, index) => (
            <Link href={social.link} key={index} className='cursor-pointer'>
              {" "}
              <Image
                src={social.icon}
                alt={social.id}
                className={`w-[24px] h-[24px] object-contain cursor-pointer hover:animate-pulse`}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
