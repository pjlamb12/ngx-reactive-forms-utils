# ngx-reactive-forms-utils

Reactive forms in Angular are a great way to manage forms. This library provides utilities that make it easier to work with reactive forms.

Utilities that are provided include:

-   Easy validation error display
-   Some common custom validators

To get started, import the `NgxReactiveFormsUtilsModule` in your app's `AppModule`.

## Validation Error Display

Error messages are provided for the following common errors out of the box:

-   required
-   minlength
-   maxlength
-   min
-   max
-   email
-   number

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
