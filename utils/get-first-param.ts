import { ParsedUrlQuery } from 'querystring';

const getFirstParam = <T>(input: T | T[]) =>
  Array.isArray(input) ? input[0] : input;

function getFirstParams(input: ParsedUrlQuery): { [key: string]: string } {
  return Object.entries(input).reduce((acc, [key, values]) => {
    const value = getFirstParam(values);
    if (!value) return acc;
    return { ...acc, [key]: value };
  }, {});
}

export { getFirstParam, getFirstParams };
