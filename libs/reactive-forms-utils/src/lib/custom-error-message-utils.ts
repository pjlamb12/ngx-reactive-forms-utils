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
	confirmStringMatch: ({ field1, field2 }) => {
		const formattedField1: string = field1.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toLowerCase();
		const formattedField2: string = field2.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toLowerCase();
		return `The values of ${formattedField1} and ${formattedField2} don't match.`;
	},
	minAge: ({ minAge, actual }) => `You must be at least ${minAge} years old. You are currently ${actual} years old.`,
	maxAge: ({ maxAge, actual }) =>
		`You must be no more than ${maxAge} years old. You are currently ${actual} years old.`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
	providedIn: 'root',
	factory: () => defaultCustomErrorMessages,
});

export const FORM_ERRORS_DEBOUNCE_TIME = new InjectionToken('FORM_ERRORS_DEBOUNCE_TIME', {
	providedIn: 'root',
	factory: () => 0,
});
