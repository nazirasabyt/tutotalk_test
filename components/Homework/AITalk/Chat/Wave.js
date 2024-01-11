import Image from "next/image";

const Wave = ({ isTalking, isloading }) => {
  return (
    <div className={`mt-[90px]`}>
      {isTalking ? (
        <div id='bars' className='h-full w-full mx-auto'>
          {[...Array(17)].map((_, index) => (
            <Image
              src={`/assets/blue${(index + 1).toString()}.png`}
              width={249}
              height={312}
              key={index}
              className='bar'
              alt='Neuro'
            />
          ))}
        </div>
      ) : (
        <div id='' className='h-full w-full z-10 relative'>
          <Image
            src='/assets/light_blue.jpg'
            width={160}
            height={212}
            className=''
            alt='Blue waves'
          />
          <Image
            src='/assets/yellow.png'
            width={200}
            height={272}
            className='absolute z-10 top-5'
            alt='Yellow waves'
          />
          {!isloading && (
            <p className='text-lg sm:text-xl text-primary mt-10 text-center z-10'>
              {" "}
              Start speaking
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Wave;
