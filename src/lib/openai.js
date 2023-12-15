import OpenAI from 'openai';

const openai = new OpenAI();
const form =
	"{formTitle: 'title',formFields: [{id: 'field_1',label: 'Text Input',type: 'text',placeholder: 'Enter text here',required: true},{id: 'field_2',label: 'Number Input',type: 'number',placeholder: 'Enter a number',required: false},{id: 'field_3',label: 'Checkbox',type: 'checkbox',options: [{ label: 'Option 1', value: 'option_1' },{ label: 'Option 2', value: 'option_2' }],required: true},{id: 'field_4',label: 'Dropdown',type: 'select',options: [{ label: 'Option 1', value: 'option_1' },{ label: 'Option 2', value: 'option_2' }],required: false}]};";
export async function createFormWithAI(userPrompt) {
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content:
					'You are a helpful assistant designed to create JSON objects with the fields formTitle and formFields, formTitle represents the form name and formFields each input that the form haves in order to accomplish what was requested by the user.'
			},
			{
				role: 'user',
				content: `The user wants a form that does the following: ${userPrompt.promptext}. Make sure your response is a Json string that has a structure similar to this one: ${form}, use the example as a base to build a new form that meets the needs of what the user requested.`
			}
		],
		response_format: { type: 'json_object' },
		model: 'gpt-3.5-turbo-1106'
	});

	const inputResult = completion.choices[0].message.content;
	return inputResult;
}
