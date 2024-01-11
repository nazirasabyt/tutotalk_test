import React, { useEffect, useState } from "react";
import RecordMessage from "./RecordMessage";
import axios from "axios";
import Wave from "./Wave";
import { message } from "antd";

function Controller({ topic }) {
  const [isloading, setIsLoading] = useState(false);
  const [help, setHelp] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const createBlobUrl = (data) => {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  };

  const handleAudioPlay = () => {
    setIsAudioPlaying(true);
  };

  const handleAudioPause = () => {
    setIsAudioPlaying(false);
  };

  const handleStop = async (blobUrl) => {
    setIsLoading(true);
    // Append recorder mes to messaged

    const myMessage = { sender: "me", blobUrl };
    const messagesArr = [...messages, myMessage];

    //  Convert blob url to blob object

    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        // Construct audio to send file
        const formData = new FormData();
        const uniqueId = Math.floor(Math.random() * 10000);
        const dynamicFileName = `${uniqueId}.wav`;

        formData.append("file", blob, dynamicFileName);
        formData.append("topic", topic);

        // send formData to api backend

        await axios
          .post(`${process.env.TALK_TO_AI}/post-audio`, formData, {
            headers: { "Content-Type": "audio/wav" },
            responseType: "arraybuffer",
          })
          .then((res) => {
            const blob = res.data;
            const audio = new Audio();
            audio.src = createBlobUrl(blob);

            // Append  to audio
            const rachelMessage = { sender: "rachel", blobUrl: audio.src };

            messagesArr.push(rachelMessage);
            setMessages(messagesArr);

            // Play our audio
            setIsLoading(false);

            audio.addEventListener("play", handleAudioPlay);
            audio.addEventListener("pause", handleAudioPause);
            audio.play();
          })
          .catch((err) => {
            console.error(err.message);
            setIsLoading(false);
          });
      });
  };

  useEffect(() => {
    resetConversation();
  }, [topic]);

  const resetConversation = async () => {
    await axios
      .get(`${process.env.TALK_TO_AI}/reset`)
      .then((res) => {
        if (res.status == 200) {
          setMessages([]);
          console.log(res);
        } else {
          message.error("Api request error");
          console.error("there was an error with the api request to backend");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className='h-full overflow-y-hidden relative w-full'>
      <div className='flex justify-between m-6 cursor-pointer relative'>
        <div className='flex gap-3 text-[16px]'>
          {" "}
          <p className={`${topic == "general" && "font-medium"}`}>General</p>
          <p className={`${topic == "business" && "font-medium"}`}>Business</p>
          <p className={`${topic == "interview" && "font-medium"}`}>
            Interview
          </p>
        </div>
        <button
          onClick={resetConversation}
          className={
            "bg-[#F8C169] py-1 px-3 rounded-lg transition-all duration-300 button  hover:text-secondary "
          }>
          {" "}
          Reset
        </button>
      </div>
      {help && (
        <div className='flex flex-col w-[300px] bg-[#EBF5F8] rounded-xl p-4 absolute top-0 right-0'>
          <button
            className={`${!help ? "hidden" : "flex justify-end"}`}
            onClick={() => setHelp(!help)}>
            {" "}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      )}
      <div className='flex flex-col justify-center items-center my-[20px] relative'>
        {" "}
        <Wave isTalking={isAudioPlaying} isloading={isloading} />
        {isloading && (
          <div className='text-center font-light mt-8 italic text-gradient animate-pulse'>
            Give me a few seconds...
          </div>
        )}
      </div>
      <div className='flex flex-col justify-between h-full'>
        {/* <div className='mt-5 px-5'>
          {messages.map((audio, index) => {
            return (
              <div
                key={index + audio.sender}
                className={
                  "flex flex-col " +
                  (audio.sender == "rachel" && "flex items-end")
                }>
                <div className='mt-4'>
                  <p
                    className={
                      audio.sender == "rachel"
                        ? "text-right mr-2 italic text-green-500"
                        : "ml-2 italic text-bluePrimary"
                    }>
                    {audio.sender}
                  </p>
                  <audio
                    src={audio.blobUrl}
                    className='appearance-none'
                    controls
                  />
                </div>
              </div>
            );
          })}

        
        </div> */}

        <div className='absolute bottom-0 w-full py-6 text-center  h-40'>
          <div className='flex justify-center items-center w-full'>
            <RecordMessage handleStop={handleStop} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controller;
