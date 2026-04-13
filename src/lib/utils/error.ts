export const getErrorMessage = (err: any) => {
  return err?.message || "Something went wrong. Please try again.";
};
