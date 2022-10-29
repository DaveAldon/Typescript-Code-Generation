import { Tokens } from '../enums/characters.enum';

export const formatHandler = (code: string) => {
  return code
    .replaceAll(Tokens.Space, '')
    .split('')
    .reverse()
    .join('')
    .replace('\r\n', '')
    .split('')
    .reverse()
    .join('');
};
