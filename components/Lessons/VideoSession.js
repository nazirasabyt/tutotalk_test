import VideoCallSetup from './VideoCallSetup';
import VideoCall from './VideoCall';
import { useSocketContext } from '../../context/socket-context';
import React, { useEffect, useMemo } from 'react';
import VideoCallNotification from './VideoCallNotification';

const VideoSession = ({ roomId, isTeacher, userName }) => {
	const { setMyId, setIsTeacher, setName } = useSocketContext();

	useEffect(() => {
		(async () => {
			setMyId(roomId);
		})();
		setName(userName);
		setIsTeacher(isTeacher);
	}, []);

	return (
		<div className=" h-full flex flex-col">
			<VideoCall />
		</div>
	);
};

export default VideoSession;

/*
const { callAccepted, stream, callEnded } = useSocketContext();

if (!callAccepted && !callEnded) {
	return <VideoCallSetup />;
} else if (callAccepted && !callEnded) {
	return <VideoCall />;
} else if (!callAccepted && callEnded) {
	return <VideoCallSetup />;
}
*/
//return <>{!callAccepted && !callEnded ? <VideoCallSetup /> : <VideoCall />}</>;
