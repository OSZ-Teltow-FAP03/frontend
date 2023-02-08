import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-error',
  templateUrl: './generic-error.component.html',
  styleUrls: ['./generic-error.component.scss'],
})
export class GenericErrorComponent {
  @Input() imgPath = '';
  @Input() mainMsg = '';
  @Input() secondMsg = '';
  @Input() showSmall = false;
}
