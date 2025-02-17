import axios from "axios";
import Head from "next/head";

import { useEffect, useState } from "react";
import { baseUrl } from "../baseUrl";
import Available from "../components/Available";
import Card from "../components/Card";
import Join from "../components/Join";
import Paginate from "../components/Paginate";
import Recommended from "../components/Recommended";
import Title from "../components/Title";
import classes from "../styles/Home.module.css";

export default function Home(props) {
  const pagination = props?.posts?.meta?.pagination;
  const posts = props?.posts?.data.map((p) => {
    return {
      ...p.attributes,
      id: p.id,
      img: p?.attributes?.img
        ? p?.attributes?.img?.data?.attributes?.url
        : null,
    };
  });
  const recommended = posts[3];

  // console.log(recommended, "rec");
  const title = "The Chaindustry Insider";
  const description =
    "Chaindustry is a DoToEarn network offering value and digital services to it's users and partners.";
  const fullImgPath =
    "https://firebasestorage.googleapis.com/v0/b/cashio-1ccdd.appspot.com/o/Rectangle%2059.png?alt=media&token=5adb143c-0f4f-4157-958a-cb20a0b86993";
  return (
    <div className={classes.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Blog at Chaindustry" />
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <link rel="icon" href="/favicon.ico" />
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
        <meta property="og:url" content="https://www.blog.chaindustry.io" />
        <>
          <meta property="og:image" content={fullImgPath} />
          <meta name="twitter:image" content={fullImgPath} />
          <meta name="image" content={fullImgPath} />
        </>
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="google-site-verification"
          content="kg2__dhEGnrztOnTcU5__JFGL2vzk8APpbt9CKiqQwM"
        />
        <meta name="theme-color" content="#0a0118" />
      </Head>

      <main>
        <section
          className="tracking-[-0.035em] text-[40px] leading-[125.84%] font-sfBold mb-[64px] max-w-[329px] lg:max-w-[561px] 
        lg:text-[54px] lg:leading-[125.84%] lg:mb-[91px] lg:mt-[180px]
        xl:text-[72px] xl:leading-[125.84%] xl:mb-[131px] xl:mt-[208px]
        "
        >
          {"What's new on Chaindustry"}
        </section>
        {recommended && <Recommended {...recommended} />}
        <div>
          <Title
            title="Latest Articles"
            sub="Fresh Articles for you"
            className={"mb-[52px]"}
          />
          <section className={`${classes.post_container} md:grid-cols-2`}>
            {posts
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              // .slice(0, 6)
              .map((p, id) => {
                return <Card key={id} {...p} />;
              })}
          </section>
          <Paginate
            page={pagination?.page}
            pageCount={pagination?.pageCount}
            perPage={pagination?.pageSize}
          />
          <Join />
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const page = query?.page;
  // console.log(query);
  const res = await axios.get(
    `${baseUrl}/api/posts?populate=*&pagination[pageSize]=12&sort[0]=createdAt:desc&pagination[page]=${
      page || 1
    }`
  );
  const posts = res.data;
  // const posts = res.data.data.map((p) => {
  //   return {
  //     ...p.attributes,
  //     id: p.id,
  //   };
  // });
  if (!posts) {
    return {
      props: {
        posts: [],
      },
    };
  }
  return {
    props: {
      posts,
    },
  };
};
