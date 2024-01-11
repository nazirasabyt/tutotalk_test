import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { parseCookies } from "nookies";

const Exercise = ({ grammar2 }) => {
  const rule = grammar2[0].text?.split("\n");
  const [imageData, setImageData] = useState(null);

  const cookies = parseCookies();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  useEffect(() => {
    const imageID = grammar2[0].table;
    const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/grammar-tables?populate=*`;

    const init = async () => {
      try {
        const { data } = await axios.get(imageUrl, { headers });
        const img = data.data.filter((item) => item.attributes.slug == imageID);
        // console.log(img[0].attributes.img.data[0].attributes.url);
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
    <div className='flex flex-col '>
      <div className='underline'></div>
      <div className='my-6 bg-accent1 bg-opacity-30 rounded-lg w-[95%]  p-4'>
        <h2 className='py-3 text-lg text-bluePrimary font-semibold text-center'>
          {grammar2[0].title}
        </h2>
        {grammar2[0].text &&
          rule.map((el, index) => (
            <ReactMarkdown key={index} className='py-1 sm:p-3 sm:text-lg'>
              {el}
            </ReactMarkdown>
          ))}
      </div>
      {imageData && (
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageData}`}
          width={6500}
          height={900}
          alt='Grammar Table'
        />
      )}
      {grammar2 &&
        grammar2[0].list?.map((item, index) => (
          <div
            key={index}
            className='flex flex-col gap-2 mt-3 mb-4 w-[90%] mx-auto'>
            <ReactMarkdown className='border border-accent1 p-4 rounded-lg'>
              {item.name}
            </ReactMarkdown>
          </div>
        ))}

      {grammar2[0].test &&
        grammar2[0].test.map((item, index) => (
          <p key={item.id}>
            {" "}
            {index + 1} . {item.question}
          </p>
        ))}
    </div>
  );
};

export default Exercise;
