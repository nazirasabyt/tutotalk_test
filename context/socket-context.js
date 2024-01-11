import { useRef, useReducer, useEffect, useContext, createContext, useCallback } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { iceServers } from './../components/Lessons/TurnServer';

const SocketContext = createContext();

const socket = io('http://localhost:3005');

const initialState = {
	startVideo: false,
	me: '',
	stream: null,
	call: {},
	callAccepted: false,
	callEnded: false,
	name: '',
	isTeacher: false,
	roomId: '',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_START_VIDEO':
			return { ...state, startVideo: action.payload };
		case 'SET_ME':
			return { ...state, me: action.payload };
		case 'SET_STREAM':
			return { ...state, stream: action.payload };
		case 'SET_CALL':
			return { ...state, call: action.payload };
		case 'SET_CALL_ACCEPTED':
			return { ...state, callAccepted: action.payload };
		case 'SET_CALL_ENDED':
			if (state.stream) {
				state.stream.getTracks().forEach((track) => track.stop());
			}
			return { ...state, callEnded: action.payload };
		case 'SET_NAME':
			return { ...state, name: action.payload };
		case 'SET_IS_TEACHER':
			return { ...state, isTeacher: action.payload };
		case 'SET_ROOM_ID':
			return { ...state, roomId: action.payload };
		default:
			return state;
	}
};

const SocketProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();

	const initSocket = () => {
		socket.on('me', (clientId) => {
			dispatch({ type: 'SET_ME', payload: clientId });
		});

		socket.on('callUser', ({ from, name: callerName, signal, userToCall }) => {
			dispatch({ type: 'SET_CALL', payload: { isReceivedCall: true, from, name: callerName, signal, userToCall } });
		});

		socket.on('callEnded', () => {
			console.log('call ended');
			socket.disconnect();
			dispatch({ type: 'SET_START_VIDEO', payload: false });
		});
	};

	const setMyId = async (clientId) => {
		socket.emit('setMyId', clientId);
	};

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((currentStream) => {
				dispatch({ type: 'SET_STREAM', payload: currentStream });

				//myVideo.current.srcObject = currentStream;
			})
			.catch((err) => console.log(err));

		initSocket();
	}, []);

	console.log('state', state);

	const answerCall = async () => {
		dispatch({ type: 'SET_CALL_ACCEPTED', payload: true });

		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: state.stream,
			iceServers,
		});

		peer.on('signal', (data) => {
			socket.emit('answerCall', { signal: data, to: state.call.from, name: state.name });
		});

		peer.on('stream', (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		peer.signal(state.call.signal);

		peer.on('close', () => {
			socket.off('callAccepted');
			dispatch({ type: 'SET_CALL_ENDED', payload: true });
		});

		connectionRef.current = peer;
	};

	const callUser = async (id) => {
		/*
		if (connectionRef.current) {
			connectionRef.current.destroy();
			connectionRef.current = null;
		}
*/

		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: state.stream,
			iceServers,
		});

		peer.on('signal', (data) => {
			socket.emit('callUser', {
				targetCustomId: id,
				signalData: data,
				from: state.me,
				name: state.name,
			});
		});

		peer.on('stream', (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		socket.on('callAccepted', (data) => {
			dispatch({ type: 'SET_CALL_ACCEPTED', payload: true });
			dispatch({ type: 'SET_CALL', payload: { teacher: data.name } });
			peer.signal(data.signal);
		});

		peer.on('close', () => {
			socket.off('callAccepted');
			dispatch({ type: 'SET_CALL_ENDED', payload: true });
		});

		connectionRef.current = peer;
	};

	const leaveCall = async () => {
		connectionRef.current.destroy();

		socket.emit('callEnded');
		socket.disconnect();
		dispatch({ type: 'SET_CALL_ENDED', payload: true });
		dispatch({ type: 'SET_START_VIDEO', payload: false });
		dispatch({ type: 'SET_CALL_ACCEPTED', payload: false });
		dispatch({ type: 'SET_CALL', payload: {} });
		dispatch({ type: 'SET_STREAM', payload: null });
		dispatch({ type: 'SET_ME', payload: '' });
		dispatch({ type: 'SET_NAME', payload: '' });
		socket.connect();
		dispatch({ type: 'SET_CALL_ENDED', payload: false });
	};

	const contextValues = {
		call: state.call,
		callAccepted: state.callAccepted,
		myVideo,
		userVideo,
		stream: state.stream,
		name: state.name,
		setName: (name) => dispatch({ type: 'SET_NAME', payload: name }),
		callEnded: state.callEnded,
		me: state.me,
		setMe: (me) => dispatch({ type: 'SET_ME', payload: me }),
		callUser,
		leaveCall,
		answerCall,
		startVideo: state.startVideo,
		setStartVideo: (startVideo) => dispatch({ type: 'SET_START_VIDEO', payload: startVideo }),
		setMyId,
		setIsTeacher: (isTeacher) => dispatch({ type: 'SET_IS_TEACHER', payload: isTeacher }),
		setRoomId: (roomId) => dispatch({ type: 'SET_ROOM_ID', payload: roomId }),
	};

	return <SocketContext.Provider value={contextValues}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => useContext(SocketContext);

export default SocketProvider;
