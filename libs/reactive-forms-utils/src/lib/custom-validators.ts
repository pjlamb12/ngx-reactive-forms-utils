import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export abstract class CustomValidators {
	static phoneNumber(control: AbstractControl): ValidationErrors | null {
		if (!control.value) {
			return null;
		}
		// eslint-disable-next-line no-useless-escape
		const PHONE_REGEX = /^(1\s?)?((\([2-9][0-9]{2}\))|[2-9][0-9]{2})[\s\-]?[2-9][0-9]{2}[\s\-]?[0-9]{4}$/;
		return PHONE_REGEX.test(control.value) ? null : { phoneNumber: true };
	}

	static number(control: AbstractControl): ValidationErrors | null {
		// eslint-disable-next-line no-useless-escape
		const NUMBER_REGEX = /^([0-9])*([\.])?[0-9]+$/;
		return NUMBER_REGEX.test(control.value) ? null : { number: true };
	}

	static validZipCode(control: AbstractControl): ValidationErrors | null {
		if (!control.value) {
			return null;
		}

		// XXXXX or XXXXX-XXXX
		const ZIP_REGEX = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		return ZIP_REGEX.test(control.value) ? null : { validZipCode: true };
	}

	static confirmStringMatch(field1: string, field2: string): ValidatorFn {
		return (form): ValidationErrors | null => {
			const valueControl = form.get(field1);
			const confirmValueControl = form.get(field2);

			if (!valueControl || !confirmValueControl || !valueControl.value || !confirmValueControl.value) {
				return null;
			}

			if (confirmValueControl.errors && !confirmValueControl.errors[field2]) {
				return null;
			}

			if (valueControl.value !== confirmValueControl.value) {
				confirmValueControl.setErrors({ confirmStringMatch: { field1, field2 } });
				return { confirmStringMatch: { field1, field2 } };
			}

			confirmValueControl.setErrors(null);
			return null;
		};
	}
}
