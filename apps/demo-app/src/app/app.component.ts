import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { addCustomErrorMessage, CustomValidators } from 'ngx-reactive-forms-utils';

@Component({
	selector: 'ngx-reactive-form-utils-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'demo-app';
	form = this._fb.group({
		name: ['', [Validators.required, Validators.minLength(9)]],
		email: ['', [Validators.required, Validators.email]],
		age: [null, [Validators.min(5), CustomValidators.number]],
	});

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		addCustomErrorMessage('number', () => 'You must supply a number for this input');
	}
}
