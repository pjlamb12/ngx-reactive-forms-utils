import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControlStatus, ValidationErrors } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

export interface FormState<T> {
	value: T;
	status: FormControlStatus;
	errors: ValidationErrors | null;
	touched: boolean;
	dirty: boolean;
	valid: boolean;
	invalid: boolean;
	pending: boolean;
	disabled: boolean;
	enabled: boolean;
}

export function formStateSignal<T>(control: AbstractControl<T>): Signal<FormState<T>> {
	return toSignal(
		control.events.pipe(
			startWith(null),
			map(() => ({
				value: control.value,
				status: control.status,
				errors: control.errors,
				touched: control.touched,
				dirty: control.dirty,
				valid: control.valid,
				invalid: control.invalid,
				pending: control.pending,
				disabled: control.disabled,
				enabled: control.enabled,
			})),
		),
		{
			initialValue: {
				value: control.value,
				status: control.status,
				errors: control.errors,
				touched: control.touched,
				dirty: control.dirty,
				valid: control.valid,
				invalid: control.invalid,
				pending: control.pending,
				disabled: control.disabled,
				enabled: control.enabled,
			},
		},
	);
}
