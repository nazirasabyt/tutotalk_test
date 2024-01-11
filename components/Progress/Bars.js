import ProgressBar from "../Dashboard/ProgressBar";

const Bars = () => {
  return (
    <div className='w-full py-[25px] px-[30px]'>
      {/* <Card title='Tasks' percentage='65%' text='Tasks completed:' num={22} /> */}
      <h2 className='self-end mb-4 text-[18px] font-medium'>Homework</h2>
      <ProgressBar />
    </div>
  );
};

export default Bars;
