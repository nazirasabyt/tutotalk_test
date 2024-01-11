import { useState, useRef, useEffect } from "react";

const Vocabulary = ({ el }) => {
  const wordList = el.vocabulary?.map((item) => item.word) || [];
  const [shuffledItems, setShuffledItems] = useState(wordList);
  const [list, setList] = useState(el.vocabulary);
  const [dragging, setDragging] = useState(false);
  const [points, setPoints] = useState(0);

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
          const newText = item.question.replace("____", currentWord);

          return { ...item, question: newText };
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
    // Check if data exists in localStorage and initialize if not
    const storedShuffledItems = localStorage.getItem(`shuffledItemsLess`);
    const storedList = localStorage.getItem(`list`);

    if (storedShuffledItems && storedList) {
      setShuffledItems(JSON.parse(storedShuffledItems));
      setList(JSON.parse(storedList));
    } else {
      // Initialize shuffledItems and list
      const shuffledArray = [...wordList];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      setShuffledItems(shuffledArray);
      setList(el.vocabulary);
    }

    // Set up your audio elements (you can do this outside of this effect)
    const correctAudio = document.getElementById("correctAudio");
    const incorrectAudio = document.getElementById("wrongAudio");
    setCorrectAudio(correctAudio);
    setIncorrectAudio(incorrectAudio);
  }, []);

  useEffect(() => {
    // Save shuffledItems and list to localStorage whenever they change
    localStorage.setItem(`shuffledItemsLess`, JSON.stringify(shuffledItems));
    localStorage.setItem(`list`, JSON.stringify(list));
  }, [shuffledItems, list]);

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
    <>
      {el.vocabulary && (
        <div className='flex flex-col gap-3 my-4 text-lg'>
          <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3'>
            {shuffledItems.length > 0 ? (
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
              <></>
            )}
          </div>
          <div className='flex flex-col gap-6 my-5'>
            {list.map((item, sentIdx) => (
              <div
                key={sentIdx}
                className='bg-white p-1'
                onDrop={(e) => handleDrop(e, item.id)}
                onDragOver={(e) => e.preventDefault()}>
                <p>
                  <span>{sentIdx + 1}. </span>
                  {renderQuestionWithHighlights(item.question)}
                </p>

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
      )}
    </>
  );
};

export default Vocabulary;
