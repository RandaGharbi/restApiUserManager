import fs from 'fs';
import path from 'path';

export default async (secretFile) => {
  try {
    const secret = fs.readFileSync(path.resolve(__dirname, `../../${secretFile}`));
    return secret;
  } catch (error) {
    console.error('can not found the secret file', error.message);
    return 'default-serct-key-XXXX-XXXX-XXXX';
  }
};
