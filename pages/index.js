import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { baseUrl } from "../baseUrl";
import Card from "../components/Card";
import classes from "../styles/Home.module.css";

export default function Home(props) {
  console.log(props.posts, "POsts");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPosts(
      props.posts.data.map((p) => {
        console.log(p?.img);
        return {
          ...p.attributes,
          id: p.id,
          img: p?.attributes?.img
            ? p?.attributes?.img?.data?.attributes?.url
            : null,
        };
      })
    );
  }, []);

  return (
    <div className={classes.container}>
      <Head>
        <title>Chaindustry Insider</title>
        <meta name="description" content="Blog at Chaindustry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className={classes.intro}>
          {"What's new for Chaindustry"}
        </section>
        <div className={classes.post_container}>
          {posts
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((p, id) => {
              return <Card key={id} {...p} />;
            })}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get(`${baseUrl}/api/posts?populate=*`);
  const posts = res.data;
  // const posts = res.data.data.map((p) => {
  //   return {
  //     ...p.attributes,
  //     id: p.id,
  //   };
  // });
  return {
    props: {
      posts,
    },
  };
};
