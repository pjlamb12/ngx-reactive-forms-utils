import { Component, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formStateSignal } from './signals';

describe('formStateSignal', () => {
	let control: FormControl<string | null>;

	beforeEach(() => {
		control = new FormControl('initial');
	});

	it('should return initial state', () => {
		runInInjectionContext(TestBed, () => {
			const state = formStateSignal(control);
			expect(state().value).toBe('initial');
			expect(state().valid).toBe(true);
			expect(state().dirty).toBe(false);
			expect(state().touched).toBe(false);
		});
	});

	it('should update on value change', () => {
		runInInjectionContext(TestBed, () => {
			const state = formStateSignal(control);
			control.setValue('new value');
			expect(state().value).toBe('new value');
		});
	});

	it('should update on status change (valid/invalid)', () => {
		control.setValidators(Validators.required);
		runInInjectionContext(TestBed, () => {
			const state = formStateSignal(control);
			expect(state().valid).toBe(true);

			control.setValue('');
			expect(state().valid).toBe(false);
			expect(state().errors?.['required']).toBe(true);
		});
	});

	it('should update on touched status', () => {
		runInInjectionContext(TestBed, () => {
			const state = formStateSignal(control);
			expect(state().touched).toBe(false);

			control.markAsTouched();
			expect(state().touched).toBe(true);
		});
	});

	it('should update on dirty status', () => {
		runInInjectionContext(TestBed, () => {
			const state = formStateSignal(control);
			expect(state().dirty).toBe(false);

			control.markAsDirty();
			expect(state().dirty).toBe(true);
		});
	});

	it('should work with FormGroup', () => {
		const group = new FormGroup({
			name: new FormControl(''),
		});
		runInInjectionContext(TestBed, () => {
			const state = formStateSignal(group);
			expect(state().value).toEqual({ name: '' });

			group.get('name')?.setValue('updated');
			expect(state().value).toEqual({ name: 'updated' });
		});
	});
});
