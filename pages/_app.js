import Script from "next/script";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
