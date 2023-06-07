import { KeyValue } from '@angular/common';
import { encrypt } from './crypto';

type body = Record<string, string>;

export function createBodyUrlencoded(
  entrys: Array<KeyValue<string, string | object | boolean>>,
  key: string
) {
  const value: body = {};

  for (let i = 0; i < entrys.length; i++) {
    const element = entrys[i];
    value[element.key] = JSON.stringify(encrypt(element.value, key));
  }

  return value;
}
