import React, { useState, useEffect } from "react";
import UseProgressContext from "@/hooks/useProgressContext";
import { useIntl } from "react-intl";
import { calculatePercentage } from "@/utils/helper";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Choose({ grammarTask }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { state, dispatch } = UseProgressContext();

  const intl = useIntl();

  const router = useRouter();
  const { id } = router.query;

  const p = intl.formatMessage({ id: "grammar.p" });
  const back = intl.formatMessage({ id: "back" });
  const scored = intl.formatMessage({ id: "grammar.scored" });
  const correct = intl.formatMessage({ id: "correct.answers" });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(id));

    if (savedData && savedData.grammarPoints) {
      dispatch({ type: "SET_DATA", payload: savedData });
      setShowResult(true);
    }
  }, [id]);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption.correct) {
      setScore(score + 1);
    }
    setSelectedOption(selectedOption);
    setTimeout(nextQuestion, 1000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < grammarTask.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
      const percentage = calculatePercentage(score + 1, grammarTask.length);
      dispatch({
        type: "SET_DATA",
        payload: { ...state.data, id, grammarPoints: percentage },
      });

      const storedObj = JSON.parse(localStorage.getItem(id));

      if (storedObj) {
        const updatedObject = { ...storedObj };
        updatedObject.grammarPoints = percentage;
        localStorage.setItem(id, JSON.stringify(updatedObject));
      } else {
        const obj = {
          vocabularyPoints: "",
          grammarPoints: percentage,
          readingPoints: "",
          esse: "",
        };
        localStorage.setItem(id, JSON.stringify(obj));
      }
    }
  };

  return (
    <div className='homework_tab sm:mb-[80px] text-lg'>
      <div className='flex_row'>
        <Image
          src='/assets/grammar.jpg'
          alt='Vocabulary'
          width={400}
          height={200}
        />
      </div>
      {showResult && state.data.grammarPoints ? (
        <div className='sm:my-10 flex flex-col gap-4 justify-center items-center'>
          <h2>Grammar Quiz Completed!</h2>
          <p>
            {/* Your score: {score}/{grammarTask.length} */}
            Your score: {state.data.grammarPoints + "%"}
          </p>
          {/* <button
            className='bg-primary text-white rounded-lg py-1 px-4 w-1/3'
            onClick={resetQuiz}>
            Restart Quiz
          </button> */}
        </div>
      ) : (
        <div>
          <div className={`justify-center items-center gap-2`}>
            <p className='text-bluePrimary font-medium py-5'> {p}</p>
          </div>
          <div className='flex flex-col justify-center items-center mt-6 p-2'>
            <h2 className='mb-6 text-center text-xl'>
              Question {currentQuestionIndex + 1}
            </h2>
            <p>{grammarTask[currentQuestionIndex].question}</p>
            <ul className='flex flex-col justify-center mt-4'>
              {grammarTask[currentQuestionIndex].answers.map(
                (answer, index) => (
                  <li
                    key={index}
                    onClick={() => handleAnswerClick(answer)}
                    className='text-white  cursor-pointer w-auto py-1 px-4 sm:py-2 sm:px-5  m-4 bg-bluePrimary  button hover:bg-opacity-80 rounded-full'
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedOption === answer
                          ? answer.correct
                            ? "green"
                            : "red"
                          : "",
                    }}>
                    {answer.text}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
