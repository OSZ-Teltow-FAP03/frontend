import { Component } from '@angular/core';
import { decrypt, encrypt } from './shared/functions/crypto';
import { EncryptedData } from './shared/interfaces/encrypted-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  constructor() {
    const test = encrypt('test', 'test');
    console.log(test);
    if (typeof test !== 'boolean') {
      console.log(decrypt(test.data, 'test'));
    }
  }
}
