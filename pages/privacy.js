import React from "react";
import { useIntl } from "react-intl";

const Privacy = () => {
  const intl = useIntl();

  const privacyInfo = intl.messages["privacy"];
  return (
    <div className='w-full  mx-auto bg-white py-6 px-6'>
      {privacyInfo.map((item, index) => (
        <div key={index}>
          {" "}
          <strong>{item.title && item.title}</strong>
          <p className='text-grey-dark my-4'>{item.text}</p>{" "}
        </div>
      ))}{" "}
    </div>
  );
};

export default Privacy;
