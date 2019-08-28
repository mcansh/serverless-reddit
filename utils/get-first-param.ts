const getFirstParam = <T>(input: T | T[]) =>
  Array.isArray(input) ? input[0] : input;

export { getFirstParam };
