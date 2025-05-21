import fs from 'node:fs';
import path from 'node:path';
import { error } from '@sveltejs/kit';

// courses.json から読み込むコース情報の型定義
interface CourseInfo {
	id: string;
	name: string;
	// 他に必要なプロパティがあれば追加
}

// シナリオデータの型定義 (以前のやり取りから引用・調整)
interface ScenarioPageSubtitle {
	text: string;
	color?: string;
	slide: string;
	actorImg: string;
	voice: string;
	anime: boolean;
	listener?: string;
}

interface ScenarioPage {
	title: string;
	subtitle: ScenarioPageSubtitle[];
}

interface ScenarioData {
	courseName: string; // シナリオJSON内のコース名
	chapterId: string;
	chapterName: string;
	page: ScenarioPage[];
}

// プロジェクトルートからの相対パスで courses.json を指定
const COURSES_JSON_PATH = path.resolve(process.cwd(), 'static/courses.json');

export async function entries() {
	try {
		if (!fs.existsSync(COURSES_JSON_PATH)) {
			console.warn(
				`[entries] Courses JSON file not found at ${COURSES_JSON_PATH}. No dynamic entries will be generated for /[id].`
			);
			return [];
		}
		const coursesJson = fs.readFileSync(COURSES_JSON_PATH, 'utf-8');
		const courses: CourseInfo[] = JSON.parse(coursesJson);

		if (!Array.isArray(courses)) {
			console.error('[entries] courses.json is not an array. Cannot generate entries.');
			return [];
		}

		return courses.map((course) => ({ id: course.id }));
	} catch (e) {
		console.error('[entries] Failed to load or parse courses.json:', e);
		return []; // エラー発生時は空配列を返し、ビルド失敗を避ける（ただしページは生成されない）
	}
}

export async function load({
	params
}): Promise<{ courseId: string; scenario: ScenarioData; courseName: string }> {
	const { id: courseId } = params;

	// scenario.json のパスを構築
	const scenarioFilePath = path.resolve(process.cwd(), `static/${courseId}/scenario.json`);

	if (!fs.existsSync(scenarioFilePath)) {
		throw error(404, `Scenario data not found for course ${courseId} at ${scenarioFilePath}`);
	}

	try {
		const scenarioJson = fs.readFileSync(scenarioFilePath, 'utf-8');
		const scenarioData: ScenarioData = JSON.parse(scenarioJson);

		return {
			courseId: courseId,
			scenario: scenarioData,
			courseName: scenarioData.courseName // シナリオJSON内のコース名を使用
		};
	} catch (e) {
		console.error(`[load] Failed to load or parse scenario.json for course ${courseId}:`, e);
		throw error(500, `Could not load scenario data for ${courseId}`);
	}
}

export const prerender = true; // このルートをプリレンダリング対象としてマーク
