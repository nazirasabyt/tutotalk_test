import React from "react";

const Card = (props) => {
  return (
    <div className='flex justify-between items-center'>
      <div className=' flex gap-2'>
        <h2 className='w-[70px] h-[70px] rounded-full bg-secondary text-white text-[22px] flex justify-center items-center'>
          {" "}
          {props.percentage}
        </h2>
        <h2 className='text-[18px] self-center'>{props.title}</h2>
      </div>
      <p className='text-[16px]'>
        {props.text}
        <span className='font-medium'> {props.num}</span>
      </p>
    </div>
  );
};

export default Card;
