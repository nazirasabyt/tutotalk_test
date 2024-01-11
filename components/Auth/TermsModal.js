import React from "react";
import { useIntl } from "react-intl";

const TermsModal = ({ close }) => {
  const intl = useIntl();
  const terms = intl.messages["terms.list"];
  const link = intl.formatMessage({ id: "terms.link" });
  const title = intl.formatMessage({ id: "terms.title" });

  return (
    <div className='w-full  mx-auto bg-white py-6 px-6 absolute top-0 left-0 z-100'>
      {close && (
        <p className='text-4xl  ' onClick={close}>
          &times;
        </p>
      )}
      <strong className='mt-10'>{title}</strong>{" "}
      {terms.map((term) => (
        <p className='mb-8 text-grey-dark mt-10' key={term.id}>
          {term.text}
        </p>
      ))}
    </div>
  );
};

export default TermsModal;
