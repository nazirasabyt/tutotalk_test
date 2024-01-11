import Link from "next/link";
import React, { useState } from "react";
import {
  IoPlayCircleOutline,
  IoPlayBackOutline,
  IoPlayForwardOutline,
  IoPauseCircleSharp,
} from "react-icons/io5";

const AudioComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div>
      <Link href='/homework'>go back</Link>

      <h1 className='text-2xl'>Audio</h1>
      <p>Practise your Listening skills</p>
      <div className=' flex flex-col gap-4 '>
        <h2>Listen and answer the questions</h2>
        <div className='bg-black w-[400px] h-40 rounded-md flex flex-col justify-center items-center text-white gap-4'>
          <p className='text-white'>name</p>
          <div>line</div>
          <div className='flex gap-4'>
            <button>
              <IoPlayBackOutline size={26} />
            </button>
            <button>
              {" "}
              {isPlaying ? (
                <IoPauseCircleSharp size={26} />
              ) : (
                <IoPlayCircleOutline size={26} />
              )}
            </button>

            <button>
              <IoPlayForwardOutline size={26} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioComponent;
