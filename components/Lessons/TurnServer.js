export const iceServers = [
	{
		urls: 'stun:stun.relay.metered.ca:80',
	},
	{
		urls: 'turn:standard.relay.metered.ca:80',
		username: process.env.NEXT_PUBLIC_ICE_SERVER_USERNAME,
		credential: process.env.NEXT_PUBLIC_ICE_SERVER_CREDENTIAL,
	},
	{
		urls: 'turn:standard.relay.metered.ca:80?transport=tcp',
		username: process.env.NEXT_PUBLIC_ICE_SERVER_USERNAME,
		credential: process.env.NEXT_PUBLIC_ICE_SERVER_CREDENTIAL,
	},
	{
		urls: 'turn:standard.relay.metered.ca:443',
		username: process.env.NEXT_PUBLIC_ICE_SERVER_USERNAME,
		credential: process.env.NEXT_PUBLIC_ICE_SERVER_CREDENTIAL,
	},
	{
		urls: 'turn:standard.relay.metered.ca:443?transport=tcp',
		username: process.env.NEXT_PUBLIC_ICE_SERVER_USERNAME,
		credential: process.env.NEXT_PUBLIC_ICE_SERVER_CREDENTIAL,
	},
];
