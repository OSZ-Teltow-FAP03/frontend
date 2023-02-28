import { FormControl } from '@angular/forms';
export function getErrorMessage(control: FormControl) {
  if (control.hasError('required')) {
    return 'Bitte das Feld ausfüllen';
  }
  if (control.hasError('wrongPassword')) {
    return 'Username oder Passwort falsch.';
  }
  if (control.hasError('email')) {
    return 'Gebe bitte eine valide Email ein.';
  }
  if (control.hasError('matching')) {
    return 'Die Passwörter stimmen nicht überein.';
  }
  if (control.hasError('emailNotFound')) {
    return 'Diese Email existiert nicht im System. Schaue noch einmal nach ob du die richtige Email eingegeben hast.';
  }
  if (control.hasError('maxlength')) {
    console.log(control);
    return `Du bist ${
      control.getError('maxlength').actualLength -
      control.getError('maxlength').requiredLength
    } Zeichen über dem Zeichenlimit.`;
  }

  return '';
}
