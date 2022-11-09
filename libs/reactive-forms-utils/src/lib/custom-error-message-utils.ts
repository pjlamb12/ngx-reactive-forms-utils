import { InjectionToken } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomErrorMesageFunction = (...args: any[]) => string;

export interface CustomErrorMessages {
	// eslint-disable-next-line @typescript-eslint/ban-types
	[key: string]: CustomErrorMesageFunction;
}

export function addCustomErrorMessage(name: string, fn: CustomErrorMesageFunction) {
	defaultCustomErrorMessages[name] = fn;
}

export const defaultCustomErrorMessages: CustomErrorMessages = {
	required: () => `This field is required`,
	minlength: ({ requiredLength, actualLength }: { requiredLength: number; actualLength: number }) =>
		`Expected length of ${requiredLength} but got ${actualLength}`,
	maxlength: ({ requiredLength, actualLength }: { requiredLength: number; actualLength: number }) =>
		`Expected length of ${requiredLength} but got ${actualLength}`,
	min: ({ min }: { min: number }) => `You must provide a minimum value of ${min}.`,
	max: ({ max, actual }: { max: number; actual: number }) =>
		`You entered a value of ${actual}, but the max you can enter is ${max}.`,
	email: () => `Your email address is not valid.`,
	number: () => `This field can only contain numbers.`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
	providedIn: 'root',
	factory: () => defaultCustomErrorMessages,
});
