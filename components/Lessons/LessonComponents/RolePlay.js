import Image from "next/image";
import { Tab } from "@headlessui/react";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RolePlay = ({ data }) => {
  return (
    <div className='text-lg'>
      <div>
        {" "}
        <Image
          src={`${data.discuss[0].img}`}
          width={437}
          height={200}
          className='mx-auto'
          alt='Lesson header'
        />
      </div>
      <div>
        {" "}
        <h2 className='instruction'>Role Play the scenarios</h2>
        <div className='underline'></div>
        <div className='w-full px-2 pt-10 sm:px-0'>
          <Tab.Group>
            <Tab.List className='flex space-x-1 rounded-xl  p-1 '>
              {data.rolePlay.map((item) => (
                <Tab
                  key={item.id}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-lg font-medium leading-5 bg-[#CFE9EF]",
                      "",
                      selected ? "shadow" : "bg-dimWhite"
                    )
                  }>
                  {item.card_name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className='mt-2 w-full'>
              {" "}
              {data.rolePlay.map((panel, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames("rounded-xl bg-white p-3", "")}>
                  <div className='flex flex-col sm:flex-row gap-8 sm:justify-between items-center'>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}/uploads/${panel.card_img}`}
                      width={300}
                      height={360}
                      alt='Exercise'
                    />

                    <div className='flex flex-col'>
                      {" "}
                      {panel.card_instruction &&
                        panel.card_instruction.split("\n").map((line, i) => (
                          <p className='w-[300px] sm:w-[400px]' key={i}>
                            {line}
                          </p>
                        ))}
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
        <h2 className='mt-10 mb-2 py-2 font-semibold mx-5'>
          Useful Phrases...
        </h2>
        <ul className='flex flex-col gap-5 text-gray-700 mx-5'>
          {data.rolePlay[0].usefule_phrases.map((ph, index) => (
            <li key={index}>&#8226; {ph}</li>
          ))}
        </ul>
      </div>
      <div className='mt-10 flex flex-col'>
        {" "}
        {data.rolePlay.map((item, index) => (
          <Link
            key={index + 2}
            href={item.card_link}
            className='text-xs text-dimWhite'>
            Image from Freepik
          </Link>
        ))}
        <a href={data.discuss[0].imgLink} className='text-xs text-dimWhite'>
          {data.discuss[0].imgInfo}
        </a>
      </div>
    </div>
  );
};

export default RolePlay;
