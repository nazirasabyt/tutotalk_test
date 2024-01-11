import { useIntl } from "react-intl";

const Pain = () => {
  const intl = useIntl();

  const whyus = intl.formatMessage({ id: "whyus.section" });
  const title = intl.formatMessage({ id: "whyus.title" });
  const featureTitle1 = intl.formatMessage({ id: "feature.title" });
  const featureContent1 = intl.formatMessage({ id: "feature.content" });
  const featureTitle2 = intl.formatMessage({ id: "feature.title2" });
  const featureContent2 = intl.formatMessage({ id: "feature.content2" });
  const featureTitle3 = intl.formatMessage({ id: "feature.title3" });
  const featureContent3 = intl.formatMessage({ id: "feature.content3" });
  const featureTitle4 = intl.formatMessage({ id: "feature.title4" });
  const featureContent4 = intl.formatMessage({ id: "feature.content4" });

  return (
    <div
      id='pain'
      className='flex flex-col justify-center items-center gap-3 py-6'>
      <div
        className='grid grid-cols-1 ss:grid-cols-2  gap-8 ss:mt-4
      '>
        <div className='flex flex-col gap-6'>
          <h2 className='text-[22px] font-semibold items-stretch'>
            {featureTitle1}
          </h2>
          <p className='text-xl'>{featureContent1}</p>
        </div>
        <div className='  flex flex-col gap-6'>
          <h2 className='text-[22px] font-semibold items-stretch'>
            {featureTitle2}
          </h2>
          <p className='text-xl'>{featureContent2}</p>
        </div>
        <div className='  flex flex-col gap-6'>
          <h2 className='text-[22px] font-semibold items-stretch'>
            {featureTitle3}
          </h2>
          <p className='text-xl'>{featureContent3}</p>
        </div>
        <div className='  flex flex-col gap-6'>
          <h2 className='text-[22px] font-semibold items-stretch'>
            {featureTitle4}
          </h2>
          <p className='text-xl'>{featureContent4}</p>
        </div>
      </div>
    </div>
  );
};

export default Pain;
