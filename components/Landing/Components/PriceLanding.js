import { useIntl } from "react-intl";
import Price from "@/components/Shared/Price";

const PriceLanding = () => {
  const intl = useIntl();

  const paymentSec = intl.formatMessage({ id: "payment.section" });
  const plan_title = intl.formatMessage({ id: "plan_title" });

  return (
    <div
      className='flex flex-col justify-center items-center my-8'
      id='payments'>
      <h1 className='text-center text-2xl font-medium text-black items-stretch mt-3'>
        {plan_title}
      </h1>
      <Price />
    </div>
  );
};

export default PriceLanding;
