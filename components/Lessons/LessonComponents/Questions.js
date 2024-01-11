import React from "react";

const Questions = ({ el, page }) => {
  return (
    <div className='mt-4 text-lg flex flex-col text-gray-800'>
      {" "}
      {page === 1 &&
        el.goals?.map((pic) => (
          <div key={pic.id}>
            {" "}
            <p className='py-2 text-[16px] sm:text-lg'>{pic.goal}</p>
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
    </div>
  );
};

export default Questions;
