import { AbstractControl, Form, FormControlStatus, FormGroup, ValidationErrors } from '@angular/forms';
import { combineLatest, EMPTY, map, Observable, of, startWith } from 'rxjs';

export enum FormDebugFieldEnum {
	Value = 'Value',
	FormErrors = 'FormErrors',
	ControlErrors = 'ControlErrors',
	Status = 'Status',
	Valid = 'Valid',
	Invalid = 'Invalid',
}
export type FormDebugField =
	| FormDebugFieldEnum.Value
	| FormDebugFieldEnum.FormErrors
	| FormDebugFieldEnum.ControlErrors
	| FormDebugFieldEnum.Status
	| FormDebugFieldEnum.Valid
	| FormDebugFieldEnum.Invalid;

export interface FormDebugValue {
	value?: Record<string, any>;
	formErrors?: ValidationErrors | null;
	controlErrors?: Record<string, ValidationErrors | null>;
	status?: FormControlStatus;
	valid?: boolean;
	invalid?: boolean;
}

export const DEFAULT_DEBUG_FIELDS: FormDebugField[] = Object.keys(FormDebugFieldEnum).map(
	(key) => key as FormDebugFieldEnum,
);

export function debugForm(
	form: FormGroup,
	debugFields: FormDebugField[] = [...DEFAULT_DEBUG_FIELDS],
): Observable<FormDebugValue | typeof EMPTY> {
	if (!form) {
		return of(EMPTY);
	}

	return combineLatest([
		form.valueChanges.pipe(startWith(form.value)),
		form.statusChanges.pipe(startWith(form.status)),
	]).pipe(
		map(() => {
			const returnObject: FormDebugValue = {};

			if (debugFields.includes(FormDebugFieldEnum.Value)) {
				returnObject.value = form.value;
			}

			if (debugFields.includes(FormDebugFieldEnum.FormErrors)) {
				returnObject.formErrors = form.errors;
			}

			if (debugFields.includes(FormDebugFieldEnum.ControlErrors)) {
				const controlErrors = Object.keys(form.controls).reduce(
					(acc, controlName) => ({
						...acc,
						[controlName]: form.get(controlName)?.errors,
					}),
					{},
				);
				returnObject.controlErrors = controlErrors;
			}

			if (debugFields.includes(FormDebugFieldEnum.Status)) {
				returnObject.status = form.status;
			}

			if (debugFields.includes(FormDebugFieldEnum.Valid)) {
				returnObject.valid = form.valid;
			}

			return returnObject;
		}),
	);
}
