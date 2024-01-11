import { useIntl } from "react-intl";
import Link from "next/link";

const Price = () => {
  const intl = useIntl();

  const self_title = intl.formatMessage({ id: "self.title" });
  const self_plan = intl.messages["self_plan"];
  const group_title = intl.formatMessage({ id: "group.title" });
  const group_plan = intl.messages["group_plan"];
  const personal_title = intl.formatMessage({ id: "personal.title" });
  const personal_plan = intl.messages["personal_plan"];
  const plan_per = intl.messages["plan_per"];

  const btnStyle = "flex justify-center items-center";
  const divStyle =
    "flex flex-col justify-between p-4  my-4 rounded-lg hover:scale-105 duration-300  w-[360px] h-[500px]";
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  gap-8'>
      <Link href='https://alvo.chat/2dfX' className={`bg-white ${divStyle}`}>
        <div>
          {" "}
          <h2 className='text-xl font-semibold text-center pt-6 border-b'>
            {self_title}
          </h2>
          <p className='text-center text-2xl  font-semibold py-2'> 900 som</p>
          <p className='text-secondary text-center'>{plan_per}</p>
        </div>
        <div className=''>
          {self_plan.map((el, idex) => (
            <div className='flex justify-start gap-2 py-[5px]' key={idex}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'>
                <rect width='24' height='24' rx='12' fill='#134462' />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M17.096 7.39016L9.93602 14.3002L8.03602 12.2702C7.68602 11.9402 7.13602 11.9202 6.73602 12.2002C6.34602 12.4902 6.23602 13.0002 6.47602 13.4102L8.72602 17.0702C8.94602 17.4102 9.32601 17.6202 9.75601 17.6202C10.166 17.6202 10.556 17.4102 10.776 17.0702C11.136 16.6002 18.006 8.41016 18.006 8.41016C18.906 7.49016 17.816 6.68016 17.096 7.38016V7.39016Z'
                  fill='white'
                />
              </svg>
              <p key={el.id} className='text-[17px] text-secondary'>
                {el.text}
              </p>
            </div>
          ))}
        </div>
        <div className={btnStyle}>
          <button className='w-[270px] py-[13px] bg-bluePrimary rounded-[10px] text-white'>
            Pay
          </button>
        </div>
      </Link>
      <Link
        href='https://alvo.chat/2dfX'
        className={`bg-accent1 bg-opacity-10   ${divStyle}`}>
        <div>
          {" "}
          <h2 className='text-xl font-semibold text-center pt-6 border-b'>
            {group_title}
          </h2>
          <p className='text-center text-2xl  font-semibold py-2'>4000 som</p>
          <p className='text-secondary text-center'>{plan_per}</p>
        </div>
        <div className=''>
          {group_plan.map((el, idx) => (
            <div className='flex justify-start gap-2 py-[5px]' key={idx}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'>
                <rect width='24' height='24' rx='12' fill='white' />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M17.096 7.39016L9.93602 14.3002L8.03602 12.2702C7.68602 11.9402 7.13602 11.9202 6.73602 12.2002C6.34602 12.4902 6.23602 13.0002 6.47602 13.4102L8.72602 17.0702C8.94602 17.4102 9.32601 17.6202 9.75601 17.6202C10.166 17.6202 10.556 17.4102 10.776 17.0702C11.136 16.6002 18.006 8.41016 18.006 8.41016C18.906 7.49016 17.816 6.68016 17.096 7.38016V7.39016Z'
                  fill='#08151E'
                />
              </svg>
              <p key={el.id} className='text-[17px] text-secondary'>
                {el.text}
              </p>
            </div>
          ))}
        </div>
        <div className={btnStyle}>
          {" "}
          <button className='w-[270px] py-[13px] bg-white rounded-[10px]'>
            Pay
          </button>
        </div>
      </Link>{" "}
      <Link
        href='https://alvo.chat/2dfX'
        className={`bg-bluePrimary  text-white ${divStyle}`}>
        <div>
          {" "}
          <h2 className='text-xl font-semibold text-center pt-6 border-b'>
            {personal_title}
          </h2>
          <p className='text-center text-2xl  font-semibold py-2'>7500 som</p>
          <p className='text-[#D4DEE1] text-center'>{plan_per}</p>
        </div>
        <div className=''>
          {personal_plan.map((el, index) => (
            <div className='flex justify-start gap-2 py-[5px]' key={index}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'>
                <rect width='24' height='24' rx='12' fill='#D4DEE1' />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M17.096 7.39016L9.93602 14.3002L8.03602 12.2702C7.68602 11.9402 7.13602 11.9202 6.73602 12.2002C6.34602 12.4902 6.23602 13.0002 6.47602 13.4102L8.72602 17.0702C8.94602 17.4102 9.32601 17.6202 9.75601 17.6202C10.166 17.6202 10.556 17.4102 10.776 17.0702C11.136 16.6002 18.006 8.41016 18.006 8.41016C18.906 7.49016 17.816 6.68016 17.096 7.38016V7.39016Z'
                  fill='#134462'
                />
              </svg>
              <p key={el.id} className='text-[17px] text-white'>
                {el.text}
              </p>
            </div>
          ))}
        </div>
        <div className='flex justify-center items-center my-3'>
          {" "}
          <button className='w-[270px] py-[13px] bg-white rounded-[10px] text-bluePrimary'>
            Pay
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Price;
