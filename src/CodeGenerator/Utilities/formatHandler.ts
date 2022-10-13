import { Characters } from '../enums/characters.enum';

export const formateHandler = (code: string) => {
  return code
    .replaceAll(Characters.Space, '')
    .split('')
    .reverse()
    .join('')
    .replace('\r\n', '')
    .split('')
    .reverse()
    .join('');
};
