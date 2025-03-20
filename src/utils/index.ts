/* handling errors function from the server */
export const handleError = (error: unknown) => {
  console.log(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};
