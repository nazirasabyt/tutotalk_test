import { useState } from "react";
import Controller from "./Chat/Controller";
import Instructions from "./Chat/Instructions";
import Link from "next/link";
import IconReturn from "../IconReturn";

const AItalk = () => {
  const [hasChosen, setChosen] = useState(false);
  const [topic, setTopic] = useState("");

  const handleChooseTopic = (e) => {
    setTopic(e.target.value);
    setChosen(true);
  };
  return (
    <div className='w-full h-screen mx-auto flex flex-col bg-[#F0F8FA]'>
      <Link
        href='/games'
        className='flex gap-2 pt-6 items-center w-[90%] mx-auto pl-6'>
        <IconReturn />
        <p className='text-[14px] font-medium'>Return</p>
      </Link>
      <div className='w-[90%] max-w-[1060px] mx-auto h-[600px] bg-white rounded-[20px] my-4 flex'>
        {!hasChosen ? (
          <div className='w-full flex flex-col justify-center items-center gap-[15px]'>
            <h2 className='text-center text-[20px] font-[Readex Pro] p-4'>
              Which English do you want to practice today?{" "}
            </h2>
            <button
              onClick={handleChooseTopic}
              value='general'
              className='btn_choose'>
              General
            </button>
            <button
              onClick={handleChooseTopic}
              value='business'
              className='btn_choose'>
              Business
            </button>
            <button
              onClick={handleChooseTopic}
              value='interview'
              className='btn_choose'>
              Interview
            </button>
          </div>
        ) : (
          <Controller topic={topic} />
        )}
        {!hasChosen && <Instructions />}
      </div>
    </div>
  );
};

export default AItalk;
