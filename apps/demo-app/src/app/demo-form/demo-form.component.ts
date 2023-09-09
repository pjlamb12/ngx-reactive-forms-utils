import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addCustomErrorMessage, CustomValidators } from 'ngx-reactive-forms-utils';

@Component({
	selector: 'ngx-reactive-form-utils-demo-form',
	templateUrl: './demo-form.component.html',
	styleUrls: ['./demo-form.component.scss'],
})
export class DemoFormComponent implements OnInit {
	private options: AbstractControlOptions = {
		validators: [CustomValidators.confirmStringMatch('password', 'confirmPassword')],
	};
	private _currentForm!: FormGroup;
	set currentForm(value: FormGroup) {
		this._currentForm = value;
	}
	get currentForm() {
		return this._currentForm;
	}

	public form: FormGroup = this.createNewForm();
	public form2: FormGroup = this.createNewForm();

	private createNewForm() {
		return this._fb.nonNullable.group(
			{
				numberOnly: [null, [Validators.required, CustomValidators.number]],
				phone: ['', [Validators.required, CustomValidators.phoneNumber]],
				zipCode: ['', [Validators.required, CustomValidators.validZipCode]],
				password: ['', [Validators.required]],
				confirmPassword: ['', [Validators.required]],
			},
			this.options,
		);
	}

	constructor(private _fb: FormBuilder) {
		this.currentForm = this.form;
	}

	ngOnInit(): void {
		addCustomErrorMessage('phoneNumber', () => 'Please enter a valid phone number');
		addCustomErrorMessage('validZipCode', () => 'Please enter a valid zip code');
	}

	swapForms() {
		this.currentForm = this.form2;
	}
}
