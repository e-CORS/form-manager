export async function load({ url }) {
	let formId = url.searchParams.get('formId');
	console.log({ formId }, '.... loading');
	return { formId };
}
