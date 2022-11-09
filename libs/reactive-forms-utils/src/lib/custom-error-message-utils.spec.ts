import { addCustomErrorMessage, defaultCustomErrorMessages } from './custom-error-message-utils';

describe('Error Utils', () => {
	const startingCustomErrorMessages = { ...defaultCustomErrorMessages };
	it('should add a custom error message', () => {
		addCustomErrorMessage('test', () => 'test');

		expect(defaultCustomErrorMessages).toStrictEqual({
			...startingCustomErrorMessages,
			test: expect.any(Function),
		});
	});
});
