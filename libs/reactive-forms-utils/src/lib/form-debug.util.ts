import {
	AbstractControl,
	ControlEvent,
	FormControlStatus,
	FormGroup,
	PristineChangeEvent,
	TouchedChangeEvent,
	ValidationErrors,
} from '@angular/forms';
import { combineLatest, EMPTY, filter, map, Observable, of, startWith } from 'rxjs';

function touchedEvents$<T>(form: AbstractControl<T>) {
	return form.events.pipe(
		filter((event: ControlEvent): event is TouchedChangeEvent => event instanceof TouchedChangeEvent),
	);
}

function pristineEvents$<T>(form: AbstractControl<T>) {
	return form.events.pipe(
		filter((event: ControlEvent): event is PristineChangeEvent => event instanceof PristineChangeEvent),
	);
}

export enum FormDebugFieldEnum {
	Value = 'Value',
	FormErrors = 'FormErrors',
	ControlErrors = 'ControlErrors',
	Status = 'Status',
	Valid = 'Valid',
	Invalid = 'Invalid',
	Touched = 'Touched',
	Untouched = 'Untouched',
	Dirty = 'Dirty',
	Pristine = 'Pristine',
}
export type FormDebugField =
	| FormDebugFieldEnum.Value
	| FormDebugFieldEnum.FormErrors
	| FormDebugFieldEnum.ControlErrors
	| FormDebugFieldEnum.Status
	| FormDebugFieldEnum.Valid
	| FormDebugFieldEnum.Invalid
	| FormDebugFieldEnum.Touched
	| FormDebugFieldEnum.Untouched
	| FormDebugFieldEnum.Dirty
	| FormDebugFieldEnum.Pristine;

export interface ControlErrorStatusDisplay {
	errors: ValidationErrors | null;
	status: FormControlStatus;
}
export interface FormDebugValue {
	value?: Record<string, any>;
	formErrors?: ValidationErrors | null;
	controlErrors?: Record<string, ControlErrorStatusDisplay>;
	status?: FormControlStatus;
	valid?: boolean;
	invalid?: boolean;
	touched?: boolean;
	untouched?: boolean;
	dirty?: boolean;
	pristine?: boolean;
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
		touchedEvents$(form).pipe(startWith(form.touched)),
		pristineEvents$(form).pipe(startWith(form.pristine)),
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
					(acc, controlName) => {
						const control = form.get(controlName);
						return {
							...acc,
							[controlName]: {
								errors: control?.errors,
								status: control?.status,
							},
						} as Record<string, ControlErrorStatusDisplay>;
					},
					{} as Record<string, ControlErrorStatusDisplay>,
				);

				returnObject.controlErrors = controlErrors;
			}

			if (debugFields.includes(FormDebugFieldEnum.Status)) {
				returnObject.status = form.status;
			}

			if (debugFields.includes(FormDebugFieldEnum.Valid)) {
				returnObject.valid = form.valid;
			}

			if (debugFields.includes(FormDebugFieldEnum.Touched)) {
				returnObject.touched = form.touched;
			}

			if (debugFields.includes(FormDebugFieldEnum.Untouched)) {
				returnObject.untouched = form.untouched;
			}

			if (debugFields.includes(FormDebugFieldEnum.Dirty)) {
				returnObject.dirty = form.dirty;
			}

			if (debugFields.includes(FormDebugFieldEnum.Pristine)) {
				returnObject.pristine = form.pristine;
			}

			return returnObject;
		}),
	);
}
