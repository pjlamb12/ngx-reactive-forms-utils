# ngx-reactive-forms-utils

Reactive forms in Angular are a great way to manage forms. This library provides utilities that make it easier to work with reactive forms.

Utilities that are provided include:

-   Easy validation error display
-   Some common custom validators
-   A function that returns an observable with some debug information for your form
-   A component that displays the debug information on the screen

Import the standalone component `ControlErrorsDisplayComponent` in the component or module needed to get started.

## Validation Error Display

Error messages are provided for the following common errors out of the box:

-   required
-   minlength
-   maxlength
-   min
-   max
-   email
-   number
-   minAge
-   maxAge

These error messages can be overwritten with the `addCustomErrorMessage` function:

```ts
addCustomErrorMessage('required', () => 'This is a new required field message');
```

If you have a custom error message that you need to show, you can add it with the same function as demonstrated above:

```ts
addCustomErrorMessage('newCustomError', () => 'This is a new custom error message');
```

The `ngx-control-errors-display` component will show the validation errors for a given form control automatically. You can wrap your input in the component, and any relevant errors will be displayed if necessary. There are a few inputs:

-   `containerClasses`: a string of css classes to apply to the container element that wraps the projected content and the necessary error messages
-   `errorClasses`: a string of css classes to apply to the error message elements
-   `rules`: a list of rules for when to check for errors on the form control. it defaults to `['touched']`

```html
<form class="mx-auto flex flex-col gap-4 justify-center items-center" [formGroup]="form">
  <div class="flex gap-2 items-start">
    <label class="pt-2" for="name">Name: </label>
    <ngx-control-errors-display errorClasses="error-message">
      <input type="text" formControlName="name" />
    </ngx-control-errors-display>
  </div>
  <ngx-control-errors-display errorClasses="error-message">
    <div class="flex gap-2 items-center">
      <label for="email">Email: </label><input type="text" formControlName="email" />
    </div>
  </ngx-control-errors-display>
  <ngx-control-errors-display errorClasses="error-message">
    <div class="flex gap-2 items-center">
      <label for="age">Age: </label><input type="number" formControlName="age" />
    </div>
  </ngx-control-errors-display>
</form>
```

## Custom Validators

The Angular reactive forms module provides a good list of default Validators for form controls, but there are some that would be convenient that are not present. This library adds those validators:

-   `phoneNumber`: validates a phone number
-   `number`: validates that the value is a number
-   `validZipCode`: validates a US zip code
-   `confirmStringMatch`: validates that field 1 and field 2 have the same value
-   `minAge`: validates that the age passed in to the control is at least the provided age
-   `maxAge`: validates that the age passed in to the control is no greater than the provided age

## Debugging Forms

On more complex forms, it's often difficult to know what the current state of the form is. You can output the information you want with the `valueChanges` observable, but you have to initialize that observable or debugging information on your own each time. This library now provides a couple ways to help you with this.

First is a method, `debugForm`, which returns an observable. The returned value is an object with different form debug information available. Import the method, and assign the return valud of that function to an observable. Then you can use it as needed, such as subscribing to it in the TypeScript file and logging the data to the console. 

Second is a second component that displays the form debug information on the screen for you. Import the standalone component `FormDebugDisplayComponent` and use it in your component template:

```html
<ngx-form-debug-display [form]="form"></ngx-form-debug-display>
```

You only need to pass in the form to the debug display component and it handles the rest.

Third is the ability to determine which debug fields are returned or displayed. There is an type, `FormDebugField`, with several available fields that can be displayed. By default, all are displayed, but you can change that by providing an array of the desired fields to either the function or the component. 