export const formateHandler = (code: string) => {
  return code
    .replaceAll('//@SPACE', '')
    .split('')
    .reverse()
    .join('')
    .replace('\r\n', '')
    .split('')
    .reverse()
    .join('');
};
