import Cookies from "js-cookie";
import NextProgress from "next-progress";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import Available from "../components/Available";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AppProvider, useGlobalContext } from "../context/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const query = router.query;
  const auth_token = query.auth_token;
  const AuthProvider = ({ children }) => {
    const { setUser, user } = useGlobalContext();

    useEffect(() => {
      const checkLogin = () => {
        const signInUser = () => {
          const baseUrl = "https://fierce-inlet-80267.herokuapp.com/api/v1";
          try {
            fetch(`${baseUrl}/auth/me`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${auth_token}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data, "Ff");
                if (data.success) {
                  setUser(data.data);
                  Cookies.set("__Secure-uid", auth_token, { expires: 7 });
                  if (router.pathname.startsWith("/posts")) {
                    router.push(`/posts/${query.id}`);
                  }
                } else {
                  console.log(err);
                }
              });
          } catch (err) {
            console.log(err);
          }
        };
        if (
          query?.request_type === "login" &&
          query.referrer === "chaindustry" &&
          query.auth_token
        ) {
          console.log("Initialising login...");

          signInUser();
        }
      };
      if (router.isReady) {
        if (auth_token) checkLogin();
      }
    }, [router.isReady]);
    return <>{children}</>;
  };
  return (
    <AppProvider>
      <Script
        strategy="afterInteractive"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7379638141020568"
        crossorigin="anonymous"
      />

      <div className="bg-primary-100 relative">
        <div className="overflow-hidden absolute min-h-[100vh] inset-0">
          <div
            className="absolute h-[579px] w-[294px]  top-[99px] border-[128px] border-primary-50 saf-blur left-[-250px] blur-[241.5px]
      lg:top-[249px] lg:left-0 lg:h-[831px] lg:w-[422px]
      "
          ></div>
          {/* Bg blur filter */}
          <div
            className="absolute w-[422px] h-[831px] top-[-74px] right-[-127px] blur-[241px] border-[128px] saf-blur border-secondary-50/40
      lg:top-[-74px] lg:right-[-104px]
      "
          ></div>
        </div>
          <Header />
        <div className="container relative z-[1] mx-auto p-5 xl:max-w-[1185px] 2xl:max-w-[1285px] lg:p-8">
          <NextProgress
            options={{ showSpinner: false }}
            height={"4px"}
            delay={500}
            color="#DE3561"
          />
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
          <Available />
        </div>

        <Footer />
      </div>
    </AppProvider>
  );
}

export default MyApp;
