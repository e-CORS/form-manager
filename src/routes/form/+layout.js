export async function load({ url }) {
	let formId = url.searchParams.get('formId');
	return { formId };
}
