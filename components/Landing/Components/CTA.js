import { useIntl } from "react-intl";
import Link from "next/link";

const CTA = () => {
  const intl = useIntl();

  const desc = intl.formatMessage({ id: "cta.desc" });
  const title = intl.formatMessage({ id: "cta.title" });
  const button = intl.formatMessage({ id: "cta.button" });
  return (
    <div className='bg-white my-5 w-full h-[300px] text-primary rounded-xl p-4 ss:hidden flex flex-col justify-center items-start gap-6 shadow-md'>
      <h3 className='text-2xl font-medium'>{title}</h3>
      <p className='text-primary'>{desc}</p>
      <Link
        href='/trial'
        className='py-3 px-6 bg-accent rounded-xl w-full sm:w-[250px] text-center'>
        {button}
      </Link>
    </div>
  );
};

export default CTA;
