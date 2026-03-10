import { AfterViewChecked, Component, contentChild, effect, inject, input, signal } from '@angular/core';
import { NgControl } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs';
import { CustomErrorMessages, FORM_ERRORS, FORM_ERRORS_DEBOUNCE_TIME } from '../custom-error-message-utils';

@Component({
	selector: 'ngx-control-errors-display',
	templateUrl: './control-errors-display.component.html',
	styleUrls: ['./control-errors-display.component.scss'],
	standalone: true,
	imports: [],
})
export class ControlErrorsDisplayComponent implements AfterViewChecked {
	containerClasses = input<string>('');
	errorClasses = input<string>('');
	rules = input<string[]>(['touched']);
	ariaLive = input<'polite' | 'assertive' | 'off'>('assertive');

	control = contentChild(NgControl);

	private static nextId = 0;
	readonly errorContainerId = `ngx-control-errors-${ControlErrorsDisplayComponent.nextId++}`;

	private _errors = inject(FORM_ERRORS);
	private _debounceTime = inject(FORM_ERRORS_DEBOUNCE_TIME);
	private _errorMessages: CustomErrorMessages = this._errors;

	get rulesBroken() {
		const control = this.control();
		return !!control && this.rules().every((rule) => control[rule as keyof NgControl]);
	}

	errorsList = signal<string[]>([]);

	constructor() {
		effect((onCleanup) => {
			const control = this.control();
			if (control) {
				const statusChanges$ = control.statusChanges?.pipe(startWith(control.status));
				const debouncedStatusChanges$ =
					this._debounceTime > 0 && statusChanges$
						? statusChanges$.pipe(debounceTime(this._debounceTime))
						: statusChanges$;

				const sub = debouncedStatusChanges$
					?.pipe(
						map(() => {
							const errors = control.errors;

							if (errors) {
								return Object.keys(errors).map((errorKey) => {
									const getError = this._errorMessages[errorKey];
									return getError ? getError(errors[errorKey]) : 'Unknown Error';
								});
							}
							return [];
						}),
					)
					.subscribe((errors) => this.errorsList.set(errors));

				onCleanup(() => sub?.unsubscribe());
			}
		});
	}

	ngAfterViewChecked() {
		this.updateControlAria();
	}

	private updateControlAria() {
		const control = this.control();
		const el =
			(control?.valueAccessor as any)?._elementRef?.nativeElement ||
			(control?.valueAccessor as any)?.element?.nativeElement ||
			(control as any)?._elementRef?.nativeElement;

		if (el && this.errorsList().length > 0 && this.rulesBroken) {
			el.setAttribute('aria-invalid', 'true');
			el.setAttribute('aria-describedby', this.errorContainerId);
		} else if (el) {
			el.removeAttribute('aria-invalid');
			el.removeAttribute('aria-describedby');
		}
	}
}
