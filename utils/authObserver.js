const authObserver = (user, router) => {
  const env = "TEST";
  console.log(router, "NOt user");
  const testpath = "http://localhost:3001";
  const productionUrl = "https://blog.chaindustry.io";
  if (!user) {
    return router.push({
      pathname:
        env === "TEST" ? `${testpath}/login` : "https://chaindustry.io/login",
      query: {
        referrer: "chainblog",
        return_url: `${
          env === "TEST" ? "http://localhost:3000" : productionUrl
        }${router.asPath}`,
        request_type: "auth_token",
      },
    });
  }
  // typeof window !== 'undefim'
};

export default authObserver;
