import UseHomeworkContext from "@/hooks/useHomeworkContext";
import UseProgressContext from "@/hooks/useProgressContext";
import Circle from "./Circle";
import Bars from "./Bars";
import Card from "./Card";

const ProgressComponent = () => {
  const cardStyle =
    "rounded-[10px] bg-white w-[90%] sm:w-[510px] mt-10 py-[25px] px-[30px]";
  const { state } = UseHomeworkContext();
  const { state: sprintPoints } = UseProgressContext();

  return (
    <div className='flex flex-col py-10 px-14 items-center'>
      <div className='flex flex-col sm:flex-row gap-10'>
        <div className='w-[330px] h-[461px] rounded-[20px] bg-white p-6 flex flex-col  items-center'>
          <h2 className='text-start pb-7 text-[18px] font-medium self-start'>
            Total statistics
          </h2>
          <Circle wordList={state.wordList} />
        </div>
        <div className=' rounded-[20px] bg-white sm:w-[690px] h-[461px]'>
          <Bars />
        </div>
      </div>
      <div className='hidden sm:flex gap-10'>
        <div className={cardStyle}>
          <Card
            title='Sprint'
            percentage={`${
              sprintPoints.sprintPoints ? sprintPoints.sprintPoints : 0
            } %`}
            text='Words learned:'
            num={sprintPoints.sprintAnswers ? sprintPoints.sprintAnswers : 0}
          />
        </div>
        <div className={cardStyle}>
          <Card
            title='Flashcards'
            percentage='0%'
            text='Words learned:'
            num={0}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressComponent;
