import React, { useEffect, useRef, useState } from "react";
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
import { GoMention } from "react-icons/go";
import { ReadTime } from "../../components/Card";
import AppButton from "../../components/button/AppButton";
const Markdown = require("markdown-it");
const Post = ({ post, commentRes }) => {
  const [comments, setComments] = useState([]);
  const [commenters, setCommenters] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const post_image = post?.img ? post.img?.data?.attributes?.url : null;
  post = { ...post, img: post_image };
  const md = new Markdown({
    html: true,
  });
  const derivedHtml = md.render(post.content);
  const router = useRouter();
  const [openMention, setOpenMention] = useState(false);
  const { user, auth } = useGlobalContext();
  const [mentioned, setMentioned] = useState([]);
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
  }, [post.comments?.data]);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const addComment = (e) => {
    const postId = router.query.id;
    e.preventDefault();
    const url = `${baseUrl}/api/comments`;
    setLoading(true);
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
      })
      .catch((err) => {
        setLoading(false);
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
      e.includes("@")
      // e.charAt(e.length - 1) === "@" &&
      // newArr.filter((a) => a === "@").length === 1
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

  const inputRef = useRef(null);
  const el = inputRef?.current;
  const cursorPosition = el?.selectionStart;
  console.log(cursorPosition, "Curs pos");
  let childP = "[&>p]";
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
          <h1
            className={`
              tracking-[-0.055em] text-[26px] font-sfMedium leading-[145.34%] mb-[20px]
              lg:text-[34px] lg:mb-[30px]
              xl:text-[44px] xl:mb-[40px]
              `}
          >
            {post.title}
          </h1>
          <div
            className="text-grey-30 font-sfLight text-[14px] tracking-[-0.025em] leading-[20.25px] 
          md:flex md:gap-4 md:!text-[16px]
          lg:gap-[40px] lg:!text-[18px]
          xl:!text-[20px]"
          >
            <div
              className="flex gap-4 mb-[15px] md:mb-0
            lg:gap-[40px]
            "
            >
              {" "}
              <span>
                by{" "}
                <span className="text-white">
                  {post.author || "Chaindustry"}
                </span>{" "}
              </span>
              <span>{moment(post.createdAt).format("Do MMMM, YYYY")}</span>
            </div>
            <ReadTime content={post?.content} />
          </div>
        </header>
        {post.img && (
          <div className={classes.img_con}>
            <Image
              className={classes.img}
              src={`${post.img}`}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={post.img}
              objectPosition={"center"}
              alt="Cover"
            />
          </div>
        )}
        <p
          className="text-grey-10 leading-[240%] mb-[60px] text-[14px] font-sfLight
          lg:text-[16px]
        xl:text-[18px]
        "
        >
          {post.description}
        </p>
        <section
          className={`${classes.post_content}`}
          dangerouslySetInnerHTML={{ __html: derivedHtml }}
        />
        <div className={classes.cmt_length}>
          {comments.length} {`Comment${comments.length > 1 ? "s" : ""}`}
        </div>
        <Comments comments={comments} />
        {!auth && (
          <div>
            <div> Login to post a comment</div>
            <button onClick={login}>Login Now</button>
          </div>
        )}
        {auth && (
          <>
            <div className={classes.cmt_info}>Comment as {user?.firstname}</div>
            <form onSubmit={addComment} className={classes.comment_cont}>
              <div className={classes.mention_cont}>
                <Mention
                  setComment={setComment}
                  comment={comment}
                  openMention={openMention}
                  setOpenMention={setOpenMention}
                  commenters={filtered}
                  cursorPosition={cursorPosition}
                  mentioned={mentioned}
                  setMentioned={setMentioned}
                />
              </div>

              <textarea
                aria-required
                disabled={loading}
                // contentEditable
                ref={inputRef}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  checkForMention(e.target.value);
                  filterCommenters(e.target.value);
                }}
                placeholder="Add a comment"
                required
              />
              <AppButton
                disabled={loading}
                type="submit"
                sxclass={classes.submit_btn}
                label={loading ? "Submitting..." : "Post Comment"}
                variant="secondary"
              />
              {/* <div className={classes.bottom}>
                <div
                  onClick={() => {
                    setOpenMention(!openMention);
                    const output = [
                      comment.slice(0, cursorPosition),
                      "@",
                      comment.slice(cursorPosition),
                    ].join("");
                    setComment(output);
                  }}
                >
                  <GoMention />
                </div>
                <button type="submit">Send</button>
              </div> */}
            </form>
          </>
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
