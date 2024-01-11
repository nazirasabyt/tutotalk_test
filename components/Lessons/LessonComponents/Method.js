import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { parseCookies } from "nookies";
import ReactMarkdown from "react-markdown";

const Method = ({ grammar1 }) => {
  const examples = grammar1[0].text.split("\n");
  const [imageData, setImageData] = useState(null);

  const cookies = parseCookies();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  useEffect(() => {
    const imageID = grammar1[0].table;
    const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/grammar-tables?populate=*`;

    const init = async () => {
      try {
        const { data } = await axios.get(imageUrl, { headers });
        console.log(data);
        const img = data.data.filter((item) => item.attributes.slug == imageID);
        console.log(img[0].attributes.img.data[0].attributes.url);
        if (img) {
          setImageData(img[0].attributes?.img?.data[0].attributes?.url);
        }
      } catch (err) {
        console.log(err);
      }
    };

    init();
  }, []);

  return (
    <div className='flex flex-col gap-3  sm:text-lg'>
      {grammar1[0].img && (
        <>
          <Image
            src={grammar1[0].img}
            className='mx-auto'
            width={437}
            height={200}
            alt='Lesson Grammar'
          />
          <span className='w-[80%]  text-[10px] text-gray-300 -mt-10'>
            <a href='https://www.freepik.com/free-vector/team-crisis-managers-solving-businessman-problems-employees-with-lightbulb-unraveling-tangle-vector-illustration-teamwork-solution-management-concept_10613678.htm#page=4&position=21&from_view=author'>
              Image by pch.vector
            </a>{" "}
            on Freepik
          </span>
        </>
      )}
      <h1 className='text-center'>Grammar</h1> <div className='underline'></div>
      <ReactMarkdown className='py-2'>{grammar1[0].desc}</ReactMarkdown>
      {examples.map((example, index) => (
        <ReactMarkdown key={index} className=''>
          {example}
        </ReactMarkdown>
      ))}
      {imageData && (
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageData}`}
          width={6500}
          height={900}
          alt='Grammar Table'
        />
      )}
      {grammar1[0].list &&
        grammar1[0].list.map((el, index) => (
          <div className='grid grid-cols-1 gap-2 mt-2 mb-10 w-[94%] px-auto'>
            <ReactMarkdown
              className='text-bluePrimary font-semibold text-lg bg-accent1 bg-opacity-10 rounded-full p-2 text-center'
              key={index}>
              {el.name}
            </ReactMarkdown>
          </div>
        ))}
      {grammar1[0].test &&
        grammar1[0].test.map((item, index) => (
          <p key={item.id}>
            {" "}
            {index + 1} . {item.question}
          </p>
        ))}
    </div>
  );
};

export default Method;
