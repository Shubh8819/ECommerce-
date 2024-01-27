import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ValidatorsCustom {

    static notOnlyWhitespace: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        if (control.value && control.value.trim() === '') {
          // Validation failed if the value contains only white spaces
          return { notOnlyWhiteSpace: true };
        }
        // Validation passed
        return null;
      };
}
