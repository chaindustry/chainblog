const authObserver = (user, router) => {
  const testpath = "http://localhost:3001";
  const productionUrl = "https://blog.chaindustry.io";

  if (!user) {
    return router.push({
      pathname:
        process.env.NODE_ENV !== "production"
          ? `${testpath}/login`
          : "https://chaindustry.io/login",
      query: {
        referrer: "chainblog",
        return_url: `${
          process.env.NODE_ENV !== "production"
            ? "http://localhost:3000"
            : productionUrl
        }${router.asPath}`,
        request_type: "auth_token",
      },
    });
  }
  // typeof window !== 'undefim'
};

export default authObserver;
