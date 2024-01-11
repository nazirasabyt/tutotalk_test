import React, { useState } from "react";
import StartSprint from "./StartSprint";
import UseHomeworkContext from "@/hooks/useHomeworkContext";
import { useIntl } from "react-intl";
import Link from "next/link";
import IconReturn from "../IconReturn";

const Sprint = () => {
  const [level, setLevel] = useState();
  const [start, setStart] = useState(false);
  const {
    state: { wordList },
  } = UseHomeworkContext();
  const intl = useIntl();

  const span = intl.formatMessage({ id: "speed.span" });
  const p = intl.formatMessage({ id: "speed.p" });
  const choose = intl.formatMessage({ id: "speed.choose" });
  const easy = intl.formatMessage({ id: "easy" });
  const medium = intl.formatMessage({ id: "medium" });
  const hard = intl.formatMessage({ id: "hard" });
  const noWords = intl.formatMessage({ id: "noWords" });
  const sprint = intl.formatMessage({ id: "sprint" });
  const startTranslation = intl.formatMessage({ id: "start" });

  const handleChooseLevel = (e) => {
    setLevel(e.target.value);
    setStart(true);
  };

  return (
    <div className='w-full h-screen mx-auto flex flex-col bg-[#F0F8FA] relative'>
      <Link
        href='/games'
        className='flex gap-2 py-6 items-center w-[90%] mx-auto absolute pl-6 z-10'>
        <IconReturn />
        <p className='text-[14px] font-medium'>Sprint</p>
      </Link>
      {start ? (
        <StartSprint level={level} />
      ) : (
        <div className='w-full sm:w-[533px] py-20 mx-auto flex flex-col justify-center items-center'>
          {wordList ? (
            <div className='w-full flex flex-col justify-center items-center text-center gap-6 px-4'>
              <p className='sm:text-lg'>{p}</p>
              <p className='text-lg text-[20px] text-center font-medium'>
                {choose}
              </p>
              <div className='flex flex-col  gap-6 justify-center items-center'>
                <button
                  onClick={handleChooseLevel}
                  value='easy'
                  className='btn_choose'>
                  Easy
                </button>
                <button
                  onClick={handleChooseLevel}
                  value='medium'
                  className='btn_choose'>
                  Medium
                </button>
                <button
                  onClick={handleChooseLevel}
                  value='hard'
                  className='btn_choose'>
                  Hard
                </button>
              </div>
            </div>
          ) : (
            <p className='text-xl text-bluePrimary text-center px-2'>
              {noWords}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Sprint;
