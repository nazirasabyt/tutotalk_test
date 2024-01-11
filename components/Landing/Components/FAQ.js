import { FaChevronUp } from "react-icons/fa";
import { useIntl } from "react-intl";
import { Disclosure } from "@headlessui/react";

const FAQ = () => {
  const intl = useIntl();

  const title = intl.formatMessage({ id: "q.title" });
  const section = intl.formatMessage({ id: "q.section" });
  const questionOne = intl.formatMessage({ id: "q.question.one" });
  const questionTwo = intl.formatMessage({ id: "q.question.two" });
  const questionThree = intl.formatMessage({ id: "q.question.three" });
  const questionFour = intl.formatMessage({ id: "q.question.four" });
  const answerOne = intl.formatMessage({ id: "q.answer.one" });
  const answerTwo = intl.formatMessage({ id: "q.answer.two" });
  const answerThree = intl.formatMessage({ id: "q.answer.three" });
  const answerFour = intl.formatMessage({ id: "q.answer.four" });
  return (
    <div
      id='faq'
      className='flex flex-col justify-center items-center gap-6 mb-10'>
      <h2 className='text-xl ss:text-2xl  font-medium mb-5'>{title}</h2>
      <div className='w-full  rounded-xl bg-dimWhite  p-2'>
        <Disclosure
          as='div'
          className='
    '>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg  px-4 py-4 text-left text-lg font-medium text-bluePrimary hover:bg-blue-100 focus:outline-none focus-visible:ring-blue-500 focus-visible:ring-opacity-75'>
                <span>{questionOne}</span>
                <FaChevronUp
                  className={`${
                    open ? "text-accent rotate-180 transform " : ""
                  } h-5 w-5 text-bluePrimary`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className='px-4 pt-4 pb-2 text-lg text-gray-500'>
                {answerOne}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <div className='w-full rounded-xl bg-dimWhite  p-2'>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg  px-4 py-4 text-left text-lg font-medium text-bluePrimary focus:outline-none  hover:bg-blue-100 focus-visible:ring-blue-600 focus-visible:ring-opacity-75'>
                <span>{questionTwo}</span>
                <FaChevronUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-bluePrimary`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className='px-4 pt-4 pb-2 text-lg text-gray-500'>
                {answerTwo}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <div className='w-full rounded-xl bg-dimWhite  p-2'>
        <Disclosure
          as='div'
          className='
    '>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg  px-4 py-4 text-left text-lg font-medium text-bluePrimary hover:bg-blue-100 focus:outline-none focus-visible:ring-blue-500 focus-visible:ring-opacity-75'>
                <span>{questionThree}</span>
                <FaChevronUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-bluePrimary`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className='px-4 pt-4 pb-2 text-lg text-gray-500'>
                {answerThree}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <div className='w-full rounded-xl bg-dimWhite  p-2'>
        <Disclosure
          as='div'
          className='
    '>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg  px-4 py-4 text-left text-lg font-medium text-bluePrimary hover:bg-blue-100 focus:outline-none focus-visible:ring-blue-500 focus-visible:ring-opacity-75'>
                <span>{questionFour}</span>
                <FaChevronUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-bluePrimary`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className='px-4 pt-4 pb-2 text-lg text-gray-500'>
                {answerFour}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default FAQ;
