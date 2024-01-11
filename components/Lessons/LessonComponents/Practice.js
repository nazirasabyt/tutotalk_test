import { useState } from "react";
import { GiNothingToSay } from "react-icons/gi";

const Practice = ({ practice }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    if (selectedCardIndex === index) {
      // If the clicked card is already selected, deselect it
      setSelectedCardIndex(null);
    } else {
      // Otherwise, select the clicked card
      setSelectedCardIndex(index);
    }
  };

  return (
    <div className='w-[90%] mx-auto'>
      <h1 className='text-[26px] text-bluePrimary font-semibold flex gap-2 justify-center items-center text-center'>
        <GiNothingToSay size={30} />
        Let's practice!
      </h1>
      <div className='flex flex-col backdrop: gap-4 justify-center items-center w-full h-full pt-5'>
        {practice.length !== 0 &&
          practice.map((item, index) => (
            <div
              key={index}
              className={`flip-container cursor-pointer ${
                index === selectedCardIndex ? "flip" : ""
              }`}
              onClick={() => handleCardClick(index)}>
              <div className='flipper bg-bluePrimary w-[270px] h-[150px] sm:w-[350px] sm:h-[160px] rounded-lg flex_row'>
                {index === selectedCardIndex ? (
                  <div className='flex flex-col gap-2 back'>
                    <h2 className='text-xl text-center text-white'>
                      {item.desc}
                    </h2>
                  </div>
                ) : (
                  <div className='front'>
                    <h2 className='text-xl sm:text-2xl text-center text-white'>
                      {item.text}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Practice;
