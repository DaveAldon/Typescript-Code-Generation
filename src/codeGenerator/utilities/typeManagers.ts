import { CodePattern, GenericCodePattern } from '..';

export const isString = (value: string | CodePattern): value is string => {
  return typeof value === 'string';
};

export const convertToCodePattern = (pattern: GenericCodePattern): CodePattern[] => {
  const patternArray: string[] | CodePattern[] = Array.prototype.concat(pattern);
  const convertedPatternArray: CodePattern[] = [];
  patternArray.forEach(pattern => {
    if (isString(pattern)) {
      convertedPatternArray.push({ pattern });
    } else {
      convertedPatternArray.push(pattern);
    }
  });
  return convertedPatternArray;
};
