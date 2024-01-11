export const getLocalStorageWords = () => {
  if (typeof window !== "undefined") {
    let wordList = localStorage.getItem("wordlist");
    return wordList ? JSON.parse(wordList) : null;
  }
};
export const getLocalStorageGrammarTask = () => {
  if (typeof window !== "undefined") {
    let homework = localStorage.getItem("grammar");
    return homework ? JSON.parse(homework) : null;
  }
};

export const calculatePercentage = (part, total) => {
  return Math.round((part / total) * 100);
};

export async function fecther(url, options = {}) {
  let res;
  if (!options) {
    res = await fetch(url);
  } else {
    res = await fetch(url, options);
  }

  const data = await res.json();
  return data;
}

export const currencyFormatter = (data) => {
  return ((data.amount * 100) / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

export const calculateDates = () => {
  const currentDate = new Date();
  const dates = [currentDate];
  const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  // Calculate the next three dates
  for (let i = 1; i <= 3; i++) {
    const nextDate = new Date(currentDate.getTime() + i * oneDay);
    dates.push(nextDate);
  }

  const formattedDates = dates.map((date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  });

  return formattedDates;
};

export const validateEmail = (email) => {
  // You can use a regular expression for more comprehensive email validation
  return email.includes("@");
};

export const validatePassword = (password) => {
  // You can define your password validation rules here
  return (
    password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password)
  );
};

export function convertISODateToDateComponents(isoDate) {
  // Convert ISO date to a JavaScript Date object
  const date = new Date(isoDate);

  //  date.setDate(date.getDate() );
  // Extract day, month, and year from the Date object
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based, so add 1
  const year = date.getFullYear();

  // Return the formatted date components
  return `${day}/${month}/${year}`;
}

export function addDaysToISODate(isoDate, daysToAdd) {
  // Convert ISO date to a JavaScript Date object
  const date = new Date(isoDate);

  // Add the specified number of days
  date.setDate(date.getDate() + daysToAdd);

  // Extract day, month, and year from the updated Date object
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based, so add 1
  const year = date.getFullYear();

  // Format the date components as a string
  return `${day}/${month}/${year}`;
}

export function convertDateToDayMonthYear(dateString) {
  const inputDate = new Date(dateString);
  const day = inputDate.getDate();
  const month = inputDate.toLocaleString("default", { month: "long" });
  const year = inputDate.getFullYear();

  return `${day} ${month} ${year}`;
}

import axios from "axios";

/**
 * Function to save user progress.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.userId - The ID of the user.
 * @param {string} params.id - The ID of the homework.
 * @param {Object} params.state - The state containing progress data.
 * @param {Object} params.router - The Next.js router for navigation.
 * @param {Object} params.message - The message object for displaying notifications.
 * @param {Object} params.headers - The headers for the HTTP request.
 */
const saveProgress = async ({
  userId,
  id,
  state,
  router,
  message,
  headers,
}) => {
  try {
    const userProgressUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${userId}?populate=progress`;
    const res = await axios.get(userProgressUrl, { headers });

    if (res.data) {
      const homeworkAnswers = {
        homeworkId: id,
        vocabularyPoints: state.data.vocabularyPoints,
        grammarPoints: state.data.grammarPoints,
        readingPoints: state.data.readingPoints,
        esse: state.data.esse,
        esseFeedback: state.data.esseFeedback,
      };

      let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/progresses`;
      const progressId = res.data.progress ? res.data.progress.id : null;

      if (progressId) {
        // Check if a homeworkAnswer with the same homeworkId already exists
        const existingHomeworkAnswerIndex =
          res.data.progress.homeworkAnswers.findIndex(
            (answer) => answer.homeworkId === id
          );

        if (existingHomeworkAnswerIndex !== -1) {
          // Update the existing answer
          res.data.progress.homeworkAnswers[existingHomeworkAnswerIndex] =
            homeworkAnswers;
        } else {
          // Add the new answer
          res.data.progress.homeworkAnswers.push(homeworkAnswers);
        }

        // PUT request to update progress
        const updateResult = await axios({
          url: `${url}/${progressId}`,
          method: "PUT",
          data: {
            data: {
              user: {
                connect: [userId],
              },
              homeworkAnswers: res.data.progress.homeworkAnswers,
            },
          },
          headers,
        });

        if (updateResult.status === 200) {
          message.success("Homework Completed!");
          router.push("/homework");
        }
      } else {
        // POST request to create new progress
        const createResult = await axios({
          url,
          method: "POST",
          data: {
            data: {
              user: {
                connect: [userId],
              },
              homeworkAnswers: [homeworkAnswers],
            },
          },
          headers,
        });

        if (createResult.status === 200) {
          message.success("Homework Completed!");
          router.push("/homework");
        }
      }
    }
  } catch (error) {
    console.error(error);
    message.error("Server error! Homework is not saved...");
  }
};

export default saveProgress;
