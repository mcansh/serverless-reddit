const getFirstParam = (input: any | any[]) =>
  Array.isArray(input) ? input[0] : input;

export { getFirstParam };
