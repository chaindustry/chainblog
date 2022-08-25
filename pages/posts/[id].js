import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import classes from "../../styles/post.module.css";
import moment from "moment";
import Image from "next/image";
import Seo from "../../components/Seo";
import Script from "next/script";
import authObserver from "../../utils/authObserver";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../context/context";
import Comments from "../../components/Comments";
import Mention from "../../components/Mention";
const Markdown = require("markdown-it");
const Post = ({ post, commentRes }) => {
  const [comments, setComments] = useState([]);
  const [commenters, setCommenters] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [comment, setComment] = useState("");
  const post_image = post?.img ? post.img?.data?.attributes?.url : null;
  post = { ...post, img: post_image };
  const md = new Markdown({
    html: true,
  });
  const derivedHtml = md.render(post.content);
  const router = useRouter();
  const [openMention, setOpenMention] = useState(false);
  const { user, auth } = useGlobalContext();
  useEffect(() => {
    const comments_ = post.comments?.data?.map((c) => {
      return {
        ...c.attributes,
        id: c.id,
      };
    });
    setComments(comments_);
    const commenters_ = comments_.map((c) => c.user);
    setCommenters(commenters_);
    setFiltered(commenters_);
    // console.log(post?.comments?.data, "Data of comme");
  }, []);
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const addComment = (e) => {
    const postId = router.query.id;
    e.preventDefault();
    const url = `${baseUrl}/api/comments`;
    axios
      .post(url, {
        data: {
          post: parseInt(postId),
          user: {
            name: {
              firstname: user?.firstname || null,
              lastname: user?.lastname || null,
            },
            email: user?.email,
            uid: user._id,
            dp: user?.profile_picture || null,
          },
          comment: comment,
          time_created: new Date().toISOString(),
          comment_id: new Date().getTime().toString(),
          commentId: new Date().getTime().toString(),
        },
      })
      .then((resp) => {
        refreshData();
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const login = () => {
    authObserver(null, router);
  };
  const checkForMention = (e) => {
    const newArr = e.split("");
    console.log(newArr);
    if (
      e.includes("@") &&
      e.charAt(e.length - 1) === "@" &&
      newArr.filter((a) => a === "@").length === 1
    ) {
      console.log("Initializing mention component...");
      setOpenMention(true);
    }
    if (!e.includes("@")) {
      setOpenMention(false);
    }
  };
  const filterCommenters = (e) => {
    const testCase = e.split("@").pop();
    console.log(testCase, "tesy");
    console.log(e, "e");
    const filter = commenters.filter(
      (c) =>
        c?.name?.firstname?.toLowerCase().includes(testCase.toLowerCase()) ||
        c?.name?.lastname?.toLowerCase().includes(testCase.toLowerCase())
    );
    setFiltered(filter);
    console.log(
      commenters.filter((c) =>
        c.name?.firstname?.toLowerCase().includes(e.toLowerCase())
      )
    );
    console.log(commenters.filter((c) => c?.firstname));
    console.log(filter, "filter");
  };

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
        <Comments comments={comments} />
        {!auth && (
          <div>
            <div> Login to post a comment</div>
            <button onClick={login}>Login Now</button>
          </div>
        )}
        {auth && (
          <form onSubmit={addComment} className={classes.comment_cont}>
            <div className={classes.mention_cont}>
              <Mention
                openMention={openMention}
                setOpenMention={setOpenMention}
                commenters={filtered}
              />
            </div>
            Comment as {user?.firstname}
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                checkForMention(e.target.value);
                filterCommenters(e.target.value);
              }}
              placeholder="Add a comment"
              required
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </article>
    </>
  );
};

export default Post;

export const getServerSideProps = async ({ params }) => {
  console.log(params, "Params");
  const res = await axios.get(`${baseUrl}/api/posts/${params.id}?populate=*`);
  const comments = await axios.get(`${baseUrl}/api/comments?populate=*`);
  const [postRes, commentRes] = await Promise.all([
    res.data.data,
    comments.data.data,
  ]);
  // const data = res.data.data;
  console.log(postRes);
  if (!postRes) {
    return {
      notFound: true,
    };
  }
  const post = {
    ...postRes.attributes,
    id: postRes.id,
  };
  console.log(commentRes.filter((c) => c.attributes.post.id === params.id));
  return {
    props: {
      post,
      commentRes,
      // : commentRes?.filter(
      //   (c) => c?.attributes?.post?.data?.id === params.id
      // ),
      // res: stringified,
    },
  };
};
