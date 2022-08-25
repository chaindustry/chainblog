// export const baseUrl = "http://localhost:1337";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1337"
    : "https://chainblog-api.herokuapp.com";
