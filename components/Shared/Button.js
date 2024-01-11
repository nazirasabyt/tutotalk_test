"use client";
import { useState } from "react";

const Button = (props) => {
  const [title, setTitle] = useState(props.title);

  const onSubmit = (e) => {
    e.preventDefault();
    props.callback();
  };

  return (
    <div>
      <input
        type='submit'
        onClick={onSubmit}
        value={title}
        className='w-full h-16 transition-all duration-700 ease-in bg-orange-600 rounded cursor-pointer hover:bg-orange-400'
      />
    </div>
  );
};

export default Button;
