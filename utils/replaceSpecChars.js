const replaceSpecChars = (str = "") => {
  return str
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/’/g, "")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/--/g, "-");
};
export default replaceSpecChars;
