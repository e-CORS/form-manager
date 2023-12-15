import { createFormWithAI } from '$lib/openai.js';
import { json } from '@sveltejs/kit';
export async function POST({ request }) {
	const data = await request.json();
	if (!data?.promptText) throw new Error("Couldn't retrieve data from requets");

	const form = await createFormWithAI(data);
	return json({
		form
	});
}
