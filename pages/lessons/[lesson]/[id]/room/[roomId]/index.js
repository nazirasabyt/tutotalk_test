import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Lesson from '@/components/Lessons/Lesson';
import Head from 'next/head';
import axios from 'axios';
import { parseCookies } from 'nookies';
import UseHomeworkContext from '@/hooks/useHomeworkContext';
import ArrowSvg from '@/components/Shared/ArrowSvg';
import NodeCache from 'node-cache';
const myCache = new NodeCache({ stdTTL: 1000, checkperiod: 120 });

const LessonRoom = dynamic(() => import('../../../../../../components/Lessons/LessonRoom'), { ssr: false });

const VideoRoom = ({ data, lessonType, roomId }) => {
	console.log('ssr', roomId);
	const { dispatch } = UseHomeworkContext();

	const updateLocalStorage = (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	useEffect(() => {
		if (!data) return;

		const { wordlist } = data;
		dispatch({ type: 'SPRINT_TASK', payload: wordlist });
		updateLocalStorage('wordList', wordlist);
	}, [data, dispatch]);

	return (
		<>
			<Head>
				<title>TutoTalk</title>
				<meta name="description" content="Effective Learning" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="manifest" href="/manifest.json" />
			</Head>
			<div className="flex relative bg-white">
				{data && <Lesson data={data} lessonType={lessonType} />}
				<div className="mt-10 -ml-5 z-40 cursor-pointer hidden sm:flex">
					{' '}
					<ArrowSvg />
				</div>
				<LessonRoom roomId={roomId} />
			</div>
		</>
	);
};

export default VideoRoom;

function findLessonById(courses, lessonId) {
	let foundLesson = null;
	courses.forEach((course) => {
		course.lessons.forEach((lesson) => {
			if (lesson.id === lessonId) {
				foundLesson = lesson;
			}
		});
	});
	return foundLesson;
}

export async function getServerSideProps(ctx) {
	// get the room id from the url

	const { lesson, id, roomId } = ctx.params;
	const cookies = parseCookies(ctx);
	const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

	if (!apiUrl) {
		console.error('Environment variable NEXT_PUBLIC_STRAPI_URL is not set.');
		return { props: { data: [] } };
	}

	const cacheKey = `lessonData-${lesson}-${id}`;
	const cachedData = myCache.get(cacheKey);

	// Return cached data if it exists
	if (cachedData) {
		return { props: { data: cachedData, lessonType: lesson, roomId } };
	}

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${cookies.jwt}`,
	};

	try {
		const url = `${apiUrl}/api/users/me?populate[${lesson}][populate]=*`;
		const { data } = await axios.get(url, { headers });

		const extractedData = data[lesson];
		const filteredData = findLessonById(extractedData, id);

		// Set data in cache
		myCache.set(cacheKey, filteredData);

		return {
			props: { data: filteredData, lessonType: lesson, roomId },
		};
	} catch (error) {
		console.error('Server-side props error:', error.message);
		return { props: { data: [] } };
	}
}
