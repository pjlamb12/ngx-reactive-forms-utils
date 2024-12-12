import { FormGroup } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';

export function debugForm(form: FormGroup): Observable<any> {
	return combineLatest([
		form.valueChanges.pipe(startWith(form.value)),
		form.statusChanges.pipe(startWith(form.status)),
	]).pipe(
		map(() => {
			const formValue = form.value;
			const formErrors = form.errors;
			const controlErrors = Object.keys(form.controls).reduce(
				(acc, controlName) => ({
					...acc,
					[controlName]: form.get(controlName)?.errors,
				}),
				{},
			);

			return {
				value: formValue,
				formErrors,
				controlErrors,
				status: form.status, // Include overall form status
			};
		}),
	);
}
