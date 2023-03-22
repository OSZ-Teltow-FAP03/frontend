import * as CryptoJS from 'crypto-js';
import { EncryptedData } from '../interfaces/encrypted-data';

export function encrypt(
  text: string | object | boolean,
  key: string
): EncryptedData | false {
  let string;
  console.log(typeof text);
  if (typeof text == 'object') {
    string = JSON.stringify(text);
  } else if (typeof text == 'string') {
    string = text;
  } else if (typeof text == 'boolean') {
    string = text ? '1' : '0';
  } else {
    return false;
  }
  const rand = randomBytes(16);
  const iv = CryptoJS.enc.Hex.parse(rand);
  const parsedKey = CryptoJS.SHA256(key);
  const encrypted = CryptoJS.AES.encrypt(string, parsedKey, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
  });
  console.log(encrypted.ciphertext.toString());
  return {
    data: encrypted.toString(),
    iv: rand,
  };
}

function randomBytes(length: number) {
  length = Math.floor(length);
  let bytes = '';
  for (let index = 0; index < length; index++) {
    let result = parseInt((Math.random() * 256).toString(), 10).toString(16);
    result = result.padStart(2, '0');
    bytes += result;
  }
  return bytes;
}

export function decrypt(encrypted: string | EncryptedData, key: string) {
  let json: EncryptedData;
  console.log(typeof encrypted);
  if (typeof encrypted == 'object') {
    json = encrypted;
  } else if (typeof encrypted == 'string') {
    json = JSON.parse(encrypted);
  } else {
    return false;
  }
  const iv = CryptoJS.enc.Hex.parse(json.iv);
  const parsedKey = CryptoJS.SHA256(key);
  const decrypted = CryptoJS.AES.decrypt(json.data, parsedKey, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
  });
  console.log(decrypted);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
