import { useState, useEffect } from "react";

const TypeExercise = ({ data }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    // Load saved answers from localStorage on component mount
    const savedAnswers = localStorage.getItem("savedAnswers");
    if (savedAnswers) {
      setSelectedOptions(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    // Save answers to localStorage whenever selectedOptions change
    localStorage.setItem("savedAnswers", JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  const handleInputChange = (itemId, value) => {
    setSelectedOptions({ ...selectedOptions, [itemId]: value });
  };

  const handleKeyDown = (itemId, event) => {
    if (event.key === "Enter") {
      const inputValue = selectedOptions[itemId] || "";
      const isCorrect =
        inputValue === data.find((item) => item.id === itemId).correctAnswer;
      if (isCorrect) {
        setSelectedOptions({ ...selectedOptions, [itemId]: inputValue });
      }
    }
  };

  return (
    <div className='mb-10'>
      {data.typeExercise.length > 0 && (
        <h2 className='instruction'>Type the correct word</h2>
      )}
      <div className='underline mb-10'></div>
      <div className='flex flex-col gap-4 text-lg'>
        {data.typeExercise &&
          data.typeExercise.map((item, index) => (
            <div className='flex flex-col gap-2' key={item.id}>
              <div className='flex flex-col sm:flex-row gap-2'>
                {" "}
                <p>
                  {" "}
                  {index + 1} . {item.sentenceStart}
                </p>
                <input
                  type='text'
                  value={selectedOptions[item.id] || ""}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(item.id, e)}
                  className={`grammar_test sm:w-40 h-8 ${
                    selectedOptions[item.id] === item.correctAnswer
                      ? "bg-green-200 text-green-700"
                      : "bg-dimWhite"
                  }`}
                />
                <p>{item.sentenceEnd}</p>
              </div>
              <div className='flex flex-col sm:flex-row gap-2'>
                {" "}
                {item.options.map((option, index) => (
                  <p key={index} className='text-primary font-medium'>
                    ( {option})
                  </p>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TypeExercise;
