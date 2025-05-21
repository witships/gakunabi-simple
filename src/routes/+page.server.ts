import fs from 'fs';
import path from 'path';
import { error } from '@sveltejs/kit';

export function load() {
	const filePath = path.resolve('static', 'courses.json');
	try {
		const jsonData = fs.readFileSync(filePath, 'utf-8');
		const couseList = JSON.parse(jsonData);
		return {
			couseList: couseList,
			showSearch: true,
			pageTitle: ''
		};
	} catch (err) {
		let errorMessage = 'An unknown error occurred';
		if (err instanceof Error) {
			errorMessage = err.message;
		}
		console.error(`couseListがありません:`, errorMessage);
		error(404, { message: `couseListがありません` });
	}
}
export const prerender = true;
