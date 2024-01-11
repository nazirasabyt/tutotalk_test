import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import UseProgressContext from "@/hooks/useProgressContext";
import { calculatePercentage } from "@/utils/helper";
import { useEffect, useState } from "react";

const Circle = ({ wordList }) => {
  const [percentage, setPecentage] = useState();
  const { state } = UseProgressContext();
  console.log(state);

  useEffect(() => {
    const percentage = calculatePercentage(
      state?.lessonsCompleted?.length && state?.lessonsCompleted?.length,
      20
    );
    setPecentage(percentage);
  }, []);

  return (
    <>
      {" "}
      <div className='w-[270px] h-[270px] mx-auto'>
        {" "}
        <CircularProgressbarWithChildren
          value={percentage ? percentage : 0}
          strokeWidth={6}
          styles={buildStyles({
            pathColor: `#50C878`,
            trailColor: "#D3E0E5",
          })}>
          <p className='text-[30px] font-medium text-center'>
            {percentage ? percentage : 0}%
          </p>
          {/* <p className='text-[18px]'>28/28</p> */}
        </CircularProgressbarWithChildren>
      </div>
      <div className='flex gap-5 pt-6 justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-[30px] font-medium'>
            {state.sprintAnswers ? state.sprintAnswers : 0}
            <span className='text-sm font-normal'>
              / {wordList?.length ? wordList?.length : 0}
            </span>
          </h2>
          <p>Words learned</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-[30px] font-medium'>
            {state.lessonsCompleted
              ? Object.keys(state.lessonsCompleted).length
              : 0}
            <span className='text-sm font-normal'>/ 20</span>
          </h2>
          <p>Lessons completed</p>
        </div>
      </div>
    </>
  );
};

export default Circle;
