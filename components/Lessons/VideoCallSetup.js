import { useState, useRef } from 'react';
import { useSocketContext } from '../../context/socket-context';
import VideoCallNotification from './VideoCallNotification';

const VideoCallSetup = () => {
	const { setStartVideo, startVideo, me, callUser } = useSocketContext();
	const [textCopied, setTextCopied] = useState(false);

	const idToCall = useRef(null);

	const handleCopy = () => {
		navigator.clipboard.writeText(me);
		setTextCopied(true);
		setTimeout(() => {
			setTextCopied(false);
		}, 2000);
	};

	return (
		<>
			{!startVideo ? (
				<div className="h-full p-4 flex flex-col gap-3 items-center justify-center">
					<h2 className="text-2xl text-center">Click on the button below to start a video session.</h2>
					<button onClick={() => setStartVideo(true)} className="bg-blueLight py-3 px-4 text-lg rounded-md text-white font-medium">
						Start Video
					</button>
				</div>
			) : (
				<>
					<div className="h-full p-4 flex flex-col gap-8 items-center justify-center">
						<h2 className="text-2xl text-center">
							Share this ID with your student to setup a video call, once a student joins, video call will be started
						</h2>
						<div className="flex gap-2 relative">
							<span className="bg-gray-300 border-2 font-medium border-gray-600 rounded-md py-3 px-5 text-lg">{me}</span>
							<button className="bg-blueLight py-3 px-4 text-lg rounded-md text-white font-medium" onClick={handleCopy}>
								Copy ID
							</button>
							{textCopied && <span className="absolute -bottom-8 w-full font-medium text-lg">ID copied to clipboard!</span>}
						</div>
					</div>
					<div className="h-full p-4 flex items-center justify-center">
						<input
							type="text"
							placeholder="Enter ID to join video call"
							className="bg-gray-300 w-full font-medium  py-3 px-5 text-lg"
							ref={idToCall}
						/>
						<button className="bg-blueLight py-3 px-5 text-lg  text-white font-medium" onClick={() => callUser(idToCall.current.value)}>
							Join
						</button>
					</div>
				</>
			)}

			<VideoCallNotification />
		</>
	);
};

export default VideoCallSetup;
