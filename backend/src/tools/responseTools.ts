export const generateResponse = <T>(status: any, responseBody: T) => {
  return {
    status,
    responseBody,
  };
};
