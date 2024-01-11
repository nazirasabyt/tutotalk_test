import Image from "next/image";
import React from "react";

const Read = ({ data }) => {
  const paragraphs = data.textToRead.split("\n");
  console.log(data);

  return (
    <div className=''>
      <Image
        priority
        src='/assets/read.jpg'
        width={437}
        height={200}
        className='mx-auto'
        alt='Lesson header'
      />
      <a
        className='text-xs text-dimWhite'
        href='https://www.freepik.com/free-vector/book-readers-concept_9174332.htm#&position=9&from_view=undefined'>
        Image by pch.vector on Freepik
      </a>{" "}
      <h2 className='instruction'>Read the text.</h2>
      <div className='underline'></div>
      <div className='text-lg rounded-lg text-gray-800 mr-4 mt-4 bg-orangePrimary bg-opacity-30 p-4'>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className='py-2 sm:text-lg'>
            {paragraph}
          </p>
        ))}
      </div>
      {data.note ? (
        <p className='p-6 bg-accent1 bg-opacity-30 mt-4 rounded-lg w-[95%]'>
          {data.note}
        </p>
      ) : (
        ""
      )}
      <div className='mt-10'>
        <h2 className='instruction'> Answer the questions bellow.</h2>
        <div className='underline'></div>{" "}
        {data.discuss.map((pic, indx) => (
          <div key={indx + 1} className='mt-3'>
            {" "}
            <p className='py-2 text-lg'>{pic.question}</p>
            {pic.options ? (
              <div className='flex gap-4'>
                {pic.options.map((option, index) => (
                  <p key={index + 2} className='py-2 text-sm'>
                    - {option}
                  </p>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
