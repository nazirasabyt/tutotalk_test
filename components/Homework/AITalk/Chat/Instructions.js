const list = [
  {
    title: "Step 1: Initiating the converstaion",
    step: "To start a conversation , press record and say hello first.",
  },
  {
    title: "Step 2: Internet speed",
    step: "Depending on your internet speed, it might take longer to get a response. Wait and do not record twice at the same time.",
  },
  {
    title: "Step 3: Role play",
    step: "Imagine you are in a specific situation and play a role. It will help you to have interesting conversations.",
  },
  {
    title: "Step 4: Restart ",
    step: "If anything goes wrong or you want to start again press reset button or refresh the page.",
  },
];

const Instructions = () => {
  return (
    <div className='hidden sm:block w-[400px] h-full bg-white rounded-[20px] border border-[#F0F8FA]'>
      <h3 className='bg-[#3F7EA5] text-white py-[22px] text-center rounded-t-[20px] font-medium'>
        Instructions
      </h3>
      <div className='p-6 flex flex-col gap-2 font-medium'>
        {" "}
        {list.map((el, indx) => (
          <div key={indx} className=''>
            <h2>{el.title}</h2>
            <p className='font-light py-1'>{el.step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructions;
