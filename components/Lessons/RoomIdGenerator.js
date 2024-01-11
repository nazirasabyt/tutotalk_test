import { useRouter } from 'next/router';

const RoomIdGenerator = () => {
	const { asPath } = useRouter();
	const router = useRouter();
	const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

	const URL = `${origin}${asPath}`;
	console.log(URL);

	const getId = async () => {
		const response = await fetch(`http://localhost:3005/get-id`);
		const data = await response.json();
		return data;
	};

	const handleClick = async () => {
		const id = await getId();
		console.log(id);
		if (id) {
			router.push(`${URL}/room/${id.id}`);
		}
	};

	return (
		<div className=" hidden md:flex flex-col items-center justify-center fixed  top-0 right-0 w-[35%] gap-4 h-screen">
			<button className="bg-blueSecondary text-white px-4 py-2 rounded-md hover:bg-blue-700 text-base font-medium" onClick={handleClick}>
				Start Session
			</button>
		</div>
	);
};

export default RoomIdGenerator;
