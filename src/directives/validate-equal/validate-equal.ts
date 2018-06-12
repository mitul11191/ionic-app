import { Directive } from '@angular/core';

/**
 * Generated class for the ValidateEqualDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[validate-equal]' // Attribute selector
})
export class ValidateEqualDirective {

  constructor() {
    console.log('Hello ValidateEqualDirective Directive');
  }

}
