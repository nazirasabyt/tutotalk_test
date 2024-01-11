import { useSocketContext } from '@/context/socket-context';
import { BsCameraVideoOff, BsCameraVideo, BsMic, BsMicMute, BsTelephone } from 'react-icons/bs';

const VideoControls = ({ isAudioMute, setIsAudioMute, toggleVideo, setToggleVideo, myVideoRef }) => {
	const { stream, leaveCall } = useSocketContext();

	const handleToggleVideo = async () => {
		setToggleVideo(!toggleVideo);
		let videoTrack = stream?.getTracks().find((track) => track.kind === 'video');
		let localVideoTrack = myVideoRef.current.srcObject.getTracks().find((track) => track.kind === 'video');
		localVideoTrack.enabled = !localVideoTrack.enabled;
		videoTrack.enabled = !videoTrack.enabled;
	};

	const handleToggleAudio = async () => {
		setIsAudioMute(!isAudioMute);
		let audioTrack = stream?.getTracks().find((track) => track.kind === 'audio');
		let localAudioTrack = myVideoRef.current.srcObject.getTracks().find((track) => track.kind === 'audio');
		localAudioTrack.enabled = !localAudioTrack.enabled;
		audioTrack.enabled = !audioTrack.enabled;
	};

	return (
		<div className="absolute bottom-3 flex gap-2 items-center z-50 ">
			<span
				onClick={handleToggleVideo}
				className="flex justify-center items-center rounded-full w-10 h-10 bg-gray-300 hover:bg-gray-400 cursor-pointer"
			>
				{toggleVideo ? <BsCameraVideo size={22} /> : <BsCameraVideoOff size={22} />}
			</span>
			<span
				onClick={handleToggleAudio}
				className="flex justify-center items-center rounded-full w-10 h-10 bg-gray-300 hover:bg-gray-400 cursor-pointer"
			>
				{!isAudioMute ? <BsMic size={22} /> : <BsMicMute size={22} />}
			</span>
			<span
				onClick={leaveCall}
				className="flex justify-center items-center rounded-full w-10 h-10 bg-red-500 hover:bg-red-600 text-white cursor-pointer"
			>
				<BsTelephone size={22} />
			</span>
		</div>
	);
};

export default VideoControls;
