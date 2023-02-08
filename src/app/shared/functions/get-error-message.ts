import { FormControl } from '@angular/forms';
export function getErrorMessage(control: FormControl) {
  console.log(control);
  if (control.hasError('required')) {
    return 'Bitte das Feld ausfüllen zum einloggen.';
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

  return '';
}
