import axios from "axios";
import { useState, useEffect } from "react";

function WordList({ el }) {
  const [selectedWordIndex, setSelectedWordIndex] = useState(null);
  const [wordDesc, setWordDesc] = useState(null);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const init = async () => {
      try {
        setError(null); // Clear any previous errors
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${el.wordlist[selectedWordIndex].word}`
        );
        const data = response.data[0];
        setWordDesc(data);
      } catch (err) {
        console.error(err);
        // setError(err.response.data.message);
        setError("");
      }
    };
    if (selectedWordIndex !== null) {
      init();
    }
  }, [selectedWordIndex]);

  return (
    <div className='flex flex-col gap-2 mt-5 mb-20'>
      <h3 className='text-lg flex gap-2 items-center justify-center'>
        Wordlist
      </h3>
      <div className='underline'></div>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 my-4 items-center justify-center'>
        {el.wordlist.map((word, index) => (
          <button
            onClick={() =>
              setSelectedWordIndex(index === selectedWordIndex ? null : index)
            }
            key={word.id}
            className='text-[16px] sm:text-lg text-start'>
            {index + 1}.{" "}
            {selectedWordIndex === index ? (
              <>
                <div className='fixed inset-x-5 inset-y-40 sm:inset-60  flex flex-col items-center justify-center z-50 bg-[#F8C169]  w-[350px] h-[250px]  shadow-xl rounded-md p-2'>
                  <h2 className='py-1 font-medium text-2xl'>
                    {word.word}
                    <span className='pl-3 font-normal'>
                      {wordDesc && wordDesc?.phonetic}
                    </span>
                  </h2>

                  <div className='border-b border-white w-[90%] mx-auto py-1'></div>
                  <h2 className='py-2 text-2xl'>{word.translation}</h2>

                  {error ? (
                    <p className='text-red-500'>{error}</p>
                  ) : (
                    <p className='text-center'>
                      {wordDesc &&
                        wordDesc.meanings[0]?.definitions[0]?.definition}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <span>{word.word}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WordList;
