import OpenAI from 'openai';

const openai = new OpenAI();
const form =
	"{formTitle: 'title',formFields: [{id: 'field_1',label: 'Text Input',type: 'text',placeholder: 'Enter text here',required: true},{id: 'field_2',label: 'Number Input',type: 'number',placeholder: 'Enter a number',required: false},{id: 'field_3',label: 'Checkbox',type: 'checkbox',options: [{ label: 'Option 1', value: 'option_1' },{ label: 'Option 2', value: 'option_2' }],required: true},{id: 'field_4',label: 'Dropdown',type: 'select',options: [{ label: 'Option 1', value: 'option_1' },{ label: 'Option 2', value: 'option_2' }],required: false}]};";
async function main() {
	let userPrompt = 'I want a form that allows me to get all the user information';
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: 'You are a helpful assistant designed to help the user create forms.'
			},
			{
				role: 'user',
				content: `The user wants a form that does the following: ${userPrompt}, we have a component that expects a single json string without breaks or spaces with this structure ${form}, so make sure to create the requested form but return the information in a single json string without breaks or spaces that has the same structure as the passed one`
			}
		],
		response_format: { type: 'json_object' },
		model: 'gpt-3.5-turbo-1106'
	});

	const inputResult = completion.choices[0].message.content;
	console.log(inputResult);
	const result = inputResult.replace(/\s+/g, '').replace(/,\n/g, ',');

	console.log({ result: result, raw: inputResult });
}

main();
