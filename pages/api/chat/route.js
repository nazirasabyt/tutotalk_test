// export default async (req, res) => {
//  first we get the details from the front end
// const body = await req.text();
// const bodyJSON = JSON.parse(body);

// console.log(req.body);

//  we create an array of Messages
// const messages = [];

//  first we pre-set the GPT model as an excellent event planner who can help suggest places to explore
// const newMessage = {
//   role: "system",
//   content:
//     "You are an excellent event planner who can help suggest places for people to visit or check out. Ask people for 3 pieces of information: 1) The name of the place 2) If they like quiet or lively places 3) The date period when they will be going.",
// };
// messages.push(newMessage);

//  then we get the rest of the conversation from the front end
// const conversation = bodyJSON.conversation;
// conversation.forEach((converse) => {
//   messages.push(converse);
// });

//  creating the body to send to chatGPT's API
// const bodyToSend = {
//   model: "gpt-3.5-turbo-0301",
//   // temperature: 0.7,
//   messages: messages,
// };

// try {
//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + process.env.OPEN_AI_KEY,
//     },
//     body: JSON.stringify(bodyToSend),
//   });

//   //  getting the json after the promise is fulfilled
//   const json = await response.json();
//   let returnMsg = "";
//   if (json.choices != null) {
//     const responseMessage = json.choices[0].message.content;
//     returnMsg = responseMessage;
//   }

//   return new Response(returnMsg);
// } catch (err) {
//   console.log(err);
//   return response.status(500).json({ error: "Failed." });
// }
// };

import { IncomingForm, File } from "formidable";
import axios from "axios";

const KEY = "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";

export async function POST(req, res) {
  // const form = new IncomingForm();
  // form.parse(req, async (err, fields, files) => {
  //   console.log({ file: files.file });

  //   if (err) {
  //     return reject(err);
  //   }
  //   const filePath = await saveFile(files.file[0]);
  //   resolve(filePath);

  // });

  const data = await req.formData();
  const file = data.get("file");
  if (!file) {
    return res.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const convertes_text = convertAudioToText(buffer);
  console.log(convertes_text);

  const messages = [];

  const newMessage = {
    role: "system",
    content:
      "You are an excellent English student. Ask questions about the student",
  };
  messages.push(newMessage);

  const bodyToSend = {
    model: "gpt-3.5-turbo-0301",
    // temperature: 0.7,
    messages: messages,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPEN_AI_KEY,
      },
      body: JSON.stringify(bodyToSend),
    });

    //  getting the json after the promise is fulfilled
    const json = await response.json();
    let returnMsg = "";
    if (json.choices != null) {
      const responseMessage = json.choices[0].message.content;
      returnMsg = responseMessage;
    }

    return new Response(returnMsg);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Failed." });
  }
}

async function convertAudioToText(audioFile) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/whisper-1/transcribe",
      {
        audio: audioFile,
      },
      {
        headers: {
          Authorization: `Bearer ${KEY}`, // Replace with your OpenAI API key
          "Content-Type": "application/json",
        },
      }
    );

    const transcript = response.data.text;
    return transcript;
  } catch (error) {
    console.error(error);
    console.log("Failed to decode Audio");
    return null; // You can choose to handle the error differently if needed
  }
}

const getChatResponse = async (messageInput) => {
  const messages = [];
  const userMessage = { role: "user", content: messageInput };
  messages.push(userMessage);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
      {
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${KEY}`,
        },
      }
    );

    const messageText = response.data.choices[0].message.content;
    return messageText;
  } catch (error) {
    console.error(error);
    return null;
  }
};
