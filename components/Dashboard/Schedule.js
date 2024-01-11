import Calendar from "../Shared/Calendar";

const Schedule = () => {
  return (
    <>
      <div className='hidden sm:block w-[610px]'>
        <Calendar view='week' />
      </div>
      <div className='sm:hidden block w-[360px]'>
        <Calendar view='day' />
      </div>
    </>
  );
};

export default Schedule;
