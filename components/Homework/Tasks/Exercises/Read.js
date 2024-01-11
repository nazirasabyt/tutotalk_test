import React, { useState, useRef, useEffect } from "react";
import UseProgressContext from "@/hooks/useProgressContext";
import { useIntl } from "react-intl";
// import { calculatePercentage } from "@/utils/helper";
import Image from "next/image";
import { useRouter } from "next/router";

const Read = ({ readQuiz, readText }) => {
  const { state, dispatch } = UseProgressContext();
  const [points, setPoints] = useState(0);
  const answerRef = useRef();
  const splitedText = readText.split("\n");
  const [correctAudio, setCorrectAudio] = useState();
  const [incorrectAudio, setIncorrectAudio] = useState();
  const intl = useIntl();
  const [completed, setCompleted] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const calculatePercentage = (correctAnswers, totalQuestions) => {
    return (correctAnswers / totalQuestions) * 100;
  };

  const p = intl.formatMessage({ id: "grammar.p" });
  const back = intl.formatMessage({ id: "back" });
  const scored = intl.formatMessage({ id: "grammar.scored" });
  const correct = intl.formatMessage({ id: "correct.answers" });

  const handleAnswer = (e, indx, answer) => {
    const chosenValue = e.target.innerHTML;
    answerRef.current = answer;
    const currentAnswer = answerRef.current.toString();

    if (currentAnswer == chosenValue) {
      e.target.classList.add("correct");
      localStorage.setItem("class", "correct");
      setPoints(points + 1); // Increment points if the answer is correct
      playAudio(correctAudio);
    } else {
      e.target.classList.add("wrong");
      playAudio(incorrectAudio);
    }

    if (indx === readQuiz.length - 1) {
      // Set the state to indicate all questions have been answered
      setAllQuestionsAnswered(true);
    }

    // Resetting answerRef.current to null after checking for last question
    answerRef.current = null;
  };

  // const handleAnswer = (e, indx, answer) => {
  //   const chosenValue = e.target.innerHTML;
  //   const isCorrect = answer.toString() === chosenValue;

  //   if (isCorrect) {
  //     e.target.classList.add("correct");
  //     localStorage.setItem("class", "correct");
  //     setPoints((prevPoints) => prevPoints + 1); // Update points using callback
  //     playAudio(correctAudio);
  //   } else {
  //     e.target.classList.add("wrong");
  //     playAudio(incorrectAudio);
  //   }

  //   // Check if it's the last question
  //   if (indx === readQuiz.length - 1) {
  //     setTimeout(() => {
  //       setCompleted(true);
  //     }, 1000);
  //   }
  // };

  // New useEffect to handle score calculation and dispatch when points or readQuiz.length change
  // useEffect(() => {
  //   if (completed && readQuiz.length > 0) {
  //     const percentage = calculatePercentage(points, readQuiz.length);

  //     dispatch({
  //       type: "SET_DATA",
  //       payload: { ...state.data, id, readingPoints: percentage },
  //     });

  //     const storedObj = JSON.parse(localStorage.getItem(id));
  //     if (storedObj) {
  //       const updatedObject = { ...storedObj, readingPoints: percentage };
  //       localStorage.setItem(id, JSON.stringify(updatedObject));
  //     } else {
  //       const obj = {
  //         vocabularyPoints: "",
  //         grammarPoints: "",
  //         readingPoints: percentage,
  //         esse: "",
  //       };
  //       localStorage.setItem(id, JSON.stringify(obj));
  //     }
  //   }
  // }, [id]);

  useEffect(() => {
    if (allQuestionsAnswered && readQuiz.length > 0) {
      const percentage = calculatePercentage(points, readQuiz.length);

      // Your dispatch logic and localStorage update

      dispatch({
        type: "SET_DATA",
        payload: { ...state.data, id, readingPoints: percentage },
      });

      const storedObj = JSON.parse(localStorage.getItem(id));
      if (storedObj) {
        const updatedObject = { ...storedObj, readingPoints: percentage };
        localStorage.setItem(id, JSON.stringify(updatedObject));
      } else {
        const obj = {
          vocabularyPoints: "",
          grammarPoints: "",
          readingPoints: percentage,
          esse: "",
        };
        localStorage.setItem(id, JSON.stringify(obj));
      }
    }
  }, [allQuestionsAnswered, id]);

  function playAudio(audioElement) {
    audioElement.play();
  }

  useEffect(() => {
    const correctAudio = document.getElementById("correctAudio");
    const incorrectAudio = document.getElementById("wrongAudio");
    setCorrectAudio(correctAudio);
    setIncorrectAudio(incorrectAudio);
  }, [points]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(id));

    if (savedData && savedData.readingPoints) {
      dispatch({ type: "SET_DATA", payload: savedData });
      setAllQuestionsAnswered(true);
    }
  }, [id]);

  return (
    <div className='homework_tab'>
      <div className='flex_row'>
        <Image
          src='/assets/read.jpg'
          alt='Vocabulary'
          width={400}
          height={200}
        />
      </div>
      <h2 className='text-bluePrimary font-medium py-5'>
        3. Read the text and answer the questions below.
      </h2>
      <div className='bg-accent bg-opacity-40 rounded-lg p-2 sm:p-6 leading-[36px]'>
        {" "}
        {splitedText.map((text, index) => (
          <p key={index} className='text-[16px] sm:text-lg'>
            {text}
          </p>
        ))}
      </div>
      {allQuestionsAnswered && state.data.readingPoints ? (
        <div className='my-10'>
          <h1 className='text-2xl text-gradient font-semibold text-center'>
            {scored}
            <span className='px-2'>{state.data.readingPoints + "%"}</span>
            {correct}
          </h1>
        </div>
      ) : (
        <div className='flex flex-col gap-2 pt-8 sm:text-xl'>
          {" "}
          {readQuiz.map((item, indx) => (
            <div
              key={item.id}
              className='flex flex-col sm:flex-row gap-2 sm:items-center justify-between'>
              {" "}
              <p className='py-3 sm:w-[70%] w-full'>{item.question}</p>
              <div className='flex gap-2 sm:text-xl'>
                {" "}
                <button
                  id={`${item.id}`}
                  className={`h-8 bg-dimWhite py-1 px-4
                rounded-md button`}
                  onClick={(e) => handleAnswer(e, indx, item.correct)}>
                  true
                </button>
                <button
                  id={`${item.id}`}
                  className={`h-8 bg-dimWhite py-1 px-4
                rounded-md button`}
                  onClick={(e) => handleAnswer(e, indx, item.correct)}>
                  false
                </button>
                <audio id='correctAudio'>
                  <source src='/assets/correct.mp3' type='audio/mpeg' />
                </audio>
                <audio id='wrongAudio'>
                  <source src='/assets/error.mp3' type='audio/mpeg' />
                </audio>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Read;
