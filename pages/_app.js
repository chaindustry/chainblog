import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
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
    useEffect(() => {
      checkLogin();
    }, []);
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
      <div className="view">
        <Header />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </div>
      <Footer />
    </AppProvider>
  );
}

export default MyApp;
