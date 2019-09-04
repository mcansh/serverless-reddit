import { ParsedUrlQuery } from 'querystring';

const getFirstParam = <T>(input: T | T[]) =>
  Array.isArray(input) ? input[0] : input;

const getFirstParams = (input: ParsedUrlQuery) =>
  Object.entries(input).reduce((acc: { [key: string]: string }, [key, val]) => {
    acc[key] = getFirstParam(val);
    return acc;
  }, {});

export { getFirstParam, getFirstParams };
