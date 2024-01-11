import UseProgressContext from "@/hooks/useProgressContext";
import axios from "axios";
import { useRouter } from "next/router";
import { message } from "antd";
import { parseCookies } from "nookies";
import UseAuthContext from "@/hooks/useAuthContext";

const Popup = ({ lessonType }) => {
  const { state } = UseProgressContext();
  const { state: user } = UseAuthContext();
  const router = useRouter();
  const cookies = parseCookies();

  const { id } = router.query;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };
  const noSaveProgress = () => {
    router.push(`/homework/${lessonType}`);
  };

  const saveProgress = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=progress`,
        { headers }
      );

      if (res.data) {
        const homeworkAnswers = {
          homeworkId: id,
          vocabularyPoints: state.data.vocabularyPoints,
          grammarPoints: state.data.grammarPoints,
          readingPoints: state.data.readingPoints,
          esse: state.data.esse,
          esseFeedback: state.data.esseFeedback,
        };

        try {
          let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/progresses`;
          const progressId = res.data.progress ? res.data.progress.id : null;

          if (progressId && res.data.progress.homeworkAnswers) {
            // Check if a homeworkAnswer with the same homeworkId already exists
            const existingHomeworkAnswerIndex =
              res.data.progress.homeworkAnswers.findIndex(
                (answer) => answer.homeworkId === id
              );

            if (existingHomeworkAnswerIndex !== -1) {
              // If it exists, update the existing answer
              res.data.progress.homeworkAnswers[existingHomeworkAnswerIndex] =
                homeworkAnswers;
            } else {
              // If it doesn't exist, add the new answer
              res.data.progress.homeworkAnswers.push(homeworkAnswers);
            }

            const result = await axios({
              url: `${url}/${progressId}`,
              method: "PUT",
              data: {
                data: {
                  user: {
                    connect: [user.user.id],
                  },
                  homeworkAnswers: res.data.progress.homeworkAnswers,
                },
              },
              headers,
            });

            if (result.status === 200) {
              message.success("Homework Completed!");
              router.push(`/homework/${lessonType}`);
            }
          } else {
            const result = await axios({
              url,
              method: "POST",
              data: {
                data: {
                  user: {
                    connect: [user.user.id],
                  },
                  homeworkAnswers: [homeworkAnswers],
                },
              },
              headers,
            });

            if (result.status === 200) {
              message.success("Homework Completed!");
              console.log(result.data);
              router.push(`/homework/${lessonType}`);
            }
          }
        } catch (error) {
          console.error(error);
          message.error("Server error! Homework is not saved...");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-[300px] h-[160px] p-5 bg-accent rounded-lg shadow-xl'>
      <p className='text-lg'>Would you like to save your answers?</p>
      <div className='flex gap-4 mt-4'>
        {" "}
        <button
          className='bg-white text-bluePrimary px-4 py-2 rounded-xl button'
          onClick={saveProgress}>
          Yes
        </button>
        <button
          className='bg-white text-bluePrimary px-4 py-2 rounded-xl button'
          onClick={noSaveProgress}>
          No
        </button>
      </div>
    </div>
  );
};

export default Popup;
