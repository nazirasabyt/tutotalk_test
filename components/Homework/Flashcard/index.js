import React, { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import UseHomeworkContext from "@/hooks/useHomeworkContext";
import axios from "axios";
import { message } from "antd";
import Link from "next/link";
import IconReturn from "../IconReturn";

const Flashcards = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [meanings, setMeanings] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const {
    state: { wordList },
  } = UseHomeworkContext();
  const intl = useIntl();
  const audioRef = useRef(null);

  const next = intl.formatMessage({ id: "next" });
  const back = intl.formatMessage({ id: "back" });
  const noWords = intl.formatMessage({ id: "noWords" });
  const flashcard = intl.formatMessage({ id: "flashcard" });
  const wrongMes = intl.formatMessage({ id: "wrongMes" });

  const handleCardClick = () => {
    // toggleAudio();
    setShow((current) => !current);
  };

  const increaseWordIndex = () => {
    setCurrentWordIndex(
      (currentWordIndex) => (currentWordIndex + 1) % wordList.length
    );
  };

  // const dictionaryApi = async () => {
  //   try {
  //     const data = await axios.get(
  //       `https://api.dictionaryapi.dev/api/v2/entries/en/${wordList[currentWordIndex].word}`
  //     );

  //     if (data) {
  //       setMeanings(data.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     message.error(wrongMes);
  //   }
  // };

  // const toggleAudio = () => {
  //   if (audioRef.current) {
  //     if (isPlaying) {
  //       audioRef.current.pause();
  //     } else {
  //       audioRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  // useEffect(() => {
  //   dictionaryApi();
  // }, [currentWordIndex]);

  return (
    <div className='w-full h-screen mx-auto flex flex-col bg-[#F0F8FA]'>
      <Link
        href='/games'
        className='flex gap-2 py-6 items-center w-[90%] mx-auto'>
        <IconReturn />
        <p className='text-[14px] font-medium'>Flashcards</p>
      </Link>
      {wordList ? (
        <div className='flex flex-col justify-center items-center gap-10  mt-3 sm:h-[600px] rounded-xl'>
          <div
            className={`flip-container cursor-pointer  ${show ? "flip" : ""}`}
            onClick={handleCardClick}>
            <div className='flipper bg-primary text-white w-[320px] h-[200px] sm:w-[500px] sm:h-[300px] rounded-lg flex_row'>
              {show ? (
                <div className='flex gap-2  back'>
                  <h2 className='text-xl sm:text-[30px] text-center'>
                    {wordList[currentWordIndex].word}
                  </h2>
                </div>
              ) : (
                <div className='front'>
                  <h2 className='text-xl sm:text-[30px] text-center'>
                    {wordList[currentWordIndex].translation}
                  </h2>
                </div>
              )}
            </div>
          </div>
          <div className='flex gap-4'>
            <button
              className=''
              disabled={currentWordIndex < 1 || isButtonDisabled}
              onClick={() => setCurrentWordIndex(currentWordIndex - 1)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='21'
                height='21'
                viewBox='0 0 21 21'
                fill='none'>
                <rect
                  width='21'
                  height='21'
                  rx='10.5'
                  transform='matrix(-1 0 0 1 21 0)'
                  fill='#CFE9EF'
                />
                <path
                  d='M12 6L8 10.5L12 15'
                  stroke='#3A7092'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </button>
            <p className='self-center text-[14px]'>
              {currentWordIndex + 1}/{wordList.length}
            </p>
            <button
              className=''
              onClick={increaseWordIndex}
              disabled={isButtonDisabled}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='21'
                height='21'
                viewBox='0 0 21 21'
                fill='none'>
                <rect width='21' height='21' rx='10.5' fill='#CFE9EF' />
                <path
                  d='M9 6L13 10.5L9 15'
                  stroke='#3A7092'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </button>
          </div>
          <div className='flex flex-col gap-6 w-full mt-6'>
            {/* <h2 className='text-2xl text-center font-semibold text-gradient'>
              {meanings[0] && meanings[0].phonetic}
            </h2> */}
            {/* {meanings[0] && (
              <audio
                ref={audioRef}
                src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
                className='rounded-md  w-full'>
                Your browser doesn't support audio.
              </audio>
            )} */}
          </div>
        </div>
      ) : (
        <p className='text-xl text-bluePrimary text-center px-2'>{noWords}</p>
      )}
    </div>
  );
};

export default Flashcards;
