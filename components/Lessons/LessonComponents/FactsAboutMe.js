import React from "react";

const FactsAboutMe = ({ el }) => {
  return (
    <div className='mt-4 grid grif-cols-1 text-gray-800'>
      {" "}
      {el.factsAboutMe &&
        el.factsAboutMe.map((pic) => (
          <div key={pic.id}>
            {" "}
            <p className='py-2 text-[16px] sm:text-lg'>{pic.question}</p>
            {pic.options ? (
              <>
                <h2 className='text-gradient'>Options:</h2>
                {pic.options.map((option, index) => (
                  <p key={index} className='py-2'>
                    - {option}
                  </p>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        ))}
      {el.pastTopic &&
        el.pastTopic.map((pic) => (
          <div key={pic.id}>
            {" "}
            <p className='py-2 text-[16px] sm:text-lg'>{pic.question}</p>
          </div>
        ))}
    </div>
  );
};

export default FactsAboutMe;
