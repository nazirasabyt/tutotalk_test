import UseAuthContext from '@/hooks/useAuthContext';
import SocketProvider from '../../context/socket-context';
import VideoSession from './VideoSession';
import StudentVideoSession from './StudentVideoSession';

function LessonRoom({ roomId }) {
	const { state } = UseAuthContext();

	const isTeacher = state?.user?.teacher ? true : false;
	const userName = state?.user?.username;

	return (
		<SocketProvider>
			<div className=" hidden md:flex flex-col fixed  top-0 right-0 w-[35%] gap-4 h-screen">
				{isTeacher && <VideoSession roomId={roomId} isTeacher={isTeacher} userName={userName} />}
				{!isTeacher && <StudentVideoSession roomId={roomId} isTeacher={isTeacher} userName={userName} />}
				{/* <div className='bg-dimWhite  w-full h-1/2 flex justify-center items-center gap-5'>
        <BsCameraVideoOff size={80} style={{ color: "#ffffff" }} />
        </div>
        <div className='bg-dimWhite  w-full h-1/2 flex justify-center items-center gap-5'>
        <BsCameraVideoOff size={80} style={{ color: "#ffffff" }} />
      </div> */}

				{/*<textarea placeholder="Notes..." className="w-full mx-auto bg-dimWhite h-full outline-none p-10"></textarea>*/}
			</div>
		</SocketProvider>
	);
}

export default LessonRoom;
