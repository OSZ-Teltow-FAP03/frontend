// import {
//   randomBytes,
//   createHash,
//   createCipheriv,
//   createDecipheriv,
// } from 'crypto-browserify';

function encrypt(text, secretKey) {
  // let string;
  // if (typeof text == 'object') {
  //   string = JSON.stringify(text);
  // } else if (typeof text == 'string') {
  //   string = text;
  // } else if (typeof text == 'boolean') {
  //   string = text ? '1' : '0';
  // } else {
  //   return false;
  // }
  // const iv = randomBytes(16).toString('hex');
  // const key = createHash('sha256').update(secretKey).digest();
  // const cipher = createCipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'));
  // let encrypted = cipher.update(string, 'utf8', 'hex');
  // encrypted += cipher.final('hex');
  // const authTag = cipher.getAuthTag();

  // return { data: encrypted, iv: iv, auth: authTag.toString('hex') };
  return text;
}

function decrypt(encrypted, secretKey) {
  // try {
  //   encrypted = JSON.parse(encrypted);
  //   const text = encrypted.data;
  //   const iv = encrypted.iv;
  //   const authTag = Buffer.from(encrypted.auth, 'hex');
  //   const key = createHash('sha256').update(secretKey).digest();
  //   const decipher = createDecipheriv(
  //     'aes-256-gcm',
  //     key,
  //     Buffer.from(iv, 'hex')
  //   );
  //   decipher.setAuthTag(authTag);
  //   var dec = decipher.update(text, 'hex', 'utf8');
  //   dec += decipher.final('utf8');
  // } catch (error) {
  //   return false;
  // }
  // return dec;
  return encrypted;
}
