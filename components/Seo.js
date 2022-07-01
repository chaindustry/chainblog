import Head from "next/head";
import Script from "next/script";
import { baseUrl } from "../baseUrl";

const Seo = (fullSeo) => {
  const fullImgPath = `${baseUrl}${fullSeo.shareImage}`;
  const url = `https://chainblog.vercel.app/posts/${fullSeo?.id}`;
  return (
    <Head>
      <meta property="og:url" content={url} />

      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullImgPath} />
          <meta name="twitter:image" content={fullImgPath} />
          <meta name="image" content={fullImgPath} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Seo;
