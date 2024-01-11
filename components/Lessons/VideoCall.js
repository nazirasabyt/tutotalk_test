import { useSocketContext } from '../../context/socket-context';
import { BsCameraVideoOff } from 'react-icons/bs';
import { useRef, useEffect, useState } from 'react';
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill, BsFillMicFill, BsFillMicMuteFill, BsFillTelephoneFill } from 'react-icons/bs';
import VideoControls from './VideoControls';
import VideoCallNotification from './VideoCallNotification';
import UseAuthContext from '@/hooks/useAuthContext';

const VideoCall = ({ roomId }) => {
	const { state } = UseAuthContext();

	const isTeacher = state?.user?.teacher ? true : false;

	const { userVideo, callAccepted, callEnded, callUser, answerCall, call, me, name } = useSocketContext();
	const [showControls, setShowControls] = useState(false);
	const [toggleVideo, setToggleVideo] = useState(true);
	const [isAudioMute, setIsAudioMute] = useState(false);

	const myVideoRef = useRef(null);

	useEffect(() => {
		const initializeWebcam = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
				myVideoRef.current.srcObject = stream;
			} catch (error) {
				console.error('Error accessing webcam:', error);
			}
		};

		initializeWebcam();
		//const currentVideoRef = myVideoRef.current;
		/*
		return () => {
			if (currentVideoRef && currentVideoRef.srcObject) {
				currentVideoRef.srcObject.getTracks().forEach((track) => track.stop());
			}
		};
		*/
	}, []);

	{
		isTeacher && call.isReceivedCall && !callAccepted && answerCall();
	}

	const stopWebcam = () => {
		const videoElement = myVideoRef.current;

		if (videoElement && videoElement.srcObject) {
			const tracks = videoElement.srcObject.getTracks();

			// Stop each track
			tracks.forEach((track) => track.stop());

			// Set the srcObject to null to turn off the webcam in the video element
			videoElement.srcObject = null;
		}
	};

	{
		callEnded && stopWebcam();
	}

	if (callEnded)
		return (
			<div className=" h-full w-full flex flex-col gap-16 justify-center items-center">
				<p className="italic font-medium text-sm">Video session has ended.</p>
			</div>
		);

	return (
		<>
			<div
				onMouseEnter={() => setShowControls(true)}
				onMouseLeave={() => setShowControls(false)}
				className="relative bg-dimWhite  w-full h-1/2 flex justify-center items-center"
			>
				<video playsInline ref={myVideoRef} autoPlay style={{ height: '100%', width: '100%' }} />
				<span className="absolute left-0 bottom-0 p-1 bg-gray-500 text-white font-medium test-base">{name} </span>
				{showControls && (
					<VideoControls
						toggleVideo={toggleVideo}
						setToggleVideo={setToggleVideo}
						isAudioMute={isAudioMute}
						setIsAudioMute={setIsAudioMute}
						myVideoRef={myVideoRef}
					/>
				)}
			</div>
			<div className="relative bg-dimWhite  w-full h-1/2 flex justify-center items-center">
				{!isTeacher && !callAccepted && !callEnded && (
					<div className="bg-[#282828] h-full w-full flex flex-col gap-10 justify-center items-center">
						<div className="call-loader"></div>
						<p className="italic font-medium text-sm text-white">Your teacher is waiting in the lesson room...</p>

						<button
							className="bg-dimBlue text-white px-4 py-2 rounded-md hover:bg-blue-700 text-base font-medium"
							onClick={() => callUser(roomId)}
						>
							Join Now
						</button>
					</div>
				)}
				{isTeacher && !callAccepted && !callEnded && (
					<div className="bg-[#282828] h-full w-full flex flex-col gap-16 justify-center items-center">
						<div className="call-loader"></div>
						<p className="italic font-medium text-sm text-white">Waiting for student to join the class...</p>
					</div>
				)}

				{callAccepted && (
					<div className="h-full">
						<video playsInline ref={userVideo} autoPlay style={{ height: '100%', width: '100%' }} />

						<span className="absolute left-0 bottom-0 p-1 bg-gray-500 text-white font-medium test-base">
							{isTeacher ? call.name : call.teacher}{' '}
						</span>
					</div>
				)}
			</div>
		</>
	);
};

export default VideoCall;
{
	/*
	{//isTeacher && <VideoCallNotification />}
				!isTeacher && !callAccepted && <button onClick={() => callUser(roomId)}>call teacher</button>

	*/
}
