import DragNDrop from "./DragNDrop";
import Image from "next/image";

const Vocabulary = ({ vocabulary, id }) => {
  const wordList = vocabulary?.map((item) => item.word);

  return (
    <>
      {vocabulary && (
        <div className='homework_tab'>
          <div className='flex_row mb-5'>
            <Image
              src='/assets/vocab.jpg'
              alt='Vocabulary'
              width={400}
              height={200}
            />
          </div>
          <h1 className=' text-bluePrimary font-medium py-5'>
            1.Drag and drop correct word to complete the sentence.
          </h1>
          <DragNDrop
            wordList={wordList}
            vocabularyTask={vocabulary}
            vocabID={id}
          />
        </div>
      )}
    </>
  );
};

export default Vocabulary;
