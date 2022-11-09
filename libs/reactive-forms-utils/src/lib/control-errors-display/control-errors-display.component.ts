import { AfterContentInit, Component, ContentChild, HostBinding, Inject, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CustomErrorMessages, FORM_ERRORS } from '../custom-error-message-utils';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[ngxControlErrorsDisplay]',
	templateUrl: './control-errors-display.component.html',
	styleUrls: ['./control-errors-display.component.scss'],
})
export class ControlErrorsDisplayComponent implements AfterContentInit {
	@Input() cssClasses = '';
	rules = ['touched'];

	@ContentChild(NgControl, { static: true }) control!: NgControl;

	@HostBinding('class.hasError') get setErrorClass() {
		return this._hasError;
	}

	_text = '';

	get _hasError() {
		return this._text && this.rules.every((rule) => this.control[rule as keyof NgControl]);
	}

	private _errorMessages: CustomErrorMessages = this._errors;

	constructor(@Inject(FORM_ERRORS) private _errors: CustomErrorMessages) {}

	ngAfterContentInit() {
		if (this.control) {
			// Set error here in case form is initialized with invalid data
			this._text = this.setError();
			this.control.statusChanges?.pipe().subscribe(() => {
				this._text = this.setError();
			});
		}
	}

	private setError() {
		const errors = this.control.errors;
		let text = '';

		if (errors) {
			text = Object.keys(errors).reduce((html, errorKey) => {
				const getError = this._errorMessages[errorKey];
				const nextErrorText = getError ? getError(errors[errorKey]) : 'Unknown Error';

				const newParagraph = `<p>${nextErrorText}</p>`;
				return (html += newParagraph);
			}, '');
		}

		return text;
	}
}
