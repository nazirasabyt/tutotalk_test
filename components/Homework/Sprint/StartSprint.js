import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import UseProgressContext from "@/hooks/useProgressContext";
import UseHomeworkContext from "@/hooks/useHomeworkContext";
import { useIntl } from "react-intl";
import { calculatePercentage } from "@/utils/helper";

const StartSprint = ({ level }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [color, setColor] = useState("#FFEA00");
  const [flyIn, setFlyIn] = useState(false);
  const correctAudio = document.getElementById("correctAudio");
  const incorrectAudio = document.getElementById("wrongAudio");

  const intl = useIntl();

  const noWords = intl.formatMessage({ id: "noWords" });
  const levelTranslation = intl.formatMessage({ id: "level" });
  const wrong = intl.formatMessage({ id: "wrong" });
  const right = intl.formatMessage({ id: "right" });
  const pointsTranslation = intl.formatMessage({ id: "points" });

  const { dispatch } = UseProgressContext();
  const {
    state: { wordList },
  } = UseHomeworkContext();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (level === "easy") {
        return setTimeLeft(timeLeft - 10);
      }
      if (level === "medium") {
        return setTimeLeft(timeLeft - 20);
      }
      if (level === "hard") {
        return setTimeLeft(timeLeft - 30);
      }
    }, 1000);

    if (timeLeft == 0) {
      setCurrentWordIndex((currentWordIndex) => currentWordIndex + 1);
      setTimeLeft(120);
    }
    if (currentWordIndex == wordList.length) {
      setTimeLeft(null);
      const percentage = calculatePercentage(points, wordList.length);

      dispatch({
        type: "SPRINT",
        payload: percentage,
      });
      dispatch({
        type: "SPRINT_ANSWERS",
        payload: points,
      });

      localStorage.setItem("sprintPoints", JSON.stringify(percentage));
      localStorage.setItem("sprintAnswers", JSON.stringify(points));
    }

    return () => clearInterval(intervalId);
  }, [timeLeft, level]);

  const seconds = timeLeft % 120;

  const handleClickCorrect = () => {
    if (wordList[currentWordIndex].correct === true) {
      setPoints(points + 1);
      setColor("#90EE90");
      playAudio(correctAudio);
      setFlyIn(true);
    } else {
      setColor("#d0342c");
      playAudio(incorrectAudio);
    }
    setTimeout(() => {
      setFlyIn(false);
      setColor("#FFEA00");
    }, 1000);
    setCurrentWordIndex((currentWordIndex) => currentWordIndex + 1);
    setTimeLeft(120);
  };

  const handleClickWrong = () => {
    if (wordList[currentWordIndex].correct === false) {
      setPoints(points + 1);
      setColor("#90EE90");
      playAudio(correctAudio);

      setFlyIn(true);
    } else {
      setColor("#d0342c");
      playAudio(incorrectAudio);
    }
    setTimeout(() => {
      setFlyIn(false);
      setColor("#FFEA00");
    }, 1000);
    setTimeLeft(120);
    setCurrentWordIndex((currentWordIndex) => currentWordIndex + 1);
  };

  function playAudio(audioElement) {
    audioElement.play();
  }

  return (
    <div className='flex flex-col justify-center items-center py-20'>
      {currentWordIndex == wordList.length && points > wordList.length - 1 && (
        <Image
          src='/assets/confetti.png'
          width={800}
          height={300}
          alt='Confetti'
          className='absolute top-0 left-0 w-full'
        />
      )}
      {wordList ? (
        <>
          <div className='w-[350px] sm:w-[500] lg:w-[600]  h-[350px] sm:h-[500] lg:h-[600] bg-white rounded-full'>
            {" "}
            <CircularProgressbarWithChildren
              value={seconds}
              strokeWidth={4}
              styles={buildStyles({
                pathColor: `${color}`,
                trailColor: "#D3E1E5",
              })}>
              {" "}
              <div className='flex justify-center gap-4 '>
                <h1 className='flex flex-col text-center text-sm text-grey-dark'>
                  <span className='text-2xl text-black font-Dela'>
                    {levelTranslation}{" "}
                  </span>
                  {level}
                </h1>
                <div className='self-center  sm:border-r-2 h-8 mx-2 border-grey-dark'></div>

                <div
                  className={`number-container ${flyIn ? "animate-fly" : ""}`}>
                  <h1 className='flex flex-col text-center text-sm text-grey-dark'>
                    <span className='text-2xl text-black font-Dela'>
                      {points}
                    </span>
                    {pointsTranslation}
                  </h1>
                </div>
              </div>
              <div className='flex flex-col justify-center items-center mt-8'>
                <Image
                  src='/assets/stars.png'
                  alt='Stars'
                  width={88}
                  height={26}
                />{" "}
                {currentWordIndex == wordList.length ? (
                  <h1 className='mt-8 text-2xl text-green-600 font-semibold'>
                    {pointsTranslation}: {points}
                  </h1>
                ) : (
                  <>
                    {" "}
                    <h1 className='text-xl font-semibold sm:text-1xl lg:text-2xl  mt-4'>
                      {wordList[currentWordIndex].word}
                    </h1>
                    <h1 className='text-xl font-semibold sm:text-1xl lg:text-2xl  text-cyan-dark'>
                      {" "}
                      {wordList[currentWordIndex].option}
                    </h1>
                    <audio id='correctAudio'>
                      <source src='/assets/correct.mp3' type='audio/mpeg' />
                    </audio>
                    <audio id='wrongAudio'>
                      <source src='/assets/error.mp3' type='audio/mpeg' />
                    </audio>
                  </>
                )}
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </>
      ) : (
        <p>{noWords}</p>
      )}
      <div className='flex mt-10 gap-2'>
        <button
          className='py-[11px] px-[33px] bg-secondary text-white rounded-[10px] w-[124px]'
          onClick={handleClickWrong}>
          false
        </button>
        <button
          className='py-[11px] px-[33px] bg-secondary text-white rounded-[10px] w-[124px]'
          onClick={handleClickCorrect}>
          true
        </button>
      </div>
    </div>
  );
};

export default StartSprint;
