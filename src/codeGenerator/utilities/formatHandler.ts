import { Characters } from '../enums/characters.enum';

export const formatHandler = (code: string) => {
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
