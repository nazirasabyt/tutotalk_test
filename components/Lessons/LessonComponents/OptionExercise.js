import Image from "next/image";
import { useState, useEffect } from "react";

const OptionExercise = ({ data }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const savedAnswers = localStorage.getItem("savedAnswers");
    if (savedAnswers) {
      setSelectedOptions(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedAnswers", JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  const handleOptionChange = (itemId, option) => {
    setSelectedOptions({ ...selectedOptions, [itemId]: option });
  };

  return (
    <div className='mb-10'>
      <h2 className='instruction'>Choose the correct options</h2>
      <div className='underline mb-10'></div>
      <div className='flex flex-col gap-4'>
        {data.optionsExercise &&
          data.optionsExercise.map((item, index) => (
            <div
              className='flex flex-col sm:flex-row gap-2 text-lg'
              key={item.id}>
              <p>
                {index + 1}. {item.sentenceStart}
              </p>
              <select
                value={selectedOptions[item.id] || ""}
                onChange={(e) => handleOptionChange(item.id, e.target.value)}
                className={`grammar_test sm:w-40 h-8 p-1 ${
                  selectedOptions[item.id] === item.correctAnswer
                    ? "bg-green-200 text-green-700"
                    : "bg-dimWhite"
                }`}>
                <option value='' disabled hidden></option>
                {item.options.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </select>
              <p>{item.sentenceEnd}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OptionExercise;
