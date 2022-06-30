import React from "react";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import classes from "../../styles/post.module.css";
import moment from "moment";
import Image from "next/image";
const Markdown = require("markdown-it");
const Post = ({ post }) => {
  post = { ...post, img: post?.img ? post.img?.data?.attributes?.url : null };
  const md = new Markdown();
  const derivedHtml = md.render(post.content);
  console.log(post);
  return (
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
        <h1>{post.title}</h1>
        <p>{post.description}</p>
      </header>
      {post.img && (
        <div className={classes.img_con}>
          <Image
            className={classes.img}
            src={`${baseUrl}${post.img}`}
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
  );
};

export default Post;
export const getStaticProps = async ({ params }) => {
  const res = await axios.get(`${baseUrl}/api/posts/${params.id}?populate=*`);
  const data = res.data.data;
  const post = {
    ...data.attributes,
    id: data.id,
  };

  return {
    props: {
      post: post,
    },
    revalidate: 10,
  };
};
export const getStaticPaths = async () => {
  const posts = await axios.get(`${baseUrl}/api/posts`);
  const mapped = posts.data.data.map((p) => {
    return {
      ...p.attributes,
      id: p.id,
    };
  });
  const paths = mapped.map((p) => {
    return {
      params: { id: p.id.toString() },
    };
  });
  return {
    paths,

    fallback: "blocking",
  };
};
