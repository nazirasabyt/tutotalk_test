import React, { useState, useRef, useEffect } from "react";
import UseProgressContext from "@/hooks/useProgressContext";
import { calculatePercentage } from "@/utils/helper";
import { useRouter } from "next/router";

const DragNDrop = ({ wordList, vocabularyTask }) => {
  const { state, dispatch } = UseProgressContext();
  const [shuffledItems, setShuffledItems] = useState(wordList);
  const [list, setList] = useState(vocabularyTask);
  const [dragging, setDragging] = useState(false);
  const [isPageCompleted, setIsPageCompleted] = useState(false);
  const [points, setPoints] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  const [correctAudio, setCorrectAudio] = useState();
  const [incorrectAudio, setIncorrectAudio] = useState();

  const dragItem = useRef();
  const dragNode = useRef();
  const dragWord = useRef();

  const handleOnDrag = (e, item, wordIdx) => {
    e.dataTransfer.setData("item", item);
    dragItem.current = wordIdx;
    dragNode.current = e.target;
    dragWord.current = item;

    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    setDragging(false);

    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    const currentIndex = dragItem.current;
    const currentWord = dragWord.current;
    if (currentWord == id) {
      const updatedItems = shuffledItems.filter((_, i) => i !== currentIndex);
      setShuffledItems(updatedItems);
      const updatedList = list.map((item) => {
        if (item.id === id) {
          const newText = item.sentence.replace("____", currentWord);

          return { ...item, sentence: newText };
        }
        return item;
      });

      setList(updatedList);
      playAudio(correctAudio);
      const newPoints = points + 1;
      setPoints(newPoints);
    } else {
      playAudio(incorrectAudio);
    }
  };

  const getStyles = (wordIdx) => {
    const currentItem = dragItem.current;
    if (currentItem === wordIdx) {
      return "bg-[#69b9ce] bg-opacity-10 text-[#69b9ce] text-opacity-10";
    }
    return "";
  };
  useEffect(() => {
    // Check if the current page's task is completed
    const savedData = JSON.parse(localStorage.getItem(id));
    if (savedData && savedData.vocabularyPoints) {
      setIsPageCompleted(true);
    }
  }, [id]);

  useEffect(() => {
    if (shuffledItems.length == 0) {
      const percentage = calculatePercentage(points, wordList.length);

      dispatch({
        type: "SET_DATA",
        payload: { ...state.data, id, vocabularyPoints: percentage },
      });

      const storedObj = JSON.parse(localStorage.getItem(id));

      if (storedObj) {
        const updatedObject = { ...storedObj };
        updatedObject.vocabularyPoints = percentage;
        localStorage.setItem(id, JSON.stringify(updatedObject));
      } else {
        const obj = {
          vocabularyPoints: percentage,
          grammarPoints: "",
          readingPoints: "",
          esse: "",
        };
        localStorage.setItem(id, JSON.stringify(obj));
      }
      setIsPageCompleted(true);
    }
  }, [shuffledItems]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(id));
    if (savedData) {
      dispatch({ type: "SET_DATA", payload: savedData });
    }

    const correctAudio = document.getElementById("correctAudio");
    const incorrectAudio = document.getElementById("wrongAudio");
    setCorrectAudio(correctAudio);
    setIncorrectAudio(incorrectAudio);

    const shuffledArray = [...shuffledItems];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    setShuffledItems(shuffledArray);
  }, []);

  function playAudio(audioElement) {
    audioElement.play();
  }

  const renderQuestionWithHighlights = (question) => {
    const words = question.split(" ");
    return words.map((word, index) => {
      const isHighlighted = wordList.includes(word);
      return (
        <span
          key={index}
          className={
            isHighlighted
              ? "bg-green-300 p-1 rounded-md m-1 text-green-700"
              : ""
          }>
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <div className='flex flex-col gap-3 my-4'>
      <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3'>
        {!isPageCompleted ? (
          shuffledItems.map((item, wordIdx) => (
            <div
              key={wordIdx}
              className={`px-4 py-1 bg-dimWhite shadow-sm cursor-pointer ${
                dragging ? getStyles(wordIdx) : ""
              } `}
              draggable
              onDragStart={(e) => handleOnDrag(e, item, wordIdx)}>
              {item}
            </div>
          ))
        ) : (
          <p className='text-accent'>Well done!</p>
        )}
      </div>
      <div className='flex flex-col gap-6 mt-5'>
        {list.map((item, sentIdx) => (
          <div
            key={sentIdx}
            className='bg-white p-1'
            onDrop={
              !isPageCompleted ? (e) => handleDrop(e, item.id) : undefined
            }
            onDragOver={
              !isPageCompleted ? (e) => e.preventDefault() : undefined
            }>
            {!isPageCompleted ? (
              <p>
                <span>{sentIdx + 1} .</span>
                {renderQuestionWithHighlights(item.sentence)}
              </p>
            ) : (
              <p className=''>{item.answer}</p>
            )}
            <audio id='correctAudio'>
              <source src='/assets/correct.mp3' type='audio/mpeg' />
            </audio>
            <audio id='wrongAudio'>
              <source src='/assets/error.mp3' type='audio/mpeg' />
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragNDrop;
