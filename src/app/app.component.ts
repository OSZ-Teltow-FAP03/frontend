import { Component } from '@angular/core';
import { EncryptedData } from './shared/interfaces/encrypted-data';

declare function encrypt(text: string, key: string): EncryptedData | boolean;
declare function decrypt(encrypted: string, key: string): string | boolean;

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
