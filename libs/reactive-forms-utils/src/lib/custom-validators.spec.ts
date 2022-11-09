import { FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
	describe('phoneNumber', () => {
		it('should accept valid US phone number ', () => {
			const value = '(213) 259-0196';
			const result = CustomValidators.phoneNumber(new FormControl(value));
			expect(result).toBeNull();
		});

		it('should accept number without hyphen between central office code and line number', () => {
			const value = '(213) 259 0196';
			const result = CustomValidators.phoneNumber(new FormControl(value));
			expect(result).toBeNull();
		});

		it('should return error if phone number is invalid', () => {
			const value = 'foobar';
			const result = CustomValidators.phoneNumber(new FormControl(value));
			expect(result).toEqual({ phoneNumber: true });
		});

		it('should return error if number contains characters', () => {
			const value = '(213) 2f9-0196';
			const result = CustomValidators.phoneNumber(new FormControl(value));
			expect(result).toEqual({ phoneNumber: true });
		});

		describe('area code', () => {
			it('should accept area code without parenthesis', () => {
				const value = '213 259-0196';
				const result = CustomValidators.phoneNumber(new FormControl(value));
				expect(result).toBeNull();
			});

			it('should accept area code in parenthesis', () => {
				const value = '(213) 259-0196';
				const result = CustomValidators.phoneNumber(new FormControl(value));
				expect(result).toBeNull();
			});

			it('should error if area code is missing', () => {
				const value = '259-0196';
				const result = CustomValidators.phoneNumber(new FormControl(value));
				expect(result).not.toBeNull();
			});

			test.each(['011 259-0196', '11 259-0196', '1 259-0196'])(
				'should return error if area code is invalid › %s',
				(number) => {
					const result = CustomValidators.phoneNumber(new FormControl(number));
					expect(result).not.toBeNull();
				},
			);
		});

		describe('central office code', () => {
			it('should accept valid code', () => {
				const value = '(213) 259-0196';
				const result = CustomValidators.phoneNumber(new FormControl(value));
				expect(result).toBeNull();
			});

			it('should error if code is missing', () => {
				const value = '259 0196';
				const result = CustomValidators.phoneNumber(new FormControl(value));
				expect(result).not.toBeNull();
			});

			test.each(['(213) 059-0196', '(213) 159-0196'])('should error if code is < 2 › %s', (number) => {
				const result = CustomValidators.phoneNumber(new FormControl(number));
				expect(result).not.toBeNull();
			});

			test.each(['(213) 59-0196', '(213) 9-0196', '(213) -0196'])(
				'should error if code does does not have 3 digits › %s',
				(number) => {
					const result = CustomValidators.phoneNumber(new FormControl(number));
					expect(result).not.toBeNull();
				},
			);
		});

		describe('line number', () => {
			it('should error if line number is < 4 digits', () => {
				const value = '(249) 271 196';
				const result = CustomValidators.phoneNumber(new FormControl(value));
				expect(result).not.toBeNull();
			});

			it('should accept valid line number', () => {
				const value = '(249) 271 9258';
				const result = CustomValidators.phoneNumber(new FormControl(value));
				expect(result).toBeNull();
			});
		});
	});

	describe('number', () => {
		test.each([0, '9'])('should only accept numbers › %s', (input) => {
			const result = CustomValidators.number(new FormControl(input));
			expect(result).toBeNull();
		});

		it('should pass for floating point numbers', () => {
			const input = '1.01';
			const result = CustomValidators.number(new FormControl(input));
			expect(result).toBeNull();
		});

		it('should fail for characters', () => {
			const input = '12s';
			const result = CustomValidators.number(new FormControl(input));
			expect(result).toEqual({ number: true });
		});

		it('should fail for special characters', () => {
			const input1 = '12%';
			const input2 = '0.12%';
			const result1 = CustomValidators.number(new FormControl(input1));
			const result2 = CustomValidators.number(new FormControl(input2));
			expect(result1).not.toBeNull();
			expect(result2).not.toBeNull();
		});
	});

	describe('validZipCode', () => {
		it('should set error if length not 5, or 10', () => {
			const control1 = new FormControl();
			control1.setValue('1234567');
			const test1 = CustomValidators.validZipCode(control1);

			expect(test1).toStrictEqual({ validZipCode: true });
		});

		it('should set error if length is 10 but with misplaced dash', () => {
			const control1 = new FormControl();
			control1.setValue('123456789-');
			const test1 = CustomValidators.validZipCode(control1);

			expect(test1).toStrictEqual({ validZipCode: true });
		});

		it('should not set error if length is 10 with correctly placed dash', () => {
			const control1 = new FormControl();
			control1.setValue('12345-6789');
			const test1 = CustomValidators.validZipCode(control1);

			expect(test1).toBeNull();
		});
	});
});
