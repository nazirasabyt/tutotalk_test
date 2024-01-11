import { useSocketContext } from '../../context/socket-context';

const VideoCallNotification = () => {
	const { answerCall, call, callAccepted } = useSocketContext();

	return (
		<>
			{call.isReceivedCall && !callAccepted && (
				<div className=" h-full flex flex-col gap-3 text-center justify-center items-center">
					<h1 className="italic text-2xl font-semibold">{call.name} Testing wants to join ...</h1>
					<button className="bg-orangePrimary text-lg font-semibold rounded-md py-3 px-5" onClick={answerCall}>
						Allow Student to Join
					</button>
				</div>
			)}
		</>
	);
};

export default VideoCallNotification;
