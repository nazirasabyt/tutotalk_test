// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { FaChevronUp } from "react-icons/fa";
// import { useIntl } from "react-intl";
// import { Disclosure } from "@headlessui/react";

// const data = {
//   words: ["I", "love", "coffee", "He", "likes", "apple"],
//   sentence: ["I love coffee"],
// };

// function MakeSentence() {
//   const [currentDataIndex, setCurrentDataIndex] = useState(0);
//   const [words, setWords] = useState(data);
//   const [sentence, setSentence] = useState([]);

//   const onWordClick = (index) => {
//     const newSentence = [...sentence, data.words[index]];
//     setSentence(newSentence);
//     if (sentence == data.includes(data.sentence)) {
//       console.log(sentence);
//     }
//   };

//   const resetGame = () => {
//     setWords("");
//     setSentence([]);
//     shuffleWords();
//   };

//   return (
//     <>
//       <Image
//         priority
//         src='/assets/make_sentence.svg'
//         width={437}
//         height={200}
//         className='mx-auto'
//         alt='Lesson header'
//       />
//       <a
//         className='text-xs text-dimWhite'
//         href='https://www.freepik.com/free-vector/partners-holding-big-jigsaw-puzzle-pieces_7732651.htm#page=3&position=16&from_view=author'>
//         Image by pch.vector on Freepik
//       </a>{" "}
//       <h2 className='instruction'>Form a sentence.</h2>
//       <div className='underline'></div>
//       <div className='flex flex-wrap gap-3'>
//         {data.words.map((word, index) => (
//           <p
//             className='bg-secondary text-white p-3 rounded-sm cursor-pointer'
//             onClick={() => onWordClick(index)}
//             key={index}>
//             {word}
//           </p>
//         ))}
//       </div>
//       <div className='mt-5 '>
//         {sentence.map((word, index) => (
//           <span
//             key={index}
//             // className={`${isCorrect ? "text-green-300" : "text-red-300"}`}
//           >
//             {word}{" "}
//           </span>
//         ))}
//       </div>
//       <button className='reset-button' onClick={resetGame}>
//         Reset Game
//       </button>
//     </>
//   );
// }

// export default MakeSentence;

// import React, { useState } from "react";
// import Image from "next/image";

// const data = {
//   words: ["I", "love", "coffee", "He", "likes", "apple"],
//   sentence: ["I", "love", "coffee"],
// };

// function MakeSentence() {
//   const [sentence, setSentence] = useState([]);
//   const [remainingWords, setRemainingWords] = useState(data.words);

//   const onWordClick = (word) => {
//     const newSentence = [...sentence, word];
//     setSentence(newSentence);
//     // Check if the new sentence matches the expected sentence
//     if (JSON.stringify(newSentence) === JSON.stringify(data.sentence)) {
//       console.log("Congratulations! You formed the correct sentence.");
//     }
//   };

//   const resetGame = () => {
//     setSentence([]);
//     setRemainingWords(data.words);
//   };

//   const shuffleWords = () => {
//     // Create a shuffled copy of the words array and set it to remainingWords
//     const shuffledWords = [...data.words].sort(() => Math.random() - 0.5);
//     setRemainingWords(shuffledWords);
//   };

//   return (
//     <>
//       <Image
//         priority
//         src='/assets/make_sentence.svg'
//         width={437}
//         height={200}
//         className='mx-auto'
//         alt='Lesson header'
//       />
//       <a
//         className='text-xs text-dimWhite'
//         href='https://www.freepik.com/free-vector/partners-holding-big-jigsaw-puzzle-pieces_7732651.htm#page=3&position=16&from_view=author'>
//         Image by pch.vector on Freepik
//       </a>{" "}
//       <h2 className='instruction'>Form a sentence.</h2>
//       <div className='underline'></div>
//       <div className='flex flex-wrap gap-3'>
//         {remainingWords.map((word, index) => (
//           <p
//             className='bg-secondary text-white p-3 rounded-sm cursor-pointer'
//             onClick={() => onWordClick(word)}
//             key={index}>
//             {word}
//           </p>
//         ))}
//       </div>
//       <div className='mt-5 font-semibold'>
//         {sentence.map((word, index) => (
//           <span key={index}>{word} </span>
//         ))}
//       </div>
//       <button className='reset-button' onClick={resetGame}>
//         Reset Game
//       </button>
//     </>
//   );
// }

// export default MakeSentence;

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { FaChevronUp } from "react-icons/fa";
// import { useIntl } from "react-intl";

// const sentences = [
//   ["I", "love", "coffee"],
//   ["He", "likes", "apple"],
//   ["She", "enjoys", "reading"],
//   // Add more correct sentences here
// ];

// function MakeSentence() {
//   const [userSentences, setUserSentences] = useState(sentences.map(() => []));
//   const [remainingWords, setRemainingWords] = useState(
//     sentences.map((sentence) => [])
//   );
//   const [feedback, setFeedback] = useState(sentences.map(() => ""));

//   useEffect(() => {
//     // Shuffle the words for each sentence at the start
//     const shuffledWords = sentences.map((sentence) =>
//       [...sentence].sort(() => Math.random() - 0.5)
//     );
//     setRemainingWords(shuffledWords);
//   }, []);

//   const onWordClick = (word, sentenceIndex) => {
//     const newUserSentences = [...userSentences];
//     const newUserSentence = [...userSentences[sentenceIndex], word];
//     newUserSentences[sentenceIndex] = newUserSentence;
//     setUserSentences(newUserSentences);

//     if (isCorrectSentence(newUserSentence, sentences[sentenceIndex])) {
//       const newFeedback = [...feedback];
//       newFeedback[sentenceIndex] = "Correct!";
//       setFeedback(newFeedback);
//     } else {
//       const newFeedback = [...feedback];
//       newFeedback[sentenceIndex] = "Not correct";
//       setFeedback(newFeedback);
//     }
//   };

//   const resetGame = () => {
//     setUserSentences(sentences.map(() => []));
//     setFeedback(sentences.map(() => ""));
//   };

//   const isCorrectSentence = (userSentence, correctSentence) => {
//     return JSON.stringify(userSentence) === JSON.stringify(correctSentence);
//   };

//   return (
//     <>
//       <Image
//         priority
//         src='/assets/make_sentence.svg'
//         width={437}
//         height={200}
//         className='mx-auto'
//         alt='Lesson header'
//       />
//       <h2 className='instruction'>Form a sentence.</h2>
//       <div className='underline mb-10'></div>
//       {sentences.map((correctSentence, sentenceIndex) => (
//         <div key={sentenceIndex} className='flex gap-4'>
//           <div className='flex flex-wrap gap-3 py-2'>
//             {remainingWords[sentenceIndex].map((word, index) => (
//               <p
//                 className='bg-secondary text-white py-2 px-3 rounded-sm cursor-pointer'
//                 onClick={() => onWordClick(word, sentenceIndex)}
//                 key={index}>
//                 {word}
//               </p>
//             ))}
//           </div>
//           <div>
//             {" "}
//             <div className='mt-5 font-semibold'>
//               {userSentences[sentenceIndex].map((word, index) => (
//                 <span key={index}>{word} </span>
//               ))}
//             </div>
//             <div>{feedback[sentenceIndex]}</div>
//           </div>
//         </div>
//       ))}
//       <button
//         className='bg-accent text-white py-2 px-5 rounded-md mt-5 cursor-pointer'
//         onClick={resetGame}>
//         Reset
//       </button>
//     </>
//   );
// }

// export default MakeSentence;

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { GrPowerReset } from "react-icons/gr";

// const sentences = [
//   ["I", "love", "coffee", "a lot"],
//   ["He", "likes", "apple", "a lot"],
//   ["She", "enjoys", "reading", "a lot"],
//   // Add more correct sentences here
// ];

// function MakeSentence() {
//   const [userSentences, setUserSentences] = useState(sentences.map(() => []));
//   const [remainingWords, setRemainingWords] = useState(
//     sentences.map((sentence) => [...sentence].sort(() => Math.random() - 0.5))
//   );
//   const [feedback, setFeedback] = useState(sentences.map(() => ""));

//   useEffect(() => {
//     // Shuffle the words for each sentence at the start
//     const shuffledWords = sentences.map((sentence) =>
//       [...sentence].sort(() => Math.random() - 0.5)
//     );
//     setRemainingWords(shuffledWords);
//   }, []);

//   const onWordClick = (word, sentenceIndex) => {
//     if (feedback[sentenceIndex] === "Correct!") {
//       // If the sentence is already correct, do nothing
//       return;
//     }

//     const newUserSentences = [...userSentences];
//     const newUserSentence = [...userSentences[sentenceIndex], word];
//     newUserSentences[sentenceIndex] = newUserSentence;
//     setUserSentences(newUserSentences);

//     if (isCorrectSentence(newUserSentence, sentences[sentenceIndex])) {
//       const newFeedback = [...feedback];
//       newFeedback[sentenceIndex] = "Correct!";
//       setFeedback(newFeedback);
//     }
//   };

//   const resetSentence = (sentenceIndex) => {
//     if (feedback[sentenceIndex] !== "Correct!") {
//       const newUserSentences = [...userSentences];
//       newUserSentences[sentenceIndex] = [];
//       setUserSentences(newUserSentences);

//       const newFeedback = [...feedback];
//       newFeedback[sentenceIndex] = "";
//       setFeedback(newFeedback);

//       const shuffledWords = [...sentences[sentenceIndex]].sort(
//         () => Math.random() - 0.5
//       );
//       const newRemainingWords = [...remainingWords];
//       newRemainingWords[sentenceIndex] = shuffledWords;
//       setRemainingWords(newRemainingWords);
//     }
//   };

//   const resetGame = () => {
//     setUserSentences(sentences.map(() => []));
//     setFeedback(sentences.map(() => ""));
//     setRemainingWords(
//       sentences.map((sentence) => [...sentence].sort(() => Math.random() - 0.5))
//     );
//   };

//   const isCorrectSentence = (userSentence, correctSentence) => {
//     return JSON.stringify(userSentence) === JSON.stringify(correctSentence);
//   };

//   return (
//     <>
//       <Image
//         priority
//         src='/assets/make_sentence.svg'
//         width={437}
//         height={200}
//         className='mx-auto'
//         alt='Lesson header'
//       />
//       <h2 className='instruction'>Form a sentence.</h2>
//       <div className='underline mb-10'></div>
//       {sentences.map((correctSentence, sentenceIndex) => (
//         <div key={sentenceIndex} className=''>
//           <div className='flex flex-wrap gap-3'>
//             {feedback[sentenceIndex] !== "Correct!" &&
//               remainingWords[sentenceIndex].map((word, index) => (
//                 <p
//                   className='bg-secondary text-white py-2 px-3 rounded-sm cursor-pointer'
//                   onClick={() => onWordClick(word, sentenceIndex)}
//                   key={index}>
//                   {word}
//                 </p>
//               ))}
//           </div>
//           <div>
//             {" "}
//             <div className='py-2 font-semibold'>
//               {userSentences[sentenceIndex].map((word, index) => (
//                 <span
//                   key={index}
//                   className={`${
//                     feedback[sentenceIndex] === "Correct!"
//                       ? "text-green-300"
//                       : ""
//                   }`}>
//                   {word}{" "}
//                 </span>
//               ))}
//             </div>
//             {feedback[sentenceIndex] !== "Correct" && (
//               <button onClick={() => resetSentence(sentenceIndex)}>
//                 <GrPowerReset />
//               </button>
//             )}
//           </div>
//         </div>
//       ))}

//     </>
//   );
// }

// export default MakeSentence;

import { useState, useEffect } from "react";

const sentences = [
  ["I", "love", "coffee", "a lot"],
  ["He", "likes", "apple", "a lot"],
  ["She", "enjoys", "reading", "a lot"],
  // Add more correct sentences here
];

function MakeSentence() {
  const [userSentences, setUserSentences] = useState(sentences.map(() => []));
  const [remainingWords, setRemainingWords] = useState(
    sentences.map((sentence) => [...sentence].sort(() => Math.random() - 0.5))
  );
  const [feedback, setFeedback] = useState(sentences.map(() => ""));

  useEffect(() => {
    // Shuffle the words for each sentence at the start
    const shuffledWords = sentences.map((sentence) =>
      [...sentence].sort(() => Math.random() - 0.5)
    );
    setRemainingWords(shuffledWords);
  }, []);

  const onWordClick = (word, sentenceIndex) => {
    if (feedback[sentenceIndex] === "Correct!") {
      // If the sentence is already correct, do nothing
      return;
    }

    const newUserSentences = [...userSentences];
    const newUserSentence = [...userSentences[sentenceIndex], word];
    newUserSentences[sentenceIndex] = newUserSentence;
    setUserSentences(newUserSentences);

    if (isCorrectSentence(newUserSentence, sentences[sentenceIndex])) {
      const newFeedback = [...feedback];
      newFeedback[sentenceIndex] = "Correct!";
      setFeedback(newFeedback);
    }
  };

  const resetSentence = (sentenceIndex) => {
    if (feedback[sentenceIndex] !== "Correct!") {
      const newUserSentences = [...userSentences];
      newUserSentences[sentenceIndex] = [];
      setUserSentences(newUserSentences);

      const newFeedback = [...feedback];
      newFeedback[sentenceIndex] = "";
      setFeedback(newFeedback);

      const shuffledWords = [...sentences[sentenceIndex]].sort(
        () => Math.random() - 0.5
      );
      const newRemainingWords = [...remainingWords];
      newRemainingWords[sentenceIndex] = shuffledWords;
      setRemainingWords(newRemainingWords);
    }
  };

  const resetGame = () => {
    setUserSentences(sentences.map(() => []));
    setFeedback(sentences.map(() => ""));
    setRemainingWords(
      sentences.map((sentence) => [...sentence].sort(() => Math.random() - 0.5))
    );
  };

  const isCorrectSentence = (userSentence, correctSentence) => {
    return JSON.stringify(userSentence) === JSON.stringify(correctSentence);
  };

  return (
    <>
      <h2 className='instruction'>Form a sentence.</h2>
      <div className='underline mb-10'></div>
      {sentences.map((correctSentence, sentenceIndex) => (
        <div key={sentenceIndex} className=''>
          <div className='flex flex-wrap gap-3 text-[16px]'>
            {feedback[sentenceIndex] !== "Correct!" &&
              remainingWords[sentenceIndex].map((word, index) => (
                <p
                  className='bg-secondary text-white py-2 px-4 rounded-md cursor-pointer'
                  onClick={() => onWordClick(word, sentenceIndex)}
                  key={index}>
                  {word}
                </p>
              ))}
            {feedback[sentenceIndex] !== "Correct!" && (
              <button
                onClick={() => resetSentence(sentenceIndex)}
                className='bg-dimWhite text-gray-700 py-2 px-4 rounded-lg cursor-pointer ml-5'>
                Reset
              </button>
            )}
          </div>
          <div>
            {" "}
            <div className='py-3  text-[16px] flex gap-2'>
              {userSentences[sentenceIndex].map((word, index) => (
                <span
                  key={index}
                  className={`${
                    feedback[sentenceIndex] === "Correct!"
                      ? "text-green-500"
                      : "text-black"
                  }`}>
                  {word}{" "}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MakeSentence;
