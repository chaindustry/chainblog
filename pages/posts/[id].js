import React from "react";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import classes from "../../styles/post.module.css";
import moment from "moment";
import Image from "next/image";
import Seo from "../../components/Seo";
import Script from "next/script";
const Markdown = require("markdown-it");
const Post = ({ post }) => {
  const post_image = post?.img ? post.img?.data?.attributes?.url : null;
  post = { ...post, img: post_image };
  const md = new Markdown({
    html: true,
  });
  const derivedHtml = md.render(post.content);
  console.log(post_image, "Post image");
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
      <Seo
        metaTitle={post?.title}
        metaDescription={post?.description}
        article={post?.description}
        shareImage={post_image}
        id={post.id}
      />

      <article className={classes.container}>
        <header>
          <div className={classes.top}>
            <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
            {post?.tags && (
              <div className={classes.tag_container}>
                {post.tags.map((t, id) => (
                  <span className={classes.tag} key={`chaindustry_tags_${id}`}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* {post.updatedAt !== post.createdAt && (
          <p>{moment(post.updatedAt).format("MMM DD, YYYY [at] hh:mm:a")}</p>
        )} */}
          <h1 className={classes.title}>{post.title}</h1>
          <p className={classes.desc}>{post.description}</p>
        </header>
        {post.img && (
          <div className={classes.img_con}>
            <Image
              className={classes.img}
              src={`${post.img}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <section
          className={classes.post_content}
          dangerouslySetInnerHTML={{ __html: derivedHtml }}
        />
      </article>
    </>
  );
};

export default Post;

export const getServerSideProps = async ({ params }) => {
  console.log(params, "Params");
  const res = await axios.get(`${baseUrl}/api/posts/${params.id}?populate=*`);
  const data = res.data.data;
  const post = {
    ...data.attributes,
    id: data.id,
  };

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post: post,
    },
  };
};
// export const getStaticProps = async ({ params }) => {
//   const res = await axios.get(`${baseUrl}/api/posts/${params.id}?populate=*`);
//   const data = res.data.data;
//   const post = {
//     ...data.attributes,
//     id: data.id,
//   };

//   return {
//     props: {
//       post: post,
//     },
//     revalidate: 10,
//   };
// };

// export const getStaticPaths = async () => {
//   const posts = await axios.get(`${baseUrl}/api/posts`);
//   const mapped = posts.data.data.map((p) => {
//     return {
//       ...p.attributes,
//       id: p.id,
//     };
//   });
//   const paths = mapped.map((p) => {
//     return {
//       params: { id: p.id.toString() },
//     };
//   });
//   return {
//     paths,

//     fallback: "blocking",
//   };
// };
