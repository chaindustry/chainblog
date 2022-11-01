import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import AppButton from "./button/AppButton";
import classes from "./comments.module.css";
const Comments = ({ comments }) => {
  const [comments_, setComments] = useState(comments?.slice(0, 5) || []);
  const [isToggled, setIsToggled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setComments(
      comments
        ?.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        )
        .slice(0, 5)
    );
  }, [comments]);
  const Comment = ({ user, publishedAt, comment }) => {
    const image = user?.dp || "/avatar.png";

    const name = user?.name;
    return (
      <div className={classes.avatar}>
        <div className={classes.avatar_img}>
          <Image
            src={image}
            objectFit="cover"
            layout="fill"
            quality={70}
            priority
            alt="Dp"
            placeholder="blur"
            blurDataURL="/avatar.png"
          />
        </div>
        <div>
          <div className={classes.name}>
            {name?.firstname || ""} {name?.lastname || ""}
          </div>
          <div className={classes.date}>
            {moment(publishedAt).format("Do MMM, YYYY")}
          </div>
          <p className={classes.comment}>{comment}</p>
        </div>
      </div>
    );
  };
  const toggleCommentsList = () => {
    if (isToggled) {
      setComments(
        comments
          ?.sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
          )
          .slice(0, 5)
      );
      setIsToggled(false);
    } else {
      setComments(
        comments.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        )
      );
      setIsToggled(true);
    }
  };
  return (
    <div className={classes.container}>
      {comments_.map((c, id) => {
        return (
          <div key={id} className={classes.comment_main}>
            <Comment user={c.user} {...c} />
          </div>
        );
      })}
      {comments.length > 5 && (
        <div
          style={{
            marginBottom: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppButton
            onClick={toggleCommentsList}
            variant="ghost"
            label={
              isToggled
                ? "View less comments"
                : `View all ${comments?.length} comments`
            }
            size="sm"
          />
        </div>
      )}
    </div>
  );
};

export default memo(Comments);
